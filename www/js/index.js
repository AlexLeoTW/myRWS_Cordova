var rwsEnv = {
    server: '192.168.1.2'
};

var app = {
    http: null,
    freewayList: null,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.http = new XmlHttpRequest();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.freewayList = app.getFreewayList();
    },

    getFreewayList: function() {
        this.http.open('GET', rwsEnv.server, true);
        this.http.send();
        this.http.addEventListener('readystatechange', function() {
            app.debug('updading freeway list...');
            if (http.readyState == 4 && http.status == 200) {
                app.freewayList = JSON.parse(http.responseText);
            } else if (http.readyState == 4 && http.status == 404) {
                app.debug('ERROR, server not found');
            }

        }, false);
    },

    getFreewayInfo: function(id) {
        // W.I.P.
    },

    debug: function (text) {
        document.getElementById('debug').innerHTML = text;
        console.log(text);
    },

    switchPage: function (to) {
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
                document.getElementById('freewayList');
                // W.I.P.
                break;
        }
    }
};

app.initialize();
