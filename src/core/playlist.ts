import Emitter from "./emitter";
import type { PlayListOptions } from "./playlist.d";

/**
 * The PlayList base class should be extended by a theme file to implement the play list UI
 */
class PlayList extends Emitter {
  static modes = ['none', 'single', 'random', 'order'];
  container;
  player;
  lyricObj;
  index = 0;
  list: Array<any> = [];
  modeIndex = 0;
  constructor(options: PlayListOptions) {
    super();
    this.container = options.container;
    this.modeIndex = PlayList.modes.indexOf(options.loop) > -1 ? PlayList.modes.indexOf(options.loop) : 0;
    this.player = options.player;
    this.lyricObj = options.lyricObj;
    this.list = options.list;

    // circular reference
    this.player.setPlaylistObject(this);

    this.addEvents();
  }
  switchModes() {
    const newVal = (++this.modeIndex) % PlayList.modes.length;
    this.modeIndex = newVal;
    this.trigger('modeChanged');
  }
  addEvents() {
    this.player.mediaObject.addEventListener('ended', () => {
      if (PlayList.modes[this.modeIndex] === 'none') {
        // Have played the last music
        if (this.index === this.list.length - 1) {
          // Reach the end;
          return;
        } else {
          this.index++;
          // Play the next one in the list
        }
      } else if (PlayList.modes[this.modeIndex] === 'random') {
        this.index = Math.floor(Math.random() * this.list.length);
        // Play the new one
      } else if (PlayList.modes[this.modeIndex] === 'single') {
        // Play current one
      } else if (PlayList.modes[this.modeIndex] === 'order') {
        if (this.index === this.list.length - 1) {
          // Reach the end;
          this.index = 0;
        } else {
          this.index++;
          // Play the next one in the list
        }
      }
      this.playAtIndex(this.index);
    });
  }
  playNextTrack() {
    if (this.index === this.list.length - 1) return false;
    this.index++;
    this.playAtIndex(this.index);
  }
  playPreviousTrack() {
    if (this.index === 0) return false;
    this.index--;
    this.playAtIndex(this.index);
  }
  playAtIndex(index: number = this.index) {
    if (this.player) {
      this.player.setMedia(this.list[index].source);
      this.player.mediaObject.load();
      this.player.play();
    }

    if (this.lyricObj) {
      this.lyricObj.lyric = this.list[index].lyric;
      this.lyricObj.addLyric();
    }
    this.trigger('playMusicAtIndex', index);
  }
}

export default PlayList;