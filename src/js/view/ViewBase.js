import GalleryViewModel from '../model/GalleryViewModel.js';


const checkViewModel = viewModel => viewModel instanceof GalleryViewModel;


export default class ViewBase {
    constructor(element, viewModel) {
        this._container = element;
        this._viewModel = null;

        this.init();

        this.bindViewModel(viewModel);
        this._bindUIEvent(true);
    }


    get hasViewModel() {
        return checkViewModel(this._viewModel);
    }


    init() {
    }

    render() {
        if (this.hasViewModel) {
            this._render(this._viewModel);
        }
    }

    bindViewModel(viewModel) {
        if (!checkViewModel(viewModel) || this._viewModel === viewModel) {
            return;
        }

        this.unbindViewModel();

        this._viewModel = viewModel;

        this._render(viewModel);
        this._bindVMEvent(true);
    }

    unbindViewModel() {
        this._bindVMEvent(false);

        this._viewModel = null;
    }

    setVMListeners(listeners) {
        this._bindVMEvent(false);

        this._vmLis = this._setContext(listeners);
    }

    setUIListeners(listeners) {
        this._bindUIEvent(false);

        this._uiLis = this._setContext(listeners);
    }


    _render(vm) {
    }

    _setContext(listeners) {
        const lis = {};

        for (const [type, callback] of Object.entries(listeners)) {
            lis[type] = callback.bind(this);
        }

        return lis;
    }

    _bindVMEvent(state = true) {
        if (!this.hasViewModel) {
            return;
        }

        const vm = this._viewModel;
        const fn = state ? vm.on : vm.off;

        for (const [type, callback] of Object.entries(this._vmLis)) {
            fn.call(vm, type, callback);
        }
    }

    _bindUIEvent(state = true) {

    }
}