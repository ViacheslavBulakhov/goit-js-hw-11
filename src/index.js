import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiService from './js/api-service';

let throttle = require('lodash.throttle');
let gallery = new SimpleLightbox('.gallery a');
const ApiService = new NewsApiService();    
let asd;
const refs = {
    form: document.querySelector('form.search-form'),
    imageBlock: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('footer button'),
}
const {form,imageBlock,loadMoreBtn} = refs;

form.addEventListener('submit', onClick);
loadMoreBtn.addEventListener('click', onLoadMore);
window.addEventListener('scroll', throttle(infiniteScroll, 100))

function onClick (e) {
    e.preventDefault();
    if(isSearchValid(e)){
        return
    }
    ApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    ApiService.resetPageCount();
    ApiService.fetchArticles().then(response =>{
        if (response.total === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return;
        }
        resetHtml();
        setTimeout(() => {
            isHideBtn();
        }, 450);
        createElementList(response.hits)
        Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`)    
    });
}
function onLoadMore(e) {
    e.preventDefault();
    checkFindCount()
}
function infiniteScroll () {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        checkFindCount();
    }
}
function resetHtml() {
    imageBlock.innerHTML = '';
}
function createElementList(params) {
      const renderElement =  params.map((
            {webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads}) => {
        
                return  imageBlock.insertAdjacentHTML('beforeend',
                `
                <a href="${largeImageURL}"><div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300px height = 200px/>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>
                    <span>${likes}</span>
                    </p>
                    <p class="info-item">
                    <b>Views</b>
                    <span>${views}</span>
                    </p>
                    <p class="info-item">
                    <b>Comments</b>
                    <span>${comments}</span>
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>
                    <span>${downloads}</span>
                    </p>
                </div>
                </div></a>`)
 }).join('');
 return renderElement, gallery.refresh();
};
function checkFindCount() {
    ApiService.fetchArticles().then(({hits}) => {
        if(hits.length === 0){
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return ;
        }
    createElementList(hits)
    });
}
function isSearchValid(e) {
    if(e.currentTarget.elements.searchQuery.value.trim() === ''){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        return true;
    }
}
function isHideBtn() {
    loadMoreBtn.classList.remove("is-hide");
    loadMoreBtn.disabled = true;
    Notiflix.Loading.arrows();
    Notiflix.Loading.remove(300);
    setTimeout(() => {
        loadMoreBtn.disabled = false;
    }, 1000);
}