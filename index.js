(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Track_1 = require("./Track");
var PlaylistManager_1 = require("./PlaylistManager");
var util_1 = require("./util");
/**
 *
 */
var PurePlayer = (function (_super) {
    __extends(PurePlayer, _super);
    function PurePlayer(customConfig) {
        var _this = this;
        _super.call(this);
        this.currentUrlIndex = 0;
        this.playlist = new PlaylistManager_1.default();
        document.getElementById('stop').addEventListener('click', function () {
            _this.stop();
        });
    }
    /**
     *
     */
    PurePlayer.prototype.play = function (trackData) {
        this.playTrack(new Track_1.default(trackData));
    };
    PurePlayer.prototype.stop = function () {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
    };
    PurePlayer.prototype.getCurrentTime = function () {
        return this.audioElement.currentTime;
    };
    PurePlayer.prototype.setCurrentTime = function (time) {
        this.audioElement.currentTime = time;
    };
    PurePlayer.prototype.getCurrentTrack = function () {
        return this.currentTrack;
    };
    PurePlayer.prototype.setVolume = function (volume) {
        this.audioElement.volume = volume;
    };
    PurePlayer.prototype.getVolume = function () {
        return this.audioElement.volume;
    };
    PurePlayer.prototype.playTrack = function (track) {
        var _this = this;
        if (!this.audioElement) {
            this.audioElement = new Audio();
        }
        var audio = this.audioElement;
        var onerrorCallback = function (event) {
            if (!event.currentTarget.error) {
                return;
            }
            _this.currentUrlIndex++;
            _this.playTrack(track);
        };
        track.orderStreamUrls(audio);
        audio.removeEventListener('error', onerrorCallback);
        if (this.currentUrlIndex >= track.getUrlsNumber()) {
            this.emit('error', track);
            this.stop();
            return;
        }
        audio.addEventListener('error', onerrorCallback, false);
        audio.src = track.getStreamUrl(this.currentUrlIndex).url;
        audio.play();
    };
    return PurePlayer;
}(util_1.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PurePlayer;

},{"./PlaylistManager":3,"./Track":4,"./util":6}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var util_1 = require("./util");
var Playlist = (function (_super) {
    __extends(Playlist, _super);
    function Playlist(name) {
        _super.call(this);
        this.name = name;
    }
    Playlist.prototype.addTrack = function (track) {
        this.tracks.push(track);
    };
    Playlist.prototype.removeTrack = function (track) {
        this.tracks = this.tracks.filter(function (item) {
            return item !== track;
        });
    };
    Playlist.prototype.contains = function (track) {
        return this.tracks.indexOf(track) !== -1;
    };
    Playlist.prototype.getName = function () {
        return this.name;
    };
    Playlist.prototype.getCurrentTrack = function () {
        return this.tracks[this.currentTrack];
    };
    Playlist.prototype.nextTrack = function (circular) {
        if (this.currentTrack < this.tracks.length - 1) {
            this.currentTrack++;
        }
        else if (circular) {
            this.currentTrack = 0;
        }
    };
    Playlist.prototype.prevTrack = function (circular) {
        if (this.currentTrack > 0) {
            this.currentTrack--;
        }
        else if (circular) {
            this.currentTrack = this.tracks.length - 1;
        }
    };
    return Playlist;
}(util_1.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Playlist;

},{"./util":6}],3:[function(require,module,exports){
"use strict";
var Playlist_1 = require("./Playlist");
var Track_1 = require("./Track");
var PlaylistManager = (function () {
    function PlaylistManager() {
        this.playlists = [];
        this.createPlaylist('default');
    }
    PlaylistManager.prototype.add = function (trackData) {
        this.addTrack(new Track_1.default(trackData));
    };
    PlaylistManager.prototype.addTrack = function (track) {
        this.currentPlaylist.addTrack(track);
    };
    PlaylistManager.prototype.createPlaylist = function (name) {
        this.playlists.push(new Playlist_1.default(name));
    };
    PlaylistManager.prototype.getPlaylist = function (name) {
        return this.playlists.filter(function (item) {
            return item.getName() === name;
        })[0] || null;
    };
    PlaylistManager.prototype.usePlaylist = function (name) {
        this.currentPlaylist = this.getPlaylist(name);
    };
    PlaylistManager.prototype.hasPlaylist = function (name) {
        return this.playlists.filter(function (item) {
            return item.getName() === name;
        }).length === 1;
    };
    return PlaylistManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlaylistManager;

},{"./Playlist":2,"./Track":4}],4:[function(require,module,exports){
"use strict";
var Track = (function () {
    function Track(data) {
        this.isUrlsOrdered = false;
        this.data = data;
    }
    Track.prototype.getStreamUrlList = function () {
        return this.data.streamUrlList;
    };
    Track.prototype.getUrlsNumber = function () {
        return this.data.streamUrlList.length;
    };
    Track.prototype.getStreamUrl = function (number) {
        return this.data.streamUrlList[number];
    };
    Track.prototype.getTitle = function () {
        return this.data.title;
    };
    Track.prototype.getAuthor = function () {
        return this.data.author;
    };
    Track.prototype.getAlbum = function () {
        return this.data.album;
    };
    Track.prototype.getFullData = function () {
        return this.data;
    };
    Track.prototype.orderStreamUrls = function (audio) {
        if (this.isUrlsOrdered) {
            return;
        }
        var list = this.getStreamUrlList();
        var result = [];
        var verdicts = ['probably', 'maybe', ''];
        verdicts.forEach(function (verdict) {
            var sublist = list.filter(function (item) {
                return audio.canPlayType(item.type) === verdict;
            });
            result = result.concat(sublist);
        });
        this.data.streamUrlList = result;
        this.isUrlsOrdered = true;
    };
    return Track;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Track;

},{}],5:[function(require,module,exports){
"use strict";
var Player_1 = require("./Player");
var player = new Player_1.default();
player.play({
    streamUrlList: [{
            type: 'audio/vsdvsdv',
            url: 'notfound1'
        }, {
            type: 'audio/ogg',
            url: 'notfound2'
        }, {
            type: 'audio/mp3',
            url: 'http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3'
        }, {
            type: 'audio/wav',
            url: 'notfound3'
        }, {
            type: 'audio/grgerg',
            url: 'notfound4'
        }]
});

},{"./Player":1}],6:[function(require,module,exports){
"use strict";
var EventEmitter = (function () {
    function EventEmitter() {
        this.callbacks = {};
    }
    EventEmitter.prototype.on = function (eventName, callback) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
    };
    EventEmitter.prototype.emit = function (eventName, data) {
        if (!this.callbacks[eventName]) {
            return;
        }
        this.callbacks[eventName].forEach(function (callback) {
            callback(data);
        });
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;

},{}]},{},[5]);
