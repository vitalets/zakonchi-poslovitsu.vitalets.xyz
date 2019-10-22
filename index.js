const REDIRECTOR_URL = 'https://vitalets.github.io/redirector/index.html';
const REDIRECTOR_PARAMS = {
  web: 'https://vk.com/zakonchi_poslovitsu',
  ios: 'vk://vk.com/zakonchi_poslovitsu',
  android: 'intent://vk.com/zakonchi_poslovitsu#Intent;package=com.vkontakte.android;scheme=vkontakte;end'
};

window.onerror = e => showError(e.message);

main();

function main() {
  location.href = buildUrl(REDIRECTOR_URL, REDIRECTOR_PARAMS);
}

function buildUrl(baseUrl, params) {
  const query = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
  return baseUrl + (query ? '?' + query : '');
}

function showError(message) {
  document.getElementById('error').textContent = message;
}
