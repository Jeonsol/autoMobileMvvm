const isValidParam = (type, callback) => typeof type === 'string' && typeof callback === 'function';


export default class EventEmitter {
    constructor() {
        this._listeners = {};
    }

    on(type, callback) {
        if (isValidParam(type, callback) === false) {
            return this;
        }

        const listeners = this._getListenerList(type);

        if (listeners.indexOf(callback) === -1) {
            listeners.push(callback);
        }

        return this;
    }

    off(type, callback) {
        if (isValidParam(type, callback) === false) {
            return this;
        }

        const listeners = this._getListenerList(type);
        const index = listeners.indexOf(callback);

        if (index > -1) {
            listeners.splice(index, 1);
        }

        return this;
    }

    emit(type, param) {
        const event = this._getEvent(type, param);
        const listeners = this._getListenerList(type);

        for (const fnc of listeners) {
            fnc(event);
        }

        return this;
    }

    _getEvent(type, param) {
        return Object.assign({
            type,
            target: this,
            currentTarget: this
        }, param);
    }

    _getListenerList(type) {
        if (this._listeners[type] === undefined) {
            this._listeners[type] = [];
        }

        return this._listeners[type];
    }

}
