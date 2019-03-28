import ViewBase from './ViewBase.js';
import GalleryViewModel from '../model/GalleryViewModel.js';


export default class TestView extends ViewBase {
    constructor(element, viewModel = null) {
        super(element, viewModel);
    }


    init() {
        this._displayArea = this._getDisplayArea();

        this.setVMListeners(vmListeners);
    }


    _render(vm) {
        this._displayArea.innerHTML = [
            this._getText('페이지 정보', `${vm.currentPage + 1}/${vm.totalPage}`),
            this._getText('이미지 선택 정보', `${vm.currentIndex + 1}/${vm.total}`),
            this._getText('표시할 이미지', vm.currentData.url),
            this._getText('첫페이지 여부', vm.isFirstPage),
            this._getText('마지막 페이지 여부', vm.isLastPage),
            this._getText('첫 번째 이미지 여부', vm.isFirstImage),
            this._getText('마지막 이미지 여부', vm.isLastImage)
        ].join('\n');
    }

    _getDisplayArea() {
        let displayArea = document.getElementById('__displayArea');

        if (!displayArea) {
            displayArea = document.createElement('pre');

            displayArea.setAttribute('id', '__displayArea');
            this._container.insertBefore(displayArea, this._container.firstChild);
        }

        return displayArea;
    }

    _getText(title, value) {
        return `  * ${title} : ${value}`;
    }
}

const vmListeners = {
    [GalleryViewModel.SELECT](event) {
        this._render(event.target);
    },

    [GalleryViewModel.CHANGE_PAGE](event) {
        this._render(event.target);
    }
};
