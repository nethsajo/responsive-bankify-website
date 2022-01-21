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
const navigationList = document.querySelector('.navigation__list');

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
