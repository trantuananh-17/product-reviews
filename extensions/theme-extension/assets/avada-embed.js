(function() {
  const BASE_URL = 'https://compatibility-manufactured-uncertainty-caribbean.trycloudflare.com/scripttag';

  const scriptElement = document.createElement('script');
  scriptElement.type = 'text/javascript';
  scriptElement.async = 1;
  scriptElement.src = `${BASE_URL}/avada-product-review.min.js?v=${new Date().getTime()}`;

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(scriptElement, firstScript);
})();
