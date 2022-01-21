'use strict';

const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const headerMenuBtn = document.querySelector('.header__menu-btn');
const btnOpenModal = document.querySelectorAll('.btn--open-modal');
const btnCloseModal = document.querySelectorAll('.btn--close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

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
