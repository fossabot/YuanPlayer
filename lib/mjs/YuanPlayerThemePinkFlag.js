function anonymous$1(locals, escapeFn, include, rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
}var __line = 1
  , __lines = "<div class=\"jp-video\" role=\"application\" aria-label=\"media player\">\r\n  <div class=\"jp-type-playlist\">\r\n    <div id=\"jquery_jplayer_N\" class=\"jp-jplayer\"></div>\r\n    <div class=\"jp-gui\">\r\n      <div class=\"jp-interface\">\r\n        <div class=\"jp-progress\">\r\n          <div class=\"jp-seek-bar\">\r\n            <div class=\"jp-play-bar\"></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"jp-current-time\" role=\"timer\" aria-label=\"time\">&nbsp;</div>\r\n        <div class=\"jp-duration\" role=\"timer\" aria-label=\"duration\">&nbsp;</div>\r\n        <div class=\"jp-details\">\r\n          <div class=\"jp-title\" aria-label=\"title\">&nbsp;</div>\r\n        </div>\r\n        <div class=\"jp-controls-holder\">\r\n          <div class=\"jp-volume-controls\">\r\n            <button class=\"jp-mute\" role=\"button\" tabindex=\"0\">mute</button>\r\n            <button class=\"jp-volume-max\" role=\"button\" tabindex=\"0\">max volume</button>\r\n            <div class=\"jp-volume-bar\">\r\n              <div class=\"jp-volume-bar-value\"></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"jp-controls\">\r\n            <button class=\"jp-previous\" role=\"button\" tabindex=\"0\">previous</button>\r\n            <button class=\"jp-play\" role=\"button\" tabindex=\"0\">play</button>\r\n            <button class=\"jp-stop\" role=\"button\" tabindex=\"0\">stop</button>\r\n            <button class=\"jp-next\" role=\"button\" tabindex=\"0\">next</button>\r\n          </div>\r\n          <div class=\"jp-toggles\">\r\n            <button class=\"jp-repeat\" role=\"button\" tabindex=\"0\">repeat</button>\r\n            <button class=\"jp-shuffle\" role=\"button\" tabindex=\"0\">shuffle</button>\r\n            <!--<button class=\"jp-full-screen\" role=\"button\" tabindex=\"0\">full screen</button>-->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"jp-playlist\">\r\n      <ul>\r\n        <!-- The method Playlist.displayPlaylist() uses this unordered list -->\r\n      </ul>\r\n    </div>\r\n    <div class=\"jp-no-solution\">\r\n      <span>Update Required</span>\r\n      To play the media you will need to either update your browser to a recent version or update your <a href=\"http://get.adobe.com/flashplayer/\" target=\"_blank\">Flash plugin</a>.\r\n    </div>\r\n  </div>\r\n</div>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s; }
    ; __append("<div class=\"jp-video\" role=\"application\" aria-label=\"media player\">\r\n  <div class=\"jp-type-playlist\">\r\n    <div id=\"jquery_jplayer_N\" class=\"jp-jplayer\"></div>\r\n    <div class=\"jp-gui\">\r\n      <div class=\"jp-interface\">\r\n        <div class=\"jp-progress\">\r\n          <div class=\"jp-seek-bar\">\r\n            <div class=\"jp-play-bar\"></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"jp-current-time\" role=\"timer\" aria-label=\"time\">&nbsp;</div>\r\n        <div class=\"jp-duration\" role=\"timer\" aria-label=\"duration\">&nbsp;</div>\r\n        <div class=\"jp-details\">\r\n          <div class=\"jp-title\" aria-label=\"title\">&nbsp;</div>\r\n        </div>\r\n        <div class=\"jp-controls-holder\">\r\n          <div class=\"jp-volume-controls\">\r\n            <button class=\"jp-mute\" role=\"button\" tabindex=\"0\">mute</button>\r\n            <button class=\"jp-volume-max\" role=\"button\" tabindex=\"0\">max volume</button>\r\n            <div class=\"jp-volume-bar\">\r\n              <div class=\"jp-volume-bar-value\"></div>\r\n            </div>\r\n          </div>\r\n          <div class=\"jp-controls\">\r\n            <button class=\"jp-previous\" role=\"button\" tabindex=\"0\">previous</button>\r\n            <button class=\"jp-play\" role=\"button\" tabindex=\"0\">play</button>\r\n            <button class=\"jp-stop\" role=\"button\" tabindex=\"0\">stop</button>\r\n            <button class=\"jp-next\" role=\"button\" tabindex=\"0\">next</button>\r\n          </div>\r\n          <div class=\"jp-toggles\">\r\n            <button class=\"jp-repeat\" role=\"button\" tabindex=\"0\">repeat</button>\r\n            <button class=\"jp-shuffle\" role=\"button\" tabindex=\"0\">shuffle</button>\r\n            <!--<button class=\"jp-full-screen\" role=\"button\" tabindex=\"0\">full screen</button>-->\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"jp-playlist\">\r\n      <ul>\r\n        <!-- The method Playlist.displayPlaylist() uses this unordered list -->\r\n      </ul>\r\n    </div>\r\n    <div class=\"jp-no-solution\">\r\n      <span>Update Required</span>\r\n      To play the media you will need to either update your browser to a recent version or update your <a href=\"http://get.adobe.com/flashplayer/\" target=\"_blank\">Flash plugin</a>.\r\n    </div>\r\n  </div>\r\n</div>")
    ; __line = 48;
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

