'use strict';

// Getting Elements from HTML
const inputCardholder = document.querySelector('#card-name');
const inputCardNumber = document.querySelector('#card-number');
const inputCardMonth = document.querySelector('.card-month');
const inputCardYear = document.querySelector('.card-year');
const inputCardCvc = document.querySelector('#card-cvc');
const confirmBtn = document.querySelector('.cardholder__content--button');
const atmForm = document.querySelector('.card-form');

// Creating the Card class

class Card {
  #cvc;

  
  constructor(fullname, number, month, year, cvc) {
    [this.name, this.surname] = fullname.split(' ');
    this.number = number;
    this.month = month;
    this.year = year;
    this.#cvc = cvc;

  }

  _validateForm() {
    if (!this.name || !this.surname) {
      alert('Please enter your full name');
    }
  }
  
  _form(e) {
    e.preventDefault();
    this._validateForm();
    console.log('This form has been submitted');
    console.log(this.name, this.surname, this.number, this.month, this.year, this.#cvc);

  }


}

atmForm.addEventListener('submit', function(e){
  e.preventDefault();

  const userCard = new Card(
    inputCardholder.value,
    inputCardNumber.value,
    inputCardMonth.value,
    inputCardYear.value,
    inputCardCvc.value
  );

  userCard._form(e);
});
