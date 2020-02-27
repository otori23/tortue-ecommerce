import '../css/style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

(() => {
  window.addEventListener('DOMContentLoaded', e => {
    let showcase = document.getElementById('showcase');
    let topLayer = showcase.querySelector('.top');
    let handle = showcase.querySelector('.handle');
    let skew = 0;
    let delta = 0;

    if (showcase.className.indexOf('skewed') != -1) {
      skew = 1000;
    }

    showcase.addEventListener('mousemove', e => {
      delta = (e.clientX - window.innerWidth / 2) * 0.5;

      handle.style.left = e.clientX + delta + 'px';

      topLayer.style.width = e.clientX + skew + delta + 'px';
    });
  });
})();
