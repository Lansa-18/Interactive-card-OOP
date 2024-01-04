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
const visualCardNumber = document.querySelector('.visual-card-number');
const visualCardExpDate = document.querySelector('.visual-card-expiry-date');
const visualCardCvc = document.querySelector('.atm__card--cvc');
const allErrorSpan = document.querySelectorAll('#error-hidden');

// Creating the Card class

class Card {
  #cvc;

  constructor(fullname, number, month, year, cvc) {
    [this.surname, this.name] = fullname.split(' ');
    this.number = number;
    this.month = month;
    this.year = year;
    this.#cvc = cvc;
    // this.attachingEvent();
  }

  // The form method
  _resetCard() {
    visualCardName.textContent = 'Jane AppleSeed';
    visualCardCvc.textContent = '000';
    visualCardExpDate.textContent = '00/00';
    visualCardNumber.textContent = '0000 0000 0000 0000';
  }

  _form(e) {
    e.preventDefault();
    this._validateForm();
    this._validateMonth(inputCardMonth.value);
    this._validateNumber();
    this._validateName();
  }


  attachingEvent1() {
    inputCardNumber.addEventListener('input', () => {
      this._formatCardNumber(inputCardNumber.value);
    });
  }

  _formatCardNumber(inputValue) {
    const cardNumber = inputValue.replace(/\s/g, ''); // Remove existing spaces
    let formattedNumber = '';

    for (let i = 0; i < cardNumber.length; i++) {
      formattedNumber += cardNumber[i];

      if ((i + 1) % 4 === 0 && i !== cardNumber.length - 1) {
        formattedNumber += ' ';
      }
    }

    this.number = formattedNumber;
    inputCardNumber.value = this.number;
  }

  attachingEvent2() {
    inputCardMonth.addEventListener('input', () => {
      this._checkMonth(inputCardMonth.value);
    });
  }

  _checkMonth(inputMonth) {
    if (inputMonth.length > 2) {
      this.month = inputMonth.slice(0, 2);
      inputCardMonth.value = this.month;
    }
  }

  // Method for validating the form
  _validateForm() {
    if (!this.name || !this.surname) {
      alert('Please enter your full name');
    }
  }

  _validateName() {
    // testing if both name and surname contain digits
    const containNumbers = /\d/.test(`${this.name} ${this.surname}`);

    if (containNumbers) {
      this._allErrorMessage(0);
      this._resetCard();
      return false // Validation failed
    } else {
      this._updateCard();
      this._removeErrorMessage(0);
      return true // Validation passed
    }
  }

  _validateNumber() {
    // Checking if the number contains strings in it
    const containsLetters = /[a-zA-Z]/.test(this.number);

    if (containsLetters) {
      this._allErrorMessage(1);
      this._resetCard();
      return false // Validation failed
    } else {
      this._updateCard();
      this._removeErrorMessage(1);
      return true // Validation passed
    }
  }
  
  _validateMonth(monthInput) {
    // Checking if the month input is empty
    if (monthInput.trim() === '') {
      this._allErrorMessage(2);
      this._resetCard();
    } else {
      this._updateCard();
      this._removeErrorMessage(2);
    }
  }

  _validateYear() {}

  _allErrorMessage(index) {
    allErrorSpan.forEach((err, i, arr) => {
      arr[index].classList.remove('hidden');
    });
  }

  _removeErrorMessage(index) {
    allErrorSpan.forEach((err, i, arr) => {
      arr[index].classList.add('hidden');
    });
  }

  _splitYear() {
    const twoDigitYear = this.year.slice(2, 4);
    visualCardExpDate.textContent = `${this.month}/${twoDigitYear}`;
  }

  _updateCard() {
    visualCardName.textContent = `${this.surname} ${this.name}`;
    visualCardCvc.textContent = `${this.#cvc}`;
    visualCardNumber.textContent = `${inputCardNumber.value}`;
    this._splitYear();
  }
}

document.addEventListener('DOMContentLoaded', event => {
  // Assuming your class is named Card
  let userCard = new Card(
    inputCardholder.value,
    inputCardNumber.value,
    inputCardMonth.value,
    inputCardYear.value,
    inputCardCvc.value
  );

  userCard.attachingEvent1();
  userCard.attachingEvent2();
});

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
});
