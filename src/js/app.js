import GalleryModel from './model/GalleryModel.js';
import GalleryViewModel from './model/GalleryViewModel.js';
import TestView from './view/TestView.js';
import ImageList from './view/ImageList.js';
import ImageScreen from './view/ImageScreen.js';

const data = [
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'},
    {thumb: './img/img92x60_1.png', url: './img/img980x654_1.png'}
];


const model = window.model = new GalleryModel(data);
const viewModel = window.vm = new GalleryViewModel(model, {currentIndex: 0});

const thumbListContainer = document.querySelector('[data-thumb-list]');
const imageScreenContainer = document.querySelector('[data-image-screen]');

const test = new TestView(document.body, viewModel);
const imageList = window.imgList = new ImageList(thumbListContainer, viewModel);
const imageScreen = window.imgScreen = new ImageScreen(imageScreenContainer, viewModel);
