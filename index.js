(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Track_1 = require("./Track");
var PlaylistManager_1 = require("./PlaylistManager");
/**
 *
 */
var PurePlayer = (function () {
    function PurePlayer(customConfig) {
        this.playlist = new PlaylistManager_1.default();
    }
    /**
     *
     */
    PurePlayer.prototype.play = function (trackData) {
        this.playTrack(new Track_1.default(trackData));
        return this;
    };
    PurePlayer.prototype.stop = function () {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        return this;
    };
    PurePlayer.prototype.getCurrentTime = function () {
        return this.audioElement.currentTime;
    };
    PurePlayer.prototype.setCurrentTime = function (time) {
        this.audioElement.currentTime = time;
        return this;
    };
    PurePlayer.prototype.getCurrentTrack = function () {
        return this.currentTrack;
    };
    PurePlayer.prototype.playTrack = function (track) {
        if (!this.audioElement) {
            this.audioElement = new Audio();
        }
        return this;
    };
    return PurePlayer;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PurePlayer;

},{"./PlaylistManager":2,"./Track":3}],2:[function(require,module,exports){
"use strict";
var PlaylistManager = (function () {
    function PlaylistManager() {
    }
    return PlaylistManager;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PlaylistManager;

},{}],3:[function(require,module,exports){
"use strict";
var Track = (function () {
    function Track(data) {
        this.data = data;
    }
    Track.prototype.getStreamUrl = function () {
        return this.data.streamUrl;
    };
    Track.prototype.getStreamUrlList = function () {
        return this.data.streamUrlList;
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
    return Track;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Track;

},{}],4:[function(require,module,exports){
"use strict";
var Player_1 = require("./Player");
var player = new Player_1.default();

},{"./Player":1}]},{},[4]);
