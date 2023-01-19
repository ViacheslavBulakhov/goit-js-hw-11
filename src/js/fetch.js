const axios = require('axios').default;
const API_KEY = '32899430-8e4282f6a276a3be5999f0793';
// Make a request for a user with a given ID
export  function fetchImages(name,Notiflix) {
    axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&image_type=photo`)

    .then(function (response) {
      if (response.data.total === 0) {
          Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
          return;
          }
          console.log(response);
          return response;
          })
    .catch(function (error) {
      console.log(error);
    })
}