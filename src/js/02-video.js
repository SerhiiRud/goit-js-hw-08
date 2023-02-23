import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function ({ duration, percent, seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
try {
  player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)) || 0);
} catch (error) {
  console.log(error.message);
}
