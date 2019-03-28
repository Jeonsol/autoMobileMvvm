import ViewBase from './ViewBase.js';
import GalleryViewModel from '../model/GalleryViewModel.js';


const DEFAULT_TEMPLATE = ({id = '', thumb = ''}, index) =>
    `<li data-item><a href="javascript:void(0)" data-index="${index}"><span class="border"></span><img src="${thumb}" alt="${id}" width="92" height="60" data-item-thumb></a></li>`;


export default class ImageList extends ViewBase {
    constructor(element, viewModel = null) {
        super(element, viewModel);
    }


    init() {
        this._template = DEFAULT_TEMPLATE;

        this._listWrap = this._container.querySelector('[data-list-wrap]');
        this._items = null;

        this._prevBtn = this._container.querySelector('[data-prev-btn]');
        this._prevArrow = this._container.querySelector('[data-prev-arrow]');
        this._nextBtn = this._container.querySelector('[data-next-btn]');
        this._nextArrow = this._container.querySelector('[data-next-arrow]');

        this.setVMListeners(vmListeners);
        this.setUIListeners(uiListeners);
    }


    renderList(list) {
        const callback = this._uiLis.onClickThumb;

        if (this._items) {
            this._items.forEach(element => element.removeEventListener('click', callback));
        }

        this._listWrap.innerHTML = [...list].map(this._template).join('');
        this._items = this._listWrap.querySelectorAll('[data-item]');

        this._items.forEach(element => element.addEventListener('click', callback));
    }

    selectItem(index) {
        const selectedItem = this._listWrap.querySelector('.selected');
        const currentItem = this._items[index];

        if (selectedItem === currentItem) {
            return;
        }

        if (selectedItem) {
            selectedItem.classList.remove('selected');
        }

        if (currentItem) {
            currentItem.classList.add('selected');
        }
    }

    updatePageBtnState(isFirstPage, isLastPage) {
        this._prevBtn.classList.toggle('hidden', isFirstPage);
        this._prevArrow.classList.toggle('hidden', !isFirstPage);
        this._nextBtn.classList.toggle('hidden', isLastPage);
        this._nextArrow.classList.toggle('hidden', !isLastPage);
    }

    changePage(num, displayCount) {
        const item = this._items[0];
        const sizeW = item ? item.offsetWidth : 92;
        const pageSize = sizeW * displayCount;

        this._listWrap.style.left = `-${num * pageSize}px`;
    }


    _render(vm) {
        this.renderList(vm.list);
        this.selectItem(vm.currentIndex);
        this.updatePageBtnState(vm.isFirstPage, vm.isLastPage);
        this.changePage(vm.currentPage, vm.displayCount);
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
        this.selectItem(event.target.currentIndex);
    },

    [GalleryViewModel.CHANGE_PAGE](event) {
        const vm = event.target;

        this.changePage(vm.currentPage, vm.displayCount);
        this.updatePageBtnState(vm.isFirstPage, vm.isLastPage);
    }
};

const uiListeners = {
    onClickThumb(event) {
        event.preventDefault();

        if (this.hasViewModel) {
            const btn = event.currentTarget.querySelector('a');
            const index = btn.getAttribute('data-index');

            this._viewModel.currentIndex = index === '' ? -1 : Number(index);
        }
    },

    onClickPrevBtn(event) {
        event.preventDefault();

        if (this.hasViewModel) {
            this._viewModel.currentPage--;
        }
    },

    onClickNextBtn(event) {
        event.preventDefault();

        if (this.hasViewModel) {
            this._viewModel.currentPage++;
        }
    }
};
