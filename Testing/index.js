/*jslint browser: true, devel: true, forin: true, plusplus: true*/

var app = {
    send: function () {
        'use strict';
        var http = new XMLHttpRequest();
        
        console.log(document.getElementById('myform')[0].value);
        http.open('GET', 'http://localhost:3000/v1/freeway', true);
        http.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost');
        http.send();
        http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
                console.log(http.responseText);
                app.displayList(http.responseText);
            } else if (http.readyState === 4 && http.status === 404) {
                console.log('ERROR, server not found');
            }
        };
    },

    clear: function () {
        'use strict';
        document.getElementById('myform').reset();
        console.log('clear!');
    },
    
    displayList: function (list) {
        'use strict';
        var items = JSON.parse(list),
            listItem,
            display = document.getElementById('list');
        
        for (var i=0; i<items.length; i++) {
            listItem = document.createElement('LI');
            listItem.appendChild(document.createTextNode(items[i].name));
            display.appendChild(listItem);
        }
    }
};