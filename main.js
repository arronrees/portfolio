// css
import './styles/style.scss';

// js
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function initScroll() {
  const lenis = new Lenis({ smoothWheel: true, lerp: 0.05 });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

function initCursorFollow() {
  const cursor = document.querySelector('#cursor');
  const bgCursor = document.querySelector('.bg__cursor');

  let cursorX = 0;
  let cursorY = 0;

  let ballX = 0;
  let ballY = 0;

  let speed = 0.1;

  function animate() {
    let distX = cursorX - ballX;
    let distY = cursorY - ballY;

    ballX = ballX + distX * speed;
    ballY = ballY + distY * speed;

    cursor.style.left = `${ballX}px`;
    cursor.style.top = `${ballY}px`;

    bgCursor.style.left = `${ballX}px`;
    bgCursor.style.top = `${ballY}px`;

    requestAnimationFrame(animate);
  }

  animate();

  function cursorFollow({ pageX, pageY, target }) {
    cursorX = pageX;
    cursorY = pageY;
  }

  document.addEventListener('mousemove', cursorFollow);
}

document.addEventListener('DOMContentLoaded', () => {
  initScroll();
  initCursorFollow();
});
