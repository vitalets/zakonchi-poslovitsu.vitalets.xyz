const REDIRECTOR_URL = 'https://github.io/redirector/index.html';
const DOMAINS = [
  {
    domain: 'zakonchi-poslovitsu.vitalets.xyz',
    params: {
      web: 'https://vk.com/zakonchi_poslovitsu',
      ios: 'vk://vk.com/zakonchi_poslovitsu',
      android: 'intent://vk.com/zakonchi_poslovitsu#Intent;package=com.vkontakte.android;scheme=vkontakte;end'
    }
  }
];

window.onerror = e => showError(e.message);

main();

function main() {
  const redirect = DOMAINS.find(item => location.hostname === item.domain);
  if (redirect) {
    location.href = buildUrl(REDIRECTOR_URL, redirect.params);
  } else {
    showError(`Redirect not found: ${location.href}`);
  }
}

function buildUrl(baseUrl, params) {
  const query = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
  return baseUrl + (query ? '?' + query : '');
}

function showError(message) {
  document.getElementById('error').textContent = message;
}
