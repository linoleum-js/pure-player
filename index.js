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
var default_config_1 = require("./default-config");
var dom_1 = require("./dom");
/**
 *
 */
var PurePlayer = (function (_super) {
    __extends(PurePlayer, _super);
    function PurePlayer(customConfig) {
        _super.call(this);
        this.currentUrlIndex = 0;
        this.config = util_1.deepExtend({}, default_config_1.default, customConfig);
        this.playlist = new PlaylistManager_1.default();
        this.registerEvents();
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
        this.isPlaying = false;
    };
    PurePlayer.prototype.pause = function () {
        this.isPlaying = false;
        this.audioElement.pause();
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
    PurePlayer.prototype.setCurrentTrack = function (track) {
        this.currentTrack = track;
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
            this.createAudioElement();
        }
        if (this.currentUrlIndex >= track.getUrlsNumber()) {
            this.emit('error', track);
            this.stop();
            return;
        }
        var audio = this.audioElement;
        var onerrorCallback = function (event) {
            if (!event.currentTarget.error) {
                return;
            }
            _this.currentUrlIndex++;
            _this.playTrack(track);
        };
        audio.removeEventListener('error', onerrorCallback);
        audio.addEventListener('error', onerrorCallback, false);
        track.orderStreamUrls(audio);
        audio.src = track.getStreamUrl(this.currentUrlIndex).url;
        audio.play();
    };
    PurePlayer.prototype.createAudioElement = function () {
        var audio = new Audio();
        for (var attrName in this.config.audioAttributes) {
            audio[attrName] = this.config.audioAttributes[attrName];
        }
        this.audioElement = audio;
    };
    PurePlayer.prototype.registerEvents = function () {
        var _this = this;
        var config = this.config;
        var getClass = function (ctrlName) {
            var className = config.nodes[ctrlName];
            return '.' + className;
        };
        var addEvent = function (eventName, ctrlName, callback) {
            dom_1.default.on(eventName, getClass(ctrlName), function (event) {
                if (!config.preventEvents) {
                    callback(event);
                }
            });
        };
        addEvent('click', 'btnPlay', function () {
            _this.playTrack(_this.getCurrentTrack());
        });
        addEvent('click', 'btnPause', function () {
            _this.pause();
        });
        addEvent('click', 'btnStop', function () {
            _this.stop();
        });
        addEvent('click', 'btnNext', function () {
            _this.stop();
            _this.playlist.nextTrack(config.circular);
            _this.setCurrentTrack(_this.playlist.getCurrentTrack());
            _this.playTrack(_this.getCurrentTrack());
        });
        addEvent('click', 'btnNext', function () {
            _this.stop();
            _this.playlist.prevTrack(config.circular);
            _this.setCurrentTrack(_this.playlist.getCurrentTrack());
            _this.playTrack(_this.getCurrentTrack());
        });
    };
    return PurePlayer;
}(util_1.EventEmitter));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PurePlayer;

},{"./PlaylistManager":3,"./Track":4,"./default-config":5,"./dom":6,"./util":8}],2:[function(require,module,exports){
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

},{"./util":8}],3:[function(require,module,exports){
"use strict";
var Playlist_1 = require("./Playlist");
var Track_1 = require("./Track");
var PlaylistManager = (function () {
    function PlaylistManager() {
        this.playlists = [];
        this.createPlaylist('default');
    }
    PlaylistManager.prototype.getCurrentTrack = function () {
        return this.currentPlaylist.getCurrentTrack();
    };
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
    PlaylistManager.prototype.nextTrack = function (circular) {
        this.currentPlaylist.nextTrack(circular);
    };
    PlaylistManager.prototype.prevTrack = function (circular) {
        this.currentPlaylist.prevTrack(circular);
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
        var verdicts = ['probably', 'maybe', ''];
        var result = [];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    audioAttributes: {
        preload: 'auto',
        autoplay: 'false'
    },
    circular: false,
    preventEvents: false,
    nodes: {
        root: 'js-player',
        btnPlay: 'js-player-play',
        btnStop: 'js-player-stop',
        btnPause: 'js-player-pause',
        btnPlayToggle: 'js-player-play-toggle',
        btnNext: 'js-player-next',
        btnPrev: 'js-player-prev',
        inputVolume: 'js-player-input-volume',
        inputTime: 'js-player-input-time',
        playlistItem: 'js-player-playlist-item'
    }
};

},{}],6:[function(require,module,exports){
"use strict";
var util_1 = require("./util");
;
var $ = function $(selector, startNode) {
    if (startNode === void 0) { startNode = document; }
    return startNode.querySelectorAll(selector);
};
$.removeClass = function (element, className) {
    var classList = element.className.split(' ');
    element.className = classList.filter(function (item) {
        return item.trim() !== className.trim();
    }).join(' ');
};
$.hasClass = function (element, className) {
    var classList = element.className.split(' ');
    return classList.some(function (item) {
        return item.trim() === className.trim();
    });
};
$.addClass = function (element, className) {
    if ($.hasClass(element, className)) {
        return;
    }
    var classList = element.className.split(' ');
    classList.push(className);
    element.className = classList.join(' ');
};
$.toggleClass = function (element, className) {
    if ($.hasClass(element, className)) {
        $.removeClass(element, className);
    }
    else {
        $.addClass(element, className);
    }
};
$.on = function (eventName, selector, callback) {
    document.addEventListener(eventName, function (event) {
        if (util_1.matchesSelector(event.target, selector)) {
            callback(event);
        }
    }, false);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = $;

},{"./util":8}],7:[function(require,module,exports){
"use strict";
var Player_1 = require("./Player");
var player = new Player_1.default({
    nodes: {
        root: 'custom'
    }
});
// player.play({
//   streamUrlList: [{
//     type: 'audio/vsdvsdv',
//     url: 'notfound1'
//   }, {
//     type: 'audio/ogg',
//     url: 'notfound2'
//   }, {
//     type: 'audio/mp3',
//     url: 'http://download.wavetlan.com/SVV/Media/HTTP/MP3/Helix_Mobile_Producer/HelixMobileProducer_test1_MPEG2_Mono_CBR_40kbps_16000Hz.mp3'
//   }, {
//     type: 'audio/wav',
//     url: 'notfound3'
//   }, {
//     type: 'audio/grgerg',
//     url: 'notfound4'
//   }]
// });

},{"./Player":1}],8:[function(require,module,exports){
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
var isArray = function (value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};
var isObject = function (value) {
    return value !== null && !isArray(value) && typeof value === 'object';
};
function deepExtend() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    var target = args[0];
    var sources = args.slice(1);
    sources.forEach(function (source) {
        for (var key in source) {
            var sourceValue = source[key];
            var targetValue = target[key];
            if (isObject(sourceValue)) {
                target[key] = deepExtend({}, targetValue, sourceValue);
            }
            else {
                target[key] = source[key];
            }
        }
    });
    return target;
}
exports.deepExtend = deepExtend;
var proto = Element.prototype;
var nativeMatches = proto.matches
    || proto.matchesSelector
    || proto.webkitMatchesSelector
    || proto.mozMatchesSelector
    || proto.msMatchesSelector
    || proto.oMatchesSelector;
function matchesSelector(element, selector) {
    return nativeMatches.call(element, selector);
}
exports.matchesSelector = matchesSelector;

},{}]},{},[7]);
