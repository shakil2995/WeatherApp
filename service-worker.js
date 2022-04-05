importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');
workbox.routing.regesterRouter(
    ({request})=> request.destination === 'image',
    new workbox.strategies.NetworkFirst()
)