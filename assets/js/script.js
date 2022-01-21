'use strict';

const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const footerYear = document.querySelector('.footer__year');
const headerMenuBtn = document.querySelector('.header__menu-btn');
const btnOpenModal = document.querySelectorAll('.btn--open-modal');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const sectionFeatures = document.querySelector('#section-features');
const sectionHero = document.querySelector('.section-hero');
const navigationList = document.querySelector('.navigation__list');
const accordionContainer = document.querySelector(
  '.operations__list-container'
);
const accordionHeading = document.querySelectorAll('.operations__heading');
const accordionContent = document.querySelectorAll('.operations__content');
const accordionImage = document.querySelectorAll('.operations__img');

///////////////////////////////////////////////////////////
//Display year in footer
const now = new Date();
footerYear.textContent = now.getFullYear();

///////////////////////////////////////////////////////////
//Menu Button
headerMenuBtn.addEventListener('click', function (e) {
  this.classList.toggle('active');
  header.classList.toggle('navigation__open');
});

///////////////////////////////////////////////////////////
//Modal
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.forEach(btn => btn.addEventListener('click', closeModal));
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////
//Scroll into section when button click
btnScrollTo.addEventListener('click', function () {
  sectionFeatures.scrollIntoView({
    behavior: 'smooth',
  });
});

///////////////////////////////////////////////////////////
//Page navigation
navigationList.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('navigation__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });

    header.classList.toggle('navigation__open');
    headerMenuBtn.classList.toggle('active');
  }
});

///////////////////////////////////////////////////////////
//Accordion
accordionContainer.addEventListener('click', function (e) {
  const item = e.target;
  const clicked = item.closest('.operations__heading');

  if (!clicked) return;

  //Remove active classes
  accordionHeading.forEach(a =>
    a.classList.remove('operations__heading--active')
  );

  //Activate the clicked heading
  clicked.classList.add('operations__heading--active');

  //Remove active classes of accordion content
  accordionContent.forEach(c =>
    c.classList.remove('operations__content--active')
  );

  //Remove active classes of accordion image
  accordionImage.forEach(i => i.classList.remove('operations__img--active'));

  //Activate the content
  document
    .querySelector(`.operations__content--${clicked.dataset.accordion}`)
    .classList.add('operations__content--active');

  //Activate the image
  document
    .querySelector(`.operations__img--${clicked.dataset.accordion}`)
    .classList.add('operations__img--active');
});

///////////////////////////////////////////////////////////
//Sticky navigation
const headerHeight = header.getBoundingClientRect().height;

const stickyNavigation = function (entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) document.body.classList.add('sticky');
  else document.body.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavigation, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});
headerObserver.observe(sectionHero);

///////////////////////////////////////////////////////////
//Menu Animation
const handleHover = function (e) {
  if (e.target.classList.contains('navigation__link')) {
    const link = e.target;
    const siblings = link
      .closest('.navigation')
      .querySelectorAll('.navigation__link');

    siblings.forEach(element => {
      if (element !== link) {
        element.style.color = this;
      }
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind('var(--color-white-dark)'));
nav.addEventListener('mouseout', handleHover.bind('var(--color-grey)'));

///////////////////////////////////////////////////////////
//Reveal Section
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(s => {
  sectionObserver.observe(s);
  s.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////
//Lazy Loading Images

//selects images with data-src attribute
const imageTargets = document.querySelectorAll('img[data-src]');
const loadImage = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace the lazy load image with the data-src
  entry.target.src = entry.target.dataset.src;

  //Remove the feature__lazy-img class
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('feature__lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTargets.forEach(img => imageObserver.observe(img));
