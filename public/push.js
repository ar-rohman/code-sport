let webPush = require('web-push');

const vapidKeys = {
    'publicKey':'BCMFw7NcSHN__hidden_key__hxgJFggYp2MVvXbAnw_0',
    'privateKey':'4MqT6DHee_q__hidden_key__Lj_OSKs'
};

webPush.setVapidDetails(
    'mailto:example@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
// ambil endpoint, p256dh, auth dari console
let pushSubscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/em1XRwgkwHI:APA91bEY5VN__hidden_key__a1lug6HNkJr',
    'keys': {
        'p256dh': 'BFh0OOhXzASnx/+75UgQe/pz__hidden_key__JQj+U04lnwdVI=',
        'auth': 'zK__hidden_key__9tv/HA=='
    }
};
let payload = 'Welcome to CodeSport!\nFind information on your favorite football team';
let options = {
    gcmAPIKey: '44__hidden_ID__49',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);