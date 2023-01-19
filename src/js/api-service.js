import axios from "axios";

export default class NewsApiService{
    constructor(){
        this.searchQuery = '';
        this.perPage = 5;
        this.page = 1;
    }
   async fetchArticles(){
        const API_KEY = '32899430-8e4282f6a276a3be5999f0793';
// const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`
        const instance = axios.create({
            baseURL: 'https://pixabay.com/api/',
            timeout: 1000,
            params: {'key': `${API_KEY}`,
            'q': `${this.searchQuery}`,
            'page': `${this.page}`,
            'per_page': `${this.perPage}`,
        }
          });
//    with fetch!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // return fetch(url)
        // .then(r => {
        //   return r.json();
        // })
        // .then( (data)=>{
        // this.page +=1;
        // return data})

//with axios standart!!!!!!!!!!!!!!!
        // return axios.get(`${url}`)
// with axios instance!!!!!!!!!!!!!!!!!!!!

    //    return instance()
    //     .then( (response)=>{
    //     this.page +=1;
    //     return response.data})
    //     .catch(error => console.log(error))

// axios instance + asycn/await !!!!!!!!!!!!!!!!!!

    const response = await instance;
    return response().then( response=>{

    this.page +=1;
    return response.data})
    .catch(error => console.log(error))

    }
    resetPageCount(){
        this.page = 1;
    }
    get query () {
        return this.query;
    }
    set query(newQuery){
         this.searchQuery = newQuery;
    }
}