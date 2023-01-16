export  function fetchImages(name,Notiflix) {
    return fetch(`https://pixabay.com/api/`)
        .then(response => {
        if (!response.ok) {
        Notiflix.Notify.failure("Oops, there is no country with that name")
        }
        return response.json();
        })
}