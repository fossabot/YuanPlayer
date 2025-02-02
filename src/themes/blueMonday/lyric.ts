import { innerText } from '../../core/utils';
import { LyricOptions } from '../../core/lyric.d';
import './lyric.scss';

function getClass(Base) {
  return class YuanPlayerLyric extends Base {
    constructor(otpions: LyricOptions) {
      otpions.cssSelectorAncestor = '.yuanplayer-bluemonday-lyric';
      super(otpions);
      this.addContainer();
      this.addEvents();
    }
    addContainer() {
      if (typeof this.lyric === 'string') {
        if (!this.container.querySelector('.yuanplayer-bluemonday-lyric')) {
          // Add container for lyric
          var lyricDiv = document.createElement('div');
          var wrapContainer = document.createElement('div');
          lyricDiv.classList.add('yuanplayer-bluemonday-lyric');
          lyricDiv.classList.add(this.stateClass.empty);
          wrapContainer.classList.add('lyric-wrapcontainer');
          this.container.appendChild(lyricDiv);
          lyricDiv.appendChild(wrapContainer);

          const emptyElement = document.createElement('div');
          emptyElement.classList.add(this.cssSelector.noContent.substring(1));
          emptyElement.textContent = 'No lyric available.';
          lyricDiv.appendChild(emptyElement);
        }
      }
    }
    addEvents() {
      this.on('lyricfetched', (lyricItems) => {
        this.addLyricItems(lyricItems);
      });
    }
    addLyricItems(items: any) {
      var wrapContainer = this.container.querySelector('.lyric-wrapcontainer');  
      for (var i = 0, l = items.length; i < l; i++) {
        var div = document.createElement('div');
        div.classList.add(this.cssSelector.item.substring(1));
        var content = items[i].split(']')[1];
        innerText(div, content);
        wrapContainer?.appendChild(div);
      }
    }
  }
}

export default getClass;