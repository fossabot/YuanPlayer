import { PlayListOptions } from "../../core/playlist.d";
// @ts-ignore
import tpl from './playlist.ejs';

function getClass(Base) {
  return class YuanPlayerPlayList extends Base {
    constructor(options: PlayListOptions) {
      super(options);
  
      this.on('playMusicAtIndex', (index) => {
        this.updateHighlight();
      });
      this.renderUI();
      this.on('modeChanged', this.renderModeIcon.bind(this));
      this.on('shuffledChanged', () => {
        this.updateShuffleIcon();
        this.container.querySelector('.yuanplayer-bluemonday-playlist').innerHTML = tpl({tracks: this.list});
        this.updateHighlight();
      });

      const previousButton = this.player.container.querySelector('.jp-previous');
      previousButton?.addEventListener('click', () => {
        this.playPreviousTrack();
      });
      const nextButton = this.player.container.querySelector('.jp-next');
      nextButton?.addEventListener('click', () => {
        this.playNextTrack();
      });
      const repeatButton = this.player.container.querySelector('.jp-repeat');
      repeatButton?.addEventListener('click', () => {
        this.toggleRepeatAllMode();
      });
      const shuffleButton = this.player.container.querySelector('.jp-shuffle');
      shuffleButton?.addEventListener('click', () => {
        if (this.shuffled) {
          this.restore();
        } else {
          this.shuffle();
        }
      });
    }
    renderUI() {
      const div = document.createElement('div');
      div.className = 'yuanplayer-bluemonday-playlist';
      
      div.innerHTML = tpl({tracks: this.list});
      this.container.appendChild(div);

      div.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target?.classList?.contains('jp-playlist-item')) {
          if (target.classList.contains('jp-playlist-current')) {
            // do nothing
            return;
          }
          this.index = target.getAttribute('data-index');
          this.playAtIndex(this.index);
        }
      });
      this.updateHighlight();
    }
    toggleRepeatAllMode() {
      if (Base.modes[this.modeIndex] === 'all') {
        this.setMode('off');
      } else {
        this.setMode('all');
      }
    }

    updateShuffleIcon() {
      if (!this.player) return;
      const playerContainer = this.player.container;
      const audioContainer = playerContainer.querySelector('.jp-audio');
      if (this.shuffled) {
        audioContainer.classList.add('jp-state-shuffled');
      } else {
        audioContainer.classList.remove('jp-state-shuffled');
      }
    }

    renderModeIcon() {
      if (!this.player) return;
      const playerContainer = this.player.container;
      const audioContainer = playerContainer.querySelector('.jp-audio');
      if (Base.modes[this.modeIndex] === 'all') {
        audioContainer.classList.add('jp-state-looped');
      } else {
        audioContainer.classList.remove('jp-state-looped');
      }
    }
  
    updateHighlight() {
      const playlistCOntainer = this.container.querySelector('.jp-playlist');
      if (!playlistCOntainer) return ;
      const highlightEl = playlistCOntainer.querySelector('li.jp-playlist-current');
      if (highlightEl) {
        highlightEl.classList.remove('jp-playlist-current');
        highlightEl.querySelector('a.jp-playlist-current').classList.remove('jp-playlist-current');
      }
      const newHighlightEl = playlistCOntainer.querySelectorAll('li')[this.index];
      if (newHighlightEl) {
        newHighlightEl.classList.add('jp-playlist-current');
        newHighlightEl.querySelector('a.jp-playlist-item').classList.add('jp-playlist-current');
      }
    }
  }
}

export default getClass;