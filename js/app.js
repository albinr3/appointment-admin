if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then( result => console.log("se registro", result))
        .catch( error => console.log(error))
}