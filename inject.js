(() => {
  const $script = document.createElement("script");
  const $script2 = document.createElement("script");
  $script2.setAttribute("src", "http://localhost:8000/dist/js/chunk-vendors.51a2ec2a.js");
  $script.setAttribute("src", "http://localhost:8000/dist/js/app.07ca7814.js");
  const $app = document.createElement('div');
  $app.setAttribute('id', 'app');
  document.body.appendChild($app);
  setTimeout(() => {
    document.body.appendChild($script2);
  },100);
  setTimeout(() => {
    document.body.appendChild($script);
  },200);
})();
