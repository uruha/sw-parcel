import message from './message';

console.log(message);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/worker.ts')
            .then(registration => {
                console.log(
                    'ServiceWorker registration successful with scope: ',
                    registration.scope
                );
            })
            .catch(err => {
                console.log('ServiceWorker registration falled: ', err);
            });
    });
}
