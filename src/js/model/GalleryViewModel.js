import EventEmitter from '../events/EventEmitter.js';
import GalleryModel from './GalleryModel.js';


const checkInt = (value, defaultValue) => isNaN(value) ? defaultValue : Number(value);
const fixRange = (value, min, max) => Math.min(max, Math.max(value, min));
const checkRange = (value, min, max) => (value < min || value > max) ? -1 : value;


export default class GalleryViewModel extends EventEmitter {

    static get SELECT() {
        return 'select';
    }

    static get CHANGE_PAGE() {
        return 'changePage';
    }


    constructor(model, {currentIndex = -1, currentPage = 0, displayCount = 10} = {}) {
        super();

        const validModel = model instanceof GalleryModel;

        if (!validModel) {
            throw 'Invalid Model!';
        }

        this._currentIndex = currentIndex;
        this._oldIndex = -1;
        this._currentPage = currentPage;
        this._displayCount = displayCount;
        this._model = model;
    }

    get list() {
        return this._model.data;
    }

    get currentData() {
        return this._model.getImageData(this.currentIndex);
    }

    set currentIndex(value) {
        const num = checkInt(value, this._currentIndex);
        const index = checkRange(num, 0, this.total - 1);

        this._oldIndex = this._currentIndex;
        this._currentIndex = index;

        if (this._currentIndex !== this._oldIndex) {
            this.emit(GalleryViewModel.SELECT);
        }

        this.currentPage = Math.floor(this.currentIndex / this.displayCount);
    }

    get currentIndex() {
        return this._currentIndex;
    }

    get oldIndex() {
        return this._oldIndex;
    }

    get total() {
        return this._model.total;
    }

    set currentPage(value) {
        const num = checkInt(value, this._currentPage);
        const index = fixRange(num, 0, this.lastPageIndex);

        if (this._currentPage === index) {
            return;
        }

        this._currentPage = index;

        this.emit(GalleryViewModel.CHANGE_PAGE);
    }

    get currentPage() {
        return this._currentPage;
    }

    get totalPage() {
        return Math.ceil(this.total / this.displayCount);
    }

    get lastPageIndex() {
        return this.totalPage - 1;
    }

    set displayCount(value) {
        this._displayCount = checkInt(value, this._displayCount);
    }

    get displayCount() {
        return this._displayCount;
    }

    get isFirstImage() {
        return this.currentIndex === -1 || this.currentIndex === 0;
    }

    get isLastImage() {
        return this.currentIndex === -1 || this.currentIndex === this.total - 1;
    }

    get isFirstPage() {
        return this.currentPage === 0;
    }

    get isLastPage() {
        return this.currentPage === this.lastPageIndex;
    }
}
