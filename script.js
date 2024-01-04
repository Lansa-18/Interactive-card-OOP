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
    allErrorSpan.forEach(err => err.classList.add('hidden'));
    this._validateForm();

    let isValid = true;
    let errorIndices = [];

    if (!this._validateName()) {
      isValid = false;
      errorIndices.push(0);
    }

    if (!this._validateNumber()) {
      isValid = false;
      errorIndices.push(1);
    }

    if (!this._validateMonth(inputCardMonth.value)) {
      isValid = false;
      errorIndices.push(2);
    }

    if (!this._validateYear(inputCardYear.value)) {
      isValid = false;
      errorIndices.push(3);
    }

    if (!this._validateCvc(inputCardCvc.value)) {
      isValid = false;
      errorIndices.push(4);
    }



    if (isValid) {
      this._updateCard();
      this._removeErrorMessage(errorIndices);
    } else {
      this._allErrorMessage(errorIndices);
      this._resetCard();
    }
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

  attachingEvent3() {
    inputCardYear.addEventListener('input', () => {
      this._checkYear(inputCardYear.value);
    });
  }

  _checkYear(inputYear) {
    if (inputYear.length > 4) {
      this.year = inputYear.slice(0, 4);
      inputCardYear.value = this.year;
    }
  }

  attachingEvent4() {
    inputCardCvc.addEventListener('input', () => {
      this._checkCvc(inputCardCvc.value);
    });
  }

  _checkCvc(inputCvc) {
    if (inputCvc.length > 3) {
      this.#cvc = inputCvc.slice(0, 3);
      inputCardCvc.value = this.#cvc;
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
    return containNumbers ? false : true;
  }

  _validateNumber() {
    // Checking if the number contains strings in it
    const containsLetters = /[a-zA-Z]/.test(this.number);
    return containsLetters ? false : true;
  }

  _validateMonth(monthInput) {
    // Checking if the month input is empty
    return monthInput.trim() === '' ? false : true;
  }

  _validateYear(yearInput) {
    // Checking if the year input is empty
    return yearInput.trim() === '' ? false : true;
  }

  _validateCvc(cvcInput) {
    // Checking if the cvc input is empty
    return cvcInput.trim() === '' ? false : true;
  }



  _allErrorMessage(indices) {
    allErrorSpan.forEach((err, i, arr) => {
      if (indices.includes(i)) {
        err.classList.remove('hidden');
      }
    });
  }

  _removeErrorMessage(indices) {
    allErrorSpan.forEach((err, i, arr) => {
      if (indices.includes(i)) {
        err.classList.add('hidden');
      }
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
  userCard.attachingEvent3();
  userCard.attachingEvent4();
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
