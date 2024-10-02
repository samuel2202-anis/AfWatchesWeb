'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"android-icon-144x144.png": "5149c4d48a9f65f76c354952aae4ce2c",
"android-icon-192x192.png": "f36a7332ef79ff3924bff89e68cdc38a",
"android-icon-36x36.png": "d7e95284bf343f506b13037e949877d9",
"android-icon-48x48.png": "04d0f969c1bdd35a024b8422671b53f4",
"android-icon-72x72.png": "27c6fdf152d32e11d9f8054c65f3e690",
"android-icon-96x96.png": "8778d8bf4d82e834c08c293ec5da7789",
"apple-icon-114x114.png": "d85f27557ce9822328bc96d8d863d63d",
"apple-icon-120x120.png": "66fa975477bce65e032253fa7fb8d4bd",
"apple-icon-144x144.png": "5149c4d48a9f65f76c354952aae4ce2c",
"apple-icon-152x152.png": "d9c1e48cdbe3b084e4ff7960bae7662a",
"apple-icon-180x180.png": "abef03338119939c2439d673e9e6c0ef",
"apple-icon-57x57.png": "08b67e42cc7ba6773e46876f99baa93c",
"apple-icon-60x60.png": "162e14e4596f6fcef395cefb260478f1",
"apple-icon-72x72.png": "27c6fdf152d32e11d9f8054c65f3e690",
"apple-icon-76x76.png": "037cffb265f1bdf976a3dd52c7dce7f4",
"apple-icon-precomposed.png": "f9e60b14e57e228a2aa09096b2dff1de",
"apple-icon.png": "f9e60b14e57e228a2aa09096b2dff1de",
"assets/AssetManifest.bin": "c8d42abd5a8e0d8614dc0da12a168197",
"assets/AssetManifest.bin.json": "f273ebfa35773193d7eacce0b8839a7c",
"assets/AssetManifest.json": "500f9dc965c45debd2cb2a05dc5ceee6",
"assets/assets/1.png": "58a1348ce43138e5dc62b9a2cb80dc0a",
"assets/assets/2.png": "f8b73715cb9e260c7fd3b078101add3a",
"assets/assets/3.png": "6f6a2c59f2a65b048b79a0ead029c521",
"assets/assets/BabyShowerTime.ttf": "9edaf91cb15b6f94aa0daf42a3ff2b9b",
"assets/assets/DriverStationDemoBold.ttf": "6927adfa3f803f9056bb70c5ed1392eb",
"assets/assets/loading.gif": "b5777a2dd51f8d85bbc048dfbc30cef5",
"assets/assets/sa.gif": "4cadaec24166a5ca88bd44b77f6b6754",
"assets/FontManifest.json": "2223af73854a07152b7c58f831435d6f",
"assets/fonts/MaterialIcons-Regular.otf": "dc34b3bb2c137c054d14fd131c80dac0",
"assets/NOTICES": "465e89b2e47c61f4ec300a923823c669",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon-16x16.png": "dcfec50d04858c94b3880ad1141530d3",
"favicon-32x32.png": "9056c54334e22a68dee9d4e0f3e976f9",
"favicon-96x96.png": "8778d8bf4d82e834c08c293ec5da7789",
"favicon.ico": "74aadaa8de3f1a20692cad85e8114f77",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "d2e6e666462915c775248e4f46068257",
"index.html": "caf426d7b6f62246d9eccf21507c6156",
"/": "caf426d7b6f62246d9eccf21507c6156",
"main.dart.js": "f79292b433965c9b2552d57f31987262",
"manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"ms-icon-144x144.png": "5149c4d48a9f65f76c354952aae4ce2c",
"ms-icon-150x150.png": "4e54c5f2afdec281f30b088b871d57fc",
"ms-icon-310x310.png": "fd0d1dc82e5c69a38fde59de1ff0a0ab",
"ms-icon-70x70.png": "9810d8e47a432afe3f18af351a5644c7",
"version.json": "08e6de086efd8d3e2db1963236b83704"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
