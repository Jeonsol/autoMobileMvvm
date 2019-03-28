import ViewBase from './ViewBase.js';
import GalleryViewModel from '../model/GalleryViewModel.js';


const DEFAULT_TEMPLATE = (src = '') => src ?
    `<li><img src="${src}" width="980" height="654"></li>` : '<li></li>';


export default class ImageScreen extends ViewBase {
    constructor(element, viewModel = null) {
        super(element, viewModel);
    }


    init() {
        this._template = DEFAULT_TEMPLATE;

        this._listWrap = this._container.querySelector('[data-list-wrap]');
        this._prevBtn = this._container.querySelector('[data-prev-btn]');
        this._nextBtn = this._container.querySelector('[data-next-btn]');

        this.setVMListeners(vmListeners);
        this.setUIListeners(uiListeners);
    }


    renderImage(src) {
        this._listWrap.innerHTML = this._template(src);
    }

    updateArrowBtnState(isFirst, isLast) {
        this._prevBtn.classList.toggle('hidden', isFirst);
        this._nextBtn.classList.toggle('hidden', isLast);
    }


    _render(vm) {
        this.renderImage(vm.currentData.url);
        this.updateArrowBtnState(vm.isFirstImage, vm.isLastImage);
    }

    _bindUIEvent(state = true) {
        if (!state || !this._uiLis) {
            return;
        }

        const listeners = this._uiLis;

        this._prevBtn.addEventListener('click', listeners.onClickPrevBtn);
        this._nextBtn.addEventListener('click', listeners.onClickNextBtn);
    }
}

const vmListeners = {
    [GalleryViewModel.SELECT](event) {
        const vm = event.target;

        this.renderImage(vm.currentData.url);
        this.updateArrowBtnState(vm.isFirstImage, vm.isLastImage);
    }
};

const uiListeners = {
    onClickPrevBtn(event) {
        event.preventDefault();

        if (this.hasViewModel) {
            this._viewModel.currentIndex--;
        }
    },

    onClickNextBtn(event) {
        event.preventDefault();

        if (this.hasViewModel) {
            this._viewModel.currentIndex++;
        }
    }
};
