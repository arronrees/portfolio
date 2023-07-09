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

  gsap.ticker.lagSmoothing(0);

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

    if (
      target.classList.contains('nav__link') ||
      target.classList.contains('btn')
    ) {
      cursor.classList.add('cursor--link');
    } else {
      cursor.classList.remove('cursor--link');
    }

    if (target.classList.contains('img')) {
      cursor.classList.add('cursor--img');
    } else {
      cursor.classList.remove('cursor--img');
    }
  }

  document.addEventListener('mousemove', cursorFollow);
}

function aboutReveal() {
  const fig = document.querySelector('.about .img figure');
  const cover = document.querySelector('.about .img figure .img__cover');
  const img = document.querySelector('.about .img figure img');

  const h = document.querySelector('.about .text h2');
  const p = document.querySelector('.about .text p');

  const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: fig,
      start: 'top 80%',
    },
  });

  tl.fromTo(fig, { scaleX: 0 }, { scaleX: 1 })
    .fromTo(cover, { scaleX: 1 }, { scaleX: 0 })
    .fromTo(img, { scale: 1.125 }, { scale: 1 }, '-=0.75')
    .fromTo(
      [h, p],
      { y: 25, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.15 },
      '-=1.1'
    );
}

function workReveal() {
  const p = document.querySelector('.work .text p');
  const a = document.querySelector('.work .text a');
  const imgs = document.querySelectorAll('.work .work__grid__item');

  const textTl = gsap.timeline({
    defaults: { duration: 0.6, ease: 'power2.inOut' },
    scrollTrigger: {
      trigger: '.work',
      start: 'top 40%',
    },
  });

  textTl.fromTo(
    [p, a],
    { y: 25, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, stagger: 0.15 }
  );

  imgs.forEach((image) => {
    const fig = image.querySelector('.img figure');
    const cover = image.querySelector('.img figure .img__cover');
    const img = image.querySelector('.img figure img');

    const imgTl = gsap.timeline({
      defaults: { duration: 0.8, ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: image,
        start: 'top 75%',
      },
    });

    imgTl
      .fromTo(fig, { scaleX: 0 }, { scaleX: 1 })
      .fromTo(cover, { scaleX: 1 }, { scaleX: 0 })
      .fromTo(img, { scale: 1.125 }, { scale: 1 }, '-=0.7');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScroll();
  initCursorFollow();
  aboutReveal();
  workReveal();
});
