/*jslint browser: true, devel: true, forin: true, plusplus: true, vars: true, indent: 4*/
/*global XmlHttpRequest */



var rwsEnv = {
    server: '192.168.1.24:3000'
};

var app = {
    http: null,
    freewayList: null,

    // Application Constructor
    initialize: function () {
        'use strict';
        console.log('initialize');
        this.bindEvents();
        this.http = new XMLHttpRequest();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        'use strict';
        console.log('binding...');
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        'use strict';
        app.freewayList = app.getFreewayList();
    },

    getFreewayList: function () {
        'use strict';
        this.http.open('GET', rwsEnv.server, true);
        this.http.send();
        this.http.onreadystatechange = function () {
            app.debug('updading freeway list...');
            if (app.http.readyState === 4 && app.http.status === 200) {
                freewayList = JSON.parse(app.http.responseText);
                document.getElementById('freewayList').appendChild(app.toHtmlSelect(
                    freewayList,
                    function (item) {
                        return item.name;
                    }, function (item) {
                        return item.name;
                    }
                ));
                return freewayList;
            } else if (app.http.readyState === 4 && app.http.status === 404) {
                app.debug('ERROR, server not found');
                return null;
            }
        };
    },

    toHtmlSelect: function (array, toValue, toName) {
        var option,
            select = document.createElement('SELECT');
        for (var i = 0; i < array.length; i++) {
            option = document.createElement('OPTION');
            option.appendChild(document.createTextNode(toName(array[i])));
            option.value = toValue(array[i]);
            select.appendChild(option);
        }
        return select;
    },

    getFreewayInfo: function (id) {
        'use strict';
        // W.I.P.
    },

    debug: function (text) {
        'use strict';
        document.getElementById('debug').innerHTML = text;
        console.log(text);
    },

    switchPage: function (to) {
        'use strict';
        var pages = document.querySelectorAll('.page'),
            x = 0;

        for (x in pages) {
            pages[x].setAttribute('style', 'display:none');
        }
        pages[to].setAttribute('style', 'display:block');
        switch (to) {
        case 1:
            // do-noting
            break;
        case 2:
            var list = document.getElementById('freewayList'),
                item = null;

            for (item in this.freewayList) {
                var node = document.createElement('option'),
                    text = document.createTextNode('item.name');
                node.getAttributeNode("value").value = item.id;
                node.appendChild(text);
                list.appendChild(node);
            }
            break;
        }
    }
};

app.initialize();
