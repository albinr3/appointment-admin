const files = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/functions.js',
    '/js/variables.js',
    '/js/Classes/App.js',
    '/js/Classes/Appointment.js',
    '/js/Classes/UI.js',

];

const cacheName = 'apv-cache-2';

//when the service worker is installed, only show once
self.addEventListener('install', e => {
    console.log("Se instalo correctamente", e);

    e.waitUntil(
        caches.open(cacheName)
            .then( cache => {
                console.log('Cacheando');
                cache.addAll(files);
            })
    )

});

//when the sw is activated

self.addEventListener('activate', e => {
    console.log("Se activo correctamente", e);
// Actualizar la PWA //
    e.waitUntil(
        caches.keys()
            .then(keys => {
                console.log(keys); 

                return Promise.all(keys
                        .filter(key => key !== cacheName)
                        .map(key => caches.delete(key)) // borrar los demas
                    )
            })
    )

});


//fetch event to download static files

self.addEventListener('fetch', e => {
   

    e.respondWith(
        caches.match(e.request)
            .then( cacheResponse => {
                return cacheResponse || fetch(e.request);
            })
            .catch( () => caches.match('/error.html'))
        
        
    )

});

