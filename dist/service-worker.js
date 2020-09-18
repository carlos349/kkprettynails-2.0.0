/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts(
<<<<<<< HEAD
  "/precache-manifest.7223f9db85c7980820802cf09235f4ee.js"
=======
<<<<<<< HEAD
  "/precache-manifest.4d7dfeb7eeff7861542bfdce98d2efd0.js"
=======
  "/precache-manifest.3f47434a7265ab092cb3cc1377b5dd0d.js"
>>>>>>> 3dafae667721599af6e406a133291320836bff3d
>>>>>>> 47777c7e5f11a41e1e53ffe70b9974f54cf7dd37
);

workbox.core.setCacheNameDetails({prefix: "vue-argon-dashboard"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
