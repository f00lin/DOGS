chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('dogs.html', {
    bounds: {
      width: 1200,
      height: 800,
    },
  });
});
