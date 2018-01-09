global.console.error = function() {};
global.console.warn = function() {};
global.localStorage = (function() {
  var store = {};

  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value;
    },
    clear: function() {
      store = {};
    },
  };
})();
