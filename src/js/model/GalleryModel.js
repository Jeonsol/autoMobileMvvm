export default class GalleryModel {
    constructor(array) {
        this._uid = 0;
        this._data = [...array].map(value => this._createData(value));
    }

    get total() {
        return this._data.length;
    }

    get data() {
        return this._cloneArray(this._data);
    }

    getImageData(index) {
        return Object.assign({}, this._data[index]);
    }

    _createData({thumb, url}) {
        const id = this._uid++;
        const imgUrl = `${url}?id=${id}`;
        const thumbUrl = `${thumb}?id=${id}`;

        return {id, thumb:thumbUrl, url:imgUrl};
    }

    _cloneArray(array) {
        return [...array].map((value, index) => this.getImageData(index));
    }
}