function uuidv4() {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
}
/**
 * http://stackoverflow.com/questions/171251#16178864
 * Recursively merge properties and return new object
 * obj1 &lt;- obj2 [ &lt;- ... ]
 */
function merge(...args) {
    let dst = {}, src, p;
    while (args.length > 0) {
        src = args.splice(0, 1)[0];
        if (toString.call(src) == '[object Object]') {
            for (p in src) {
                if (src.hasOwnProperty(p)) {
                    if (toString.call(src[p]) == '[object Object]') {
                        dst[p] = merge(dst[p] || {}, src[p]);
                    }
                    else {
                        dst[p] = src[p];
                    }
                }
            }
        }
    }
    return dst;
}

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

n(css,{});

// @ts-ignore
function getClass$1(Base) {
    return class YuanPlayer extends Base {
        constructor(options) {
            options.useStateClassSkin = true;
            const defaultOptions = {
                useStateClassSkin: true,
                nativeControls: false,
                cssSelectorAncestor: `#yuan_container_${uuidv4()}`,
                cssSelector: {
                    play: '.jp-play',
                    stop: '.jp-stop',
                    currentTime: '.jp-current-time',
                    duration: '.jp-duration',
                    seekBar: '.jp-seek-bar',
                    playBar: '.jp-play-bar',
                    mute: '.jp-mute',
                    volumeMax: '.jp-volume-max',
                    volumeBar: '.jp-volume-bar',
                    volumeBarValue: '.jp-volume-bar-value',
                    repeat: '.jp-repeat',
                    title: '.jp-title',
                },
                stateClass: {
                    playing: 'jp-state-playing',
                    muted: 'jp-state-muted',
                    looped: "jp-state-looped",
                }
            };
            const mergedOptions = merge(defaultOptions, options);
            super(mergedOptions);
            this.options = mergedOptions;
            if (!this.nativeControls) {
                this.renderPlayerUI();
            }
        }
        renderPlayerUI() {
            var _a;
            const div = document.createElement('div');
            div.id = ((_a = this.options.cssSelectorAncestor) === null || _a === void 0 ? void 0 : _a.substring(1)) || '';
            div.classList.add('yuanplayer-pinkflag-player');
            div.innerHTML = anonymous$1();
            this.container.appendChild(div);
        }
    };
}

function anonymous(locals, escapeFn, include, rethrow
) {
rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm);
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
};
escapeFn = escapeFn || function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
}var __line = 1
  , __lines = "<li>\r\n  <div>\r\n    <a href=\"javascript:;\" class=\"jp-playlist-item-remove\">×</a>\r\n    <a href=\"javascript:;\" class=\"jp-playlist-item\" tabindex=\"0\"><%= locals.track.title %> <span class=\"jp-artist\"><%= locals.track.artist %></span></a>\r\n  </div>\r\n</li>"
  , __filename = undefined;
try {
  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s; }
    ; __append("<li>\r\n  <div>\r\n    <a href=\"javascript:;\" class=\"jp-playlist-item-remove\">×</a>\r\n    <a href=\"javascript:;\" class=\"jp-playlist-item\" tabindex=\"0\">")
    ; __line = 4
    ; __append(escapeFn( locals.track.title ))
    ; __append(" <span class=\"jp-artist\">")
    ; __append(escapeFn( locals.track.artist ))
    ; __append("</span></a>\r\n  </div>\r\n</li>")
    ; __line = 6;
  return __output;
} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}

}

function getClass(Base) {
    return class YuanPlayerPlayList extends Base {
        constructor(options) {
            const defaultOptions = {
                cssSelector: {
                    item: '.jp-playlist li',
                    shuffle: '.jp-shuffle',
                    remove: '.jp-playlist-item-remove',
                    next: '.jp-next',
                    previous: '.jp-previous',
                },
                stateClass: {
                    shuffled: 'jp-state-shuffled',
                    currentItem: 'jp-playlist-current',
                }
            };
            const mergedOptions = merge(defaultOptions, options);
            mergedOptions.player = options.player;
            mergedOptions.cssSelectorAncestor = options.player.cssSelectorAncestor;
            super(mergedOptions);
            this.options = mergedOptions;
            this.addEventListeners();
            this.renderList();
            this._highlightItem();
        }
        addEventListeners() {
            this.on('shuffledchanged', () => {
                this.renderList();
            });
            this.on('add', (trackItem) => {
                this.renderList();
                this._highlightItem();
            });
        }
        renderList() {
            const ulElement = document.querySelector(this.options.cssSelectorAncestor).querySelector('.jp-playlist ul');
            ulElement.innerHTML = this.list.map(item => {
                return anonymous({ track: item });
            }).join('');
        }
    };
}

const obj = {
    Player: getClass$1,
    PlayList: getClass
};

export { obj as default };