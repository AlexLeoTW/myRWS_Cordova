var rwsEnv = {
    server: '192.168.1.2'
};

var app = {
    http: null,

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
        document.querySelector('.app').setAttribute('style', 'display:none');
        this.getFreewayList();
    },

    getFreewayList: function() {
        this.http.open('GET', rwsEnv.server, true);
        this.http.send();
        this.http.addEventListener('readystatechange', function() {
            document.querySelector('.app').setAttribute('style', 'display:none');
        }, false);
    },

    getFreewayInfo: function(id) {
        // W.I.P.
    },

    display: function (text) {
        // body...
    }
};

app.initialize();
