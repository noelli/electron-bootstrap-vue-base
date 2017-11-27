// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var remote = require( 'electron' ).remote;
var win = remote.getCurrentWindow();

const Vue = require('vue');
var nav = new Vue({
    el: '#nav',
    data: {
      maximized: window.isMaximized,
      old_size: window.getSize,
    },
    methods: {
      minimize: function (event) {
        win.minimize();
      },
      maximize: function (event) {
        win.setFullScreen(true);
        this.maximized = true;
      },
      restore: function (event) {
        win.setFullScreen(false);
        this.maximized = false;
      },
      close: function (event) {
        win.close();
      },
    }
  })