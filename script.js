'use strict';

// Getting Elements from HTML
const inputCardholder = document.querySelector('#card-name');
const inputCardNumber = document.querySelector('#card-number');
const inputCardMonth = document.querySelector('.card-month');
const inputCardYear = document.querySelector('.card-year');
const inputCardCvc = document.querySelector('#card-cvc');
const confirmBtn = document.querySelector('.cardholder__content--button');
const atmForm = document.querySelector('.card-form');
const visualCardName = document.querySelector('.visual-card-name');
const visualCardExpDate = document.querySelector('.visual-card-expiry-date');
const allErrorSpan = document.querySelectorAll('error-hidden')

// Creating the Card class

class Card {
  #cvc;

  constructor(fullname, number, month, year, cvc) {
    [this.surname, this.name] = fullname.split(' ');
    this.number = number;
    this.month = month;
    this.year = year;
    this.#cvc = cvc;
  }

  // Method for validating the form
  _validateForm() {
    if (!this.name || !this.surname) {
      alert('Please enter your full name');
    }
  }

  _validateName(){
    if(inputCardholder.value !== ''){
      this._allErrorMessage(0)
    }
  }

  _validateNumber(){

  }

  _validateExpDate(){

  }

  // The form method
  _form(e) {
    e.preventDefault();
    this._validateForm();
    console.log('This form has been submitted');
    console.log(
      this.name,
      this.surname,
      this.number,
      this.month,
      this.year,
      this.#cvc
    );
  }

  _allErrorMessage(i){
    allErrorSpan.forEach((err, i) => {
      err[i].classlist.remove(hidden)
    })
  }

  _updateCard(){
    visualCardName.textContent = `${this.surname} ${this.name}`


  }

}

// The form event listener
atmForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const userCard = new Card(
    inputCardholder.value,
    inputCardNumber.value,
    inputCardMonth.value,
    inputCardYear.value,
    inputCardCvc.value
  );

  userCard._form(e);
  userCard._updateCard();
});
