// @ts-ignore
import { ajax } from './utils';
import Emitter from './emitter';
import { LyricBaseOptions } from './lyric.d';


class LyricBase extends Emitter {
  lyricObj: {
    timeArray: Array<any>,
    lyricArray: Array<any>
  } = {
    timeArray: [],
    lyricArray: []
  };
  lyric: any;
  lyricCurrentPosition = 0;
  mediaObject: any;
  container: any;
  constructor(options: LyricBaseOptions) {
    super();
    this.mediaObject = options.mediaObject;
    this.lyric = options.lyric;
    this.container = options.container;
  }
  parseLyricItems(items: any) {
    var result: Array<any> = [];
    var timePattern = /\[[0-9]{2}:[0-9]{2}\.[0-9]{2,3}\]/g;
    for(var i = 0, l = items.length; i < l; i++) {
      var thisItem = items[i];
      var timeSpanArray = thisItem.match(timePattern);
      if (timeSpanArray) {
        var lyric = thisItem.split(timePattern).pop();
        for (var j = 0, len = timeSpanArray.length; j < len; j++) {
          result.push(timeSpanArray[j]+lyric);
        }
      };
    }
    return result;
  }
  logLyricInfo(items: any){
    var patt = /\[|\]/;
    for (var i = 0; i < items.length; i++) {
      var component = items[i].split(patt);
      if (component[2] === '') {
        // If no lyric
      }
      this.lyricObj.timeArray.push(this.parseTimeToSeconds(component[1]));
      this.lyricObj.lyricArray.push(component[2]);
    }
  }

  compareTimeSpan(x: any,y:any): number {
    var timePattern = /\[([0-9]{2}:[0-9]{2}\.[0-9]{2,3})\]/;
    var xTime = x.match(timePattern)[1], yTime = y.match(timePattern)[1];
    var xTimeInSeconds: number = this.parseTimeToSeconds(xTime), yTimeInSeconds: number = this.parseTimeToSeconds(yTime);
    return xTimeInSeconds - yTimeInSeconds;
  }

  parseTimeToSeconds(timeString: string): number {
    var component = timeString.split('.');
    var bigPart = component[0];
    var bigPartComponent = bigPart.split(':');
    var minutePart = parseInt(bigPartComponent[0]);
    var secondPart = parseInt(bigPartComponent[1]);
    return parseFloat(minutePart * 60 + secondPart + '.' + component[1]);
  }

  addLyric() {
    var that = this;
    var lyric = this.lyric;
    if (lyric) {
      if (typeof lyric === 'string') {  
        if (lyric.substr(0, 8) === 'https://' || lyric.substr(0, 7) === 'http://') {
          ajax({url:lyric, contentType: "text/plain"}).then(function(lyricText: any){
            var lyricItems = lyricText.responseText.split(/[\n\r]/g);
            lyricItems = that.parseLyricItems(lyricItems);
            lyricItems.sort(function(x: any,y: any){ return that.compareTimeSpan.call(that,x,y);});
            // TODO
            that.trigger('lyricFetched', lyricItems);
            that.logLyricInfo(lyricItems);
          },function(err: any){
            console.log('error:', err);
          });
        }
      }
    }
  }

  bindLyricEvents() {
    var that = this;
    var media = this.mediaObject;
    if (!media) return ;
    media.addEventListener('timeupdate', function(){
      if (that.lyric && that.lyricObj.timeArray.length && that.lyricObj.lyricArray.length) {
        that.trigger('timeupdated', media.currentTime);
      }
    }, false);
  }

  loadLyricPlugin() {
    this.addLyric();
    this.bindLyricEvents();
  }
}

export default LyricBase;