import Player from "./player";
import { debounce, getFullScreenElement, matches, trunc, uuidv4, isFullScreen, isFullScreenEnabled, exitFullscreen, requestFullscreen } from './utils';
import type { CSSSelector, YuanPlayerOptions } from "./player.d";

export default class PlayerUI extends Player {
  protected useStateClassSkin = false;
  protected cssSelectorAncestor: string = '';
  protected cssSelector: CSSSelector = {
    videoPlay: ".yuan-video-play",
    play: ".yuan-play",
    pause: ".yuan-pause",
    stop: ".yuan-stop",
    seekBar: ".yuan-seek-bar",
    playBar: ".yuan-play-bar",
    mute: ".yuan-mute",
    unmute: ".yuan-unmute",
    volumeBar: ".yuan-volume-bar",
    volumeBarValue: ".yuan-volume-bar-value",
    volumeMax: ".yuan-volume-max",
    volumeValue: '.yuan-volume-value',
    playbackRateBar: ".yuan-playback-rate-bar",
    playbackRateBarValue: ".yuan-playback-rate-bar-value",
    currentTime: ".yuan-current-time",
    duration: ".yuan-duration",
    title: ".yuan-title",
    fullScreen: ".yuan-full-screen",
    restoreScreen: ".yuan-restore-screen",
    repeat: ".yuan-repeat",
    repeatOff: ".yuan-repeat-off",
    gui: ".yuan-gui",
    noSolution: ".yuan-no-solution"
  };
  protected stateClass = {
    repeatOne: "yuan-repeat-one",
    playing: "yuan-state-playing",
    seeking: "yuan-state-seeking",
    muted: "yuan-state-muted",
    looped: "yuan-state-looped",
    fullScreen: "yuan-state-full-screen",
    noVolume: "yuan-state-no-volume"
  };
  private fullScreenElement; // Keep a reference to a previous fullscreen element
  constructor(options: YuanPlayerOptions) {
    super(options);
    this.cssSelectorAncestor = options.cssSelectorAncestor || `#yuan_container_${uuidv4()}`;
    this.useStateClassSkin = !!options.useStateClassSkin;
    this.cssSelector = {
      ...this.cssSelector,
      ...options.cssSelector
    };
    this.stateClass = {
      ...this.stateClass,
      ...options.stateClass
    };
    if (!this.nativeControls && this.isAudioSupported) {
      this.addEventListeners();
    }
    if (!this.isAudioSupported) {
      setTimeout(() => {
        const element = document.querySelector(`${this.cssSelectorAncestor} ${this.cssSelector.noSolution}`) as HTMLElement;
        if (element) {
          element.style.display = 'block';
        }
      }, 0);
    }
  }
  private addEventListeners() {
    setTimeout(() => {
      const domElement = document.querySelector(this.cssSelectorAncestor) as HTMLElement;
      if (!domElement) return false;
      if (isFullScreenEnabled()) {
        const debouncedHide = debounce(() => {
          domElement.style.display = 'none';
        }, 1000);
        const fullScreenVideoHandler = () => {
          domElement.style.display = 'block';
          debouncedHide();
        };
        const fullScreenGUIHandler = () => {
          clearTimeout(debouncedHide.timer());
        };
        const fullScreenGUIHandler2 = () => {
          domElement.style.display = 'none';
        };
        const fullscreenchangeFn = () => {
          const isFullScreenMode = isFullScreen();
          const fullScreenElement = getFullScreenElement();
          const restoreGUI = (scrollIntoView: boolean = false) => {
            domElement.style.display = 'block';
            (this.mediaElement as HTMLElement).style.position = 'static';
            (this.mediaElement as HTMLElement).style.height = 'auto';
            clearTimeout(debouncedHide.timer());
            this.removeEventListener(this.mediaElement, 'mousemove', fullScreenVideoHandler);
            this.removeEventListener(domElement, 'mouseenter', fullScreenGUIHandler);
            this.removeEventListener(domElement, 'mouseleave', fullScreenGUIHandler2);
            if (scrollIntoView) {
              this.mediaElement?.scrollIntoView({
                block: "center",
                inline: "center"
              });
            }
          };
          const bindFullScreenListeners = () => {
            domElement.style.display = 'none';
            (this.mediaElement as HTMLElement).style.position = 'fixed';
            (this.mediaElement as HTMLElement).style.height = '100%';
            this.addEventListener(this.mediaElement, 'mousemove', fullScreenVideoHandler);
            this.addEventListener(domElement, 'mouseenter', fullScreenGUIHandler);
            this.addEventListener(domElement, 'mouseleave', fullScreenGUIHandler2);
          };
          if (isFullScreenMode) { // enter fullscreen
            this.fullScreenElement = fullScreenElement;
            // if the fullscreenchange is not triggered by current player
            // we restore the GUI of current player
            if (fullScreenElement !== this.container) {
              restoreGUI(false);
              this.setFullscreenData(false);
              return false;
            } else {
              bindFullScreenListeners();
              this.setFullscreenData(true);
              return false;
            }
          } else { // exit fullscreen
            if (this.fullScreenElement === this.container) {
              restoreGUI(true);
              this.setFullscreenData(false);
            }
            this.fullScreenElement = null;
          }
        };
        this.addEventListener(document, 'fullscreenchange', fullscreenchangeFn);
        this.addEventListener(document, 'webkitfullscreenchange', fullscreenchangeFn);
        this.addEventListener(document, 'mozfullscreenchange', fullscreenchangeFn);
        this.addEventListener(document, 'msfullscreenchange', fullscreenchangeFn);
        this.addEventListener(document, 'MSFullscreenChange', fullscreenchangeFn);
      }
      const clickHandler = (e) => {
        const target = e.target as HTMLElement;
        if (this.isMatchedWithSelector(target, this.cssSelector.play)) {
          if (this.useStateClassSkin) {
            this.togglePlay();
          } else {
            this.play();
          }
        } else if (this.isMatchedWithSelector(target, this.cssSelector.pause)) {
          if (this.useStateClassSkin) {
            this.togglePlay();
          } else {
            this.pause();
          }
        } else if (this.isMatchedWithSelector(target, this.cssSelector.fullScreen)) {
          if (this.useStateClassSkin) {
            this.handleFullscreen();
          } else {
            this.handleFullscreen(true);
          }
        } else if (this.isMatchedWithSelector(target, this.cssSelector.stop)) {
          this.stop();
        } else if (this.isMatchedWithSelector(target, this.cssSelector.repeat)) {
          // TODO
          domElement.classList.toggle(this.stateClass.looped);
        } else if (this.isMatchedWithSelector(target, this.cssSelector.volumeMax)) {
          this.volume(1);
          this.unmute();
        } else if (this.isMatchedWithSelector(target, this.cssSelector.mute)) {
          if (this.useStateClassSkin) {
            this.toggleMute();
          } else {
            this.mute();
          }
        } else if (this.isMatchedWithSelector(target, this.cssSelector.unmute)) {
          if (this.useStateClassSkin) {
            this.toggleMute();
          } else {
            this.unmute();
          }
        } else if (this.isMatchedWithSelector(target, this.cssSelector.volumeBar) || this.isMatchedWithSelector(target, this.cssSelector.volumeBarValue)) {
          if (this.cssSelector.volumeBar) {
            const volumeSlider = domElement.querySelector(this.cssSelector.volumeBar) as HTMLElement;
            const perc = (e as MouseEvent).offsetX / parseFloat(getComputedStyle(volumeSlider).width);
            this.volume(perc);
          }
        } else if (this.isMatchedWithSelector(target, this.cssSelector.seekBar) || this.isMatchedWithSelector(target, this.cssSelector.playBar)) {
          if (this.cssSelector.seekBar) {
            const seekSlider = domElement.querySelector(this.cssSelector.seekBar) as HTMLElement;
            const perc = (e as MouseEvent).offsetX / parseFloat(getComputedStyle(seekSlider).width);
            this.playHead(perc);
          }
        }
      };
      this.addEventListener(domElement, 'click', clickHandler);
      this.on('ended', () => {
        domElement.classList.remove(this.stateClass.playing);
      })
      this.on('durationchange', () => {
        if (!this.cssSelector.duration) return false;
        const element = domElement.querySelector(this.cssSelector.duration);
        if (element) {
          element.textContent = this.formatTime(this.mediaElement ? Math.floor(this.mediaElement.duration) : 0);
        }
      });
      this.on('setmedia', () => {
        if (!this.cssSelector?.fullScreen) return false;
        const fullScreenBtn = this.container?.querySelector(this.cssSelector?.fullScreen) as HTMLElement;
        if (!fullScreenBtn || !isFullScreenEnabled()) return;
        if (this.mediaElement?.tagName.toLowerCase() === 'video') {
          fullScreenBtn.style.display = 'inline-block';
        } else {
          fullScreenBtn.style.display = 'none';
        }
      });
      this.on('setmedia', () => {
        if (!this.cssSelector.title) return false;
        const element = domElement.querySelector(this.cssSelector.title);
        if (element) {
          element.textContent = this.media?.title || '';
        }
        if (this.mediaElement?.tagName === 'AUDIO') {
          this.handleFullscreen(false);
        }
      });
      this.on('error', () => {
        if (this.errorCode === -2 || this.errorCode === 4) {
          if (this.cssSelector.currentTime) {
            domElement.querySelector(this.cssSelector.currentTime)!.textContent = this.formatTime(0);
          }
          if (this.cssSelector.duration) {
            domElement.querySelector(this.cssSelector.duration)!.textContent = this.formatTime(0);
          }
          if (this.cssSelector.playBar) {
            (domElement.querySelector(this.cssSelector.playBar) as HTMLElement).style.width = `0%`;
          }
        }
      });
      this.on('timeupdate', () => {
        const second = this.mediaElement ? Math.floor(this.mediaElement.currentTime) : 0;
        if (this.cssSelector.currentTime) {
          domElement.querySelector(this.cssSelector.currentTime)!.textContent = this.formatTime(second);
        }
        if (this.cssSelector.playBar) {
          const element = (domElement.querySelector(this.cssSelector.playBar) as HTMLElement);
          if (element) {
            const perc = this.mediaElement && isFinite(this.mediaElement.duration) ? this.mediaElement.currentTime / this.mediaElement.duration : 0;
            element.style.width = `${perc * 100}%`;
          }
        }
      });
      this.on('play', () => {
        // If current src is empty, we should not add the state class
        if (this.mediaElement?.currentSrc) {
          domElement.classList.add(this.stateClass.playing);
        }
      });
      this.on('pause', () => {
        domElement.classList.remove(this.stateClass.playing);
      });
      this.on('stop', () => {
        domElement.classList.remove(this.stateClass.playing);
        if (this.cssSelector.currentTime) {
          domElement.querySelector(this.cssSelector.currentTime)!.textContent = this.formatTime(0);
        }
        if (this.cssSelector.playBar) {
          (domElement.querySelector(this.cssSelector.playBar) as HTMLElement).style.width = `0%`;
        }
      });
      this.on('clearmedia', () => {
        domElement?.classList.remove(this.stateClass.playing);
        if (this.cssSelector.currentTime) {
          domElement.querySelector(this.cssSelector.currentTime)!.textContent = this.formatTime(0);
        }
        if (this.cssSelector.duration) {
          domElement.querySelector(this.cssSelector.duration)!.textContent = this.formatTime(0);
        }
        if (this.cssSelector.playBar) {
          (domElement.querySelector(this.cssSelector.playBar) as HTMLElement).style.width = `0%`;
        }
        if (this.cssSelector.title) {
          const element = (domElement.querySelector(this.cssSelector.title) as HTMLElement);
          if (element) {
            element.textContent = '';
          }
        }
      });
      this.on('volumechange', () => {
        this.updateVolume();
      });
      this.on('loopchanged', () => {
        this.updateLoopState();
      });
      this.updateVolume();
      this.updateLoopState();
    }, 0);
  }
  protected setFullscreenData(state: boolean) {
    if (state) {
      this.container.classList.add(this.stateClass.fullScreen);
      document.querySelector(this.cssSelectorAncestor)?.classList.add(this.stateClass.fullScreen);
    } else {
      this.container.classList.remove(this.stateClass.fullScreen);
      document.querySelector(this.cssSelectorAncestor)?.classList.remove(this.stateClass.fullScreen);
    }
  }
  // Fullscreen
  protected handleFullscreen(enterFullScreen?: boolean) {
    const domElement = document.querySelector(this.cssSelectorAncestor) as HTMLElement;
    const fullScreenEnabled = isFullScreenEnabled();
    // If the browser doesn't support the Fulscreen API then hide the fullscreen button
    if (!fullScreenEnabled) {
      const btn = document.querySelector(this.cssSelectorAncestor)?.querySelector(this.cssSelector?.fullScreen || '') as HTMLElement;
      btn.style.display = 'none';
      console.warn('Your browser does not support the Fullscreen API.');
      return;
    }
    const enterFullFn = () => {
      requestFullscreen(this.container);
    };
    const exitFullFn = () => {
      exitFullscreen();
    };
    if (typeof enterFullScreen === 'boolean') {
      if (enterFullScreen) {
        enterFullFn();
      } else if (isFullScreen()) {
        exitFullFn();
      }
      return;
    }
    // If fullscreen mode is active...
    if (isFullScreen()) {
      // ...exit fullscreen mode
      exitFullFn();
    } else {
       // ...otherwise enter fullscreen mode
       enterFullFn();
     }
  }
  private updateLoopState() {
    const domElement = document.querySelector(this.cssSelectorAncestor) as HTMLElement;
    if (!domElement) return false;
    if (this.mediaElement?.loop) {
      domElement.classList.add(this.stateClass.looped);
      if(this.cssSelector.repeat) {
        const repeatBtn = domElement.querySelector(this.cssSelector.repeat);
        if (repeatBtn) {
          repeatBtn.classList.add(this.stateClass?.repeatOne || '');
        }
      }
    } else {
      domElement.classList.remove(this.stateClass.looped);
      if(this.cssSelector.repeat) {
        const repeatBtn = domElement.querySelector(this.cssSelector.repeat);
        if (repeatBtn) {
          repeatBtn.classList.remove(this.stateClass?.repeatOne || '');
        }
      }
    }
  }
  private isMatchedWithSelector(dom, cssSelector, rootElement = this.container): boolean {
    if (!cssSelector) return false;
    do {
      if (matches(dom, cssSelector)) {
        return true;
      }
      dom = dom.parentNode;
    } while (dom !== document.querySelector(this.cssSelectorAncestor) && dom !== document);
    return false;
  }
  private updateVolume() {
    const domElement = document.querySelector(this.cssSelectorAncestor) as HTMLElement;
    if (!domElement) return false;
    if (this.mediaElement?.muted) {
      domElement.classList.add(this.stateClass.muted);
    } else {
      domElement.classList.remove(this.stateClass.muted);
    }
    if (this.cssSelector.volumeValue) {
      const element = domElement.querySelector(this.cssSelector.volumeValue);
      if (element) {
        element.textContent = String(trunc(this.mediaElement ? this.mediaElement.volume * 100 : 0));
      }
    }
    if (!this.cssSelector.volumeBarValue) return false;
    const ele = domElement.querySelector(this.cssSelector.volumeBarValue) as HTMLElement;
    const val = trunc(this.mediaElement ? this.mediaElement.volume * 100 : 0);
    if (ele) {
      ele!.style.width = this.mediaElement?.muted ? '0%' : val + "%";
    }
  }
};