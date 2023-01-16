import Notiflix from 'notiflix';
import axios from "axios";
let debounce = require('lodash.debounce');

const axios = require('axios');

const refs = {
    input: document.querySelector('input'),
    submit: document.querySelector('button'),
    imageBlock: document.querySelector('.gallery'),
}
const {input,submit,imageBlock} = refs;
const  DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
submit.addEventListener('click', onClick);

function onClick (e) {
    
}

function onInput(e) {
    console.log(1);
    e.preventDefault();
    resetHtml()
    let name = e.target.value.trim();
    if (name === '') {
        return;
    }
    // fetchCountries(name,Notiflix).then(checkupByQuantity)
}
function resetHtml() {
    imageBlock.innerHTML = '';
}
