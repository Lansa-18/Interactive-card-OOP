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
const allErrorSpan = document.querySelectorAll('error-hidden');

// Creating the Card class

class Card {
  #cvc;

  constructor(fullname, number, month, year, cvc) {
    [this.surname, this.name] = fullname.split(' ');
    this.number = number;
    this.month = month;
    this.year = year;
    this.#cvc = cvc;

    inputCardNumber.addEventListener('input', () => {
      console.log('Input event fired');
      this.number = this._fourDigitSpacing(inputCardNumber.value);
    });
  }

  // Method for validating the form
  _validateForm() {
    if (!this.name || !this.surname) {
      alert('Please enter your full name');
    }
  }

  _validateName() {
    if (this.name !== '' || this.surname !== '') {
      this._allErrorMessage(0);
    }
  }

  _validateNumber() {
    if (this.number === '') {
      this._allErrorMessage(0);
    }
  }

  // _validateExpDate(){

  // }

  // The form method
  _form(e) {
    e.preventDefault();
    this._validateForm();
    this._validateName();
    this._updateCard();
    this._splitYear();
  }

  // _allErrorMessage(i) {
  //   allErrorSpan.forEach((err, index, arr) => {
  //     arr[i].classList.remove('hidden');
  //   });
  // }

  _splitYear() {
    const twoDigitYear = this.year.slice(2, 4);
    visualCardExpDate.textContent = `${this.month}/${twoDigitYear}`;
  }

  _updateCard() {
    visualCardName.textContent = `${this.surname} ${this.name}`;
    visualCardCvc.textContent = `${this.#cvc}`;
    this._splitYear();
  }

  _fourDigitSpacing(inputValue) {
    // Convert the number to a string and then to an array of characters
    const numsArr = inputValue.toString().split('');
    console.log(numsArr);

    // If the number has more than 16 digits, ignore the extra digits
    if (numsArr.length > 16) {
      numsArr.length = 16;
      console.log(numsArr);
    }
    // Create a new array for storing the digits and spaces
    const spacedArr = [];

    // Loop through the array of numbers
    numsArr.forEach((num, index) => {
      // Add the current digit/number to the new array
      spacedArr.push(num);

      // If the index is a multiple of 4, add a space
      if ((index + 1) % 4 === 0) {
        spacedArr.push(' ');
      }

      // Converth the new spacedArr back to a string
      console.log(spacedArr.join(''));
      // return spacedArr.join('');
    });
    // this._spacingNums();
  }

  // _spacingNums() {
  //   // Create a new array for storing the digits and spaces
  //   const spacedArr = [];

  //   // Loop through the array of numbers
  //   numsArr.forEach((num, index) => {
  //     // Add the current digit/number to the new array
  //     spacedArr.push(num);

  //     // If the index is a multiple of 4, add a space
  //     if ((index + 1) % 4 === 0) {
  //       spacedArr.push(' ');
  //     }

  //     // Converth the new spacedArr back to a string
  //     return spacedArr.join('');
  //   });
  // }
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
  // userCard._updateCard();
});
