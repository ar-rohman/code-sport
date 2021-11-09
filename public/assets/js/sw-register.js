// check service worker
if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        registerServiceWorker();
        requestPermission();
    });
}
else {
    console.log('ServiceWorker is not supported in this browser yet');
}

// register service worker
const registerServiceWorker = () => {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('ServiceWorker registered successfully');
            return registration;
        })
        .catch(error => {
            console.log('Failed to register ServiceWorker. ', error);
        });
}

const requestPermission = () => {
    if('Notification' in window) {
        Notification
        .requestPermission()
        .then(result => {
            if(result === 'denied') {
                console.log('Notification feature is not allowed');
                return;
            }
            else if(result === 'default') {
                console.error('User has closed the permission request dialog box');
                return;
            }

            // Push manager
            navigator.serviceWorker.ready.then(() => {
                if('PushManager' in window) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly:true,
                            // get key form console with: web-push generate-vapid-keys --json 
                            // copy public key 
                            applicationServerKey: urlBase64ToUnit8Array('BCMFw7NcSHNKutiuURW__hidden_key__bAnw_0')
                        })
                        .then(subscribe => {
                            console.log('Successfully subscribed with endpoint: ', subscribe.endpoint);
                            console.log('Successfully subscribed with p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh'))
                            )));
                            console.log('Successfully subscribed with auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth'))
                            )));
                        })
                        .catch(e => {
                            console.error('Unable to subscribe ', e.message);
                        });
                    });
                }
            });
        });
    }
}

const  urlBase64ToUnit8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}