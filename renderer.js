// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var win = require( 'electron' ).remote.getCurrentWindow();
const Vue = require('vue');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'dokuapp',
  password : 'none',
});

connection.connect(function(err) {
  // connected! (unless `err` is set)
  if (!err){
    console.log("Connected!");
  } else {
    console.log(err);
  };
});

var nav = new Vue({
    el: '#nav',
    data: {
      maximized: false,
      old_size: window.getSize,
      selectedCategory: {},
      categories: ["racks", "switches", "clients", "servers", "patchpanels"]
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
      open: function (event) {
        console.log("opened");
      },
      save: function (event) {
        var rack  = {liegenschaft: 'ar', bauteil: 'e', number:''};
        var query = connection.query('INSERT INTO dokuapp.racks SET ?', rack, function(err, result) {
          // wow
        });
        console.log("last sql: " + query.sql);
      },
      rundb: function (event) {
        var table = connection.query("select * from dokuapp.racks");
        table
          .on('error', function(err) {
            console.log(error)// Handle error, an 'end' event will be emitted after this as well
          })
          .on('fields', function(fields) {
            // fields recieved
          })
          .on('result', function(row) {
            // Pausing the connnection is useful if your processing involves I/O
            // connection.pause();

            console.log(row) //, function() {
              //connection.resume();
            //});
          })
          .on('end', function() {
            // all rows have been received
          });
      },
      changeCategory: function (event) {
//
      }
    }
  })

  var main = new Vue({
    el: '#main',
    data: {
      columns: [
        {id:1, name:"test1"},
        {id:2, name:"test2"},
        {id:3, name:"test3"},
        {id:4, name:"test4"},
        {id:5, name:"test5"},
        {id:6, name:"test6"},
      ],
      rows: [
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
        {test1: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" }
      ]
    },
    methods: {}
  })