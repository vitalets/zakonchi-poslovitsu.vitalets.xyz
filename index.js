redirect({
  webUrl: 'https://vk.com/zakonchi_poslovitsu',
  iosUrl: 'vk://vk.com/zakonchi_poslovitsu',
  androidUrl: 'intent://vk.com/zakonchi_poslovitsu#Intent;package=com.vkontakte.android;scheme=vkontakte;end'
});

/**
 * Opens webpage and also tries to open mobile app.
 * @param {string} webUrl
 * @param {string} iosUrl
 * @param {string} androidUrl
 */
function redirect({webUrl, iosUrl, androidUrl}) {
  window.onerror = e => showError(e.message);

  // always open web page as fallback
  if (webUrl) {
    setTimeout(() => location.href = webUrl, 500);
  } else {
    showError(`No "webUrl" parameter found in url: ${location.href}`);
  }

  // try open ios app
  if (iosUrl && isIos()) {
    location.href = iosUrl;
  }

  // try open android app
  if (androidUrl && isAndroid()) {
    location.href = androidUrl;
  }
}

// see: https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
function isAndroid() {
  return /android/i.test(navigator.userAgent);
}

// see: https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
function isIos() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function showError(message) {
  const el = document.createElement('div');
  el.style.color = 'red';
  el.textContent = message;
  document.body.appendChild(el);
}
