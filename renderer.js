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

function reconnect() {
  connection.connect(function(err) {
    // connected! (unless `err` is set)
    if (!err){
      console.log("Connected!");
    } else {
      console.log(err);
    };
  });
}
// ################### get the categories available ########################
function getCategories (ic) {
  var cats = [];
  var obj = {};
  var table = connection.query("select * from dokuapp.categories");
  table
    .on('error', function(err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        reconnect();
      }
      console.log("sql: " + table.sql)
      console.log(err)// Handle error, an 'end' event will be emitted after this as well
    })
    .on('fields', function(fields) {
      //
    })
    .on('result', function(row) {
      // Pausing the connnection is useful if your processing involves I/O
      connection.pause();
      obj[row.name] = JSON.parse(row.fields);
      cats.push(row.name);
      //, function() {
      connection.resume();
      //});
    })
    .on('end', function() {
      // all rows have been received
    });
    if (ic) {
      return cats;
    } else {
      return obj;
    }
}

const daten = {
  maximized: false,
  old_size: window.getSize,
  categories: getCategories(true),
  categoryfields: getCategories(false),
  selectedCategory: {},
  editor: false,
  addselector: false,
  addrow: {},
  whichRow: "",
  editbox: {},
  submitrow: [],
  columns: ["bla",  "blablussb",  "blablussb",  "blablussb",  "blablussb",  "blablussb"],
  rows: [
    {name: "bla", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla1", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla2", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla3", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla4", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla5", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla6", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla7", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla8", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla9", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "bla0", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blaß", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blaq", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blaw", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blae", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blar", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blat", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blaz", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blai", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blao", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" },
    {name: "blap", test2: "blablussb", test3: "blablussb", test4: "blablussb", test5: "blablussb", test6: "blablussb" }
  ]};

var main = new Vue({
  el: '#main',
  data: daten,
  methods: {
    edit: function (rowindex, event) {
      this.whichRow = rowindex;
    },
    submit: function (rowname, rowindex, event) {
      this.whichRow = "";
      var values = this.rows[rowindex];
      delete values['name'];
      var update = connection.query("UPDATE dokuapp." + this.selectedCategory + " SET ? WHERE ?", [values, {name: rowname}]);
      update
        .on('error', function(err) {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            reconnect();
          }
          console.log("sql: " + update.sql)
          console.log(err)  // Handle error, an 'end' event will be emitted after this as well
        })
        .on('end', function() {
          // all rows have been received
        });
        nav.changeCategory();
    },
    cancel: function (event) {
      this.whichRow = "";
      this.addselector = true;
      this.addrow = {};
      nav.changeCategory();
    },
    toggleadd: function (event) {
      this.addselector = true;
      this.addrow = {};
      for (i = 0; i < this.categoryfields[this.selectedCategory].length; i++) {
        if (this.categoryfields[this.selectedCategory][i] === "name"){
          this.addrow[this.categoryfields[this.selectedCategory][i]] = "name";
        } else {
          this.addrow[this.categoryfields[this.selectedCategory][i]] = "";
        }
      }
    },
    add: function (event) {
      this.addselector = false;
      delete this.addrow['name'];
      var add = connection.query("INSERT INTO dokuapp." + this.selectedCategory + " SET ? ", [this.addrow]);
      add
        .on('error', function(err) {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            reconnect();
          }
          console.log("sql: " + add.sql)
          console.log(err)  // Handle error, an 'end' event will be emitted after this as well
        })
        .on('end', function() {
          // all rows have been received
        });
        nav.changeCategory();
    }

  }
})

var nav = new Vue({
    el: '#nav',
    data: daten,
    methods: {
      // ################# minimize the window ###################
      minimize: function (event) {
        win.minimize();
      },
      // ################# maximize the window ###################
      maximize: function (event) {
        win.setFullScreen(true);
        this.maximized = true;
      },
      // ################# restore the window to it's former size after being maximized ###################
      restore: function (event) {
        win.setFullScreen(false);
        this.maximized = false;
      },
      // ################# close the Window ###################
      close: function (event) {
        win.close();
      },
      // ################# Example save function ###################
      save: function (event) {
        var rack  = {name: 'racks', fields: JSON.stringify(["id", "name"])};
        var query = connection.query('INSERT INTO dokuapp.categories SET ?', rack, function(err, result) {
          if (err) {
            console.log(err)
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              reconnect();
            }
          }
        });
        console.log("last sql: " + query.sql);
      },
      rundb: function (event) {
        console.log(this.columns);
        console.log(this.rows);
        console.log(this.selectedCategory);
      },
      // ################# Change the Category ###################
      changeCategory: function (event) {
        var new_columns = [];
        var new_rows = [];
        var selectstring = "";
        for (i = 0; i < this.categoryfields[this.selectedCategory].length; i++){
          if (i>0) {
            selectstring += ", " + this.categoryfields[this.selectedCategory][i];
          }else{
            selectstring += this.categoryfields[this.selectedCategory][i];
          }
        }
        var table = connection.query("select " + selectstring + " from dokuapp." + this.selectedCategory);
        table
          .on('error', function(err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
              reconnect();
            }
            console.log("sql: " + table.sql)
            console.log(err)// Handle error, an 'end' event will be emitted after this as well
          })
          .on('fields', function(fields) {
            for (i = 0; i < fields.length; i++) {
              new_columns.push(fields[i].name);
            }
          })
          .on('result', function(row) {
            // Pausing the connnection is useful if your processing involves I/O
            connection.pause();
            new_rows.push(row);
            //, function() {
            connection.resume();
            //});
          })
          .on('end', function() {
            // all rows have been received
          });
          this.editbox = {};
          this.columns = new_columns;
          for (column in this.columns) {
            this.editbox[column] = "";
          }
          this.rows = new_rows;
          this.whichRow = "";
          this.addselector = false
      },
      search: function (event) {
        //
      }
    }
  })
