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
const visualCardMonth = document.querySelector('.visual-card-month');
const visualCardYear = document.querySelector('.visual-card-year');
const visualCardCvc = document.querySelector('.atm__card--cvc');
const allErrorSpan = document.querySelectorAll('.special-error');
const thankYouMsg = document.querySelector('.thank-you');
const formInputs = document.querySelector('.white__right');
const thankYouBtn = document.querySelector('.thank-you-button');
const cardNameDetails = visualCardName.textContent;
const cardNumberDetails = visualCardNumber.textContent;
const cardCvcDetails = visualCardCvc.textContent;
const cardMonthDetails = visualCardMonth.textContent;
const cardYearDetails = visualCardYear.textContent;

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

  _resetInputFields() {
    inputCardholder.value =
      inputCardNumber.value =
      inputCardMonth.value =
      inputCardYear.value =
      inputCardCvc.value =
        '';
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
      // this._invalidMonth(inputCardMonth);
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
      this._showthankYou();
      this._removeErrorMessage(errorIndices);
    } else {
      this._allErrorMessage(errorIndices);
      // this._invalidMonth(inputCardMonth.value)
      // this._resetCard();
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
    inputCardYear.addEventListener('input', () => {
      this._checkYear(inputCardYear.value);
    });
    inputCardCvc.addEventListener('input', () => {
      this._checkCvc(inputCardCvc.value);
    });
  }

  _checkMonth(inputMonth) {
    if (inputMonth.length > 2) {
      this.month = inputMonth.slice(0, 2);
      inputCardMonth.value = this.month;
    }
  }

  _checkYear(inputYear) {
    if (inputYear.length > 2) {
      this.year = inputYear.slice(0, 2);
      inputCardYear.value = this.year;
    }
  }

  _checkCvc(inputCvc) {
    if (inputCvc.length > 3) {
      this.#cvc = inputCvc.slice(0, 3);
      inputCardCvc.value = this.#cvc;
    }
  }

  attachingEvent3() {
    inputCardholder.addEventListener('input', () => {
      this._updateNameRealTime();
    });
    inputCardNumber.addEventListener('input', () => {
      this._updateNumberRealTime();
    });
    inputCardMonth.addEventListener('input', () => {
      this._updateMonthRealTime();
    });
    inputCardYear.addEventListener('input', () => {
      this._updateYearRealTime();
    });
    inputCardCvc.addEventListener('input', () => {
      this._updateCvcRealTime();
    });
  }

  attachingEvent4(){
    thankYouBtn.addEventListener('click', () => {
      this._showForm();
      this._resetCard();
      this._resetInputFields();
    });
  }

  _showthankYou() {
    formInputs.classList.add('special-hidden');
    thankYouMsg.classList.remove('special-hidden');
  }

  _showForm() {
    formInputs.classList.remove('special-hidden');
    thankYouMsg.classList.add('special-hidden');
  }

  _updater(input, visual, card) {
    if (input.value === '') {
      visual.textContent = card;
    } else {
      visual.textContent = input.value;
    }
  }

  _updateNameRealTime() {
    this._updater(inputCardholder, visualCardName, cardNameDetails);
  }

  _updateNumberRealTime() {
    this._updater(inputCardNumber, visualCardNumber, cardNumberDetails);
  }

  _updateMonthRealTime() {
    this._updater(inputCardMonth, visualCardMonth, cardMonthDetails);
  }

  _updateYearRealTime() {
    this._updater(inputCardYear, visualCardYear, cardYearDetails);
  }

  _updateCvcRealTime() {
    this._updater(inputCardCvc, visualCardCvc, cardCvcDetails);
  }

  // Method for validating the form
  _validateForm() {
    if (!this.name.trim() || !this.surname.trim()) {
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
  // Check if the month contains letters or is less than 1 or greater than 12
  const containsLetters = /[a-zA-Z]/.test(monthInput);
  const isOutOfRange = parseInt(monthInput) < 1 || parseInt(monthInput) > 12;
  if (containsLetters || isOutOfRange) {
    return false; // Validation failed
  }

    return monthInput.trim() === '' ? false : true;
  }

  _validateYear(yearInput) {
    // Check if the year contains letters or is less than the current year
    const containsLetters = /[a-zA-Z]/.test(yearInput);
    const isOutOfRange = parseInt(yearInput) < 24 || parseInt(yearInput) > 34;
    if (containsLetters || isOutOfRange) {
      return false; // Validation failed
    }
    // Checking if the year input is empty
    return yearInput.trim() === '' ? false : true;
  }

  _validateCvc(cvcInput) {
    // Check if the cvc contains letters
    const containsLetters = /[a-zA-Z]/.test(cvcInput);
    if (containsLetters) {
      return false; // Validation failed
    }
    // Checking if the cvc input is empty
    return cvcInput.trim() === '' ? false : true;
  }

  _allErrorMessage(indices) {
    indices.forEach(index => {
      allErrorSpan[index].classList.remove('hidden');
      switch (index) {
        case 0:
          // Handle name error
          break;
        case 1:
          // Handle number error
          break;
        case 2:
          // Handle month error
          if (/[a-zA-Z]/.test(inputCardMonth.value)) {
            allErrorSpan[index].textContent =
              'Numbers Only!';
          } else if (parseInt(inputCardMonth.value) < 1 || parseInt(inputCardMonth.value) > 12) {
            allErrorSpan[index].textContent = 'Invalid Month!';
          }
          break;
        case 3:
          // Handle year error
          if (/[a-zA-Z]/.test(inputCardYear.value)) {
            allErrorSpan[index].textContent = 'Numbers Only!';
          } else if (parseInt((inputCardYear.value)) < 24 || parseInt(inputCardYear.value) > 34){
            allErrorSpan[index].textContent = 'Invalid Year!'
          }
          break;
        case 4:
          // Handle cvc error
          if (/[a-zA-Z]/.test(inputCardCvc.value)) {
            allErrorSpan[index].textContent = 'Numbers Only!';
          }
          break;
        default:
          // Handle unexpected index values
          break;
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

  _updateCard() {
    visualCardName.textContent = `${this.surname} ${this.name}`;
    visualCardCvc.textContent = `${this.#cvc}`;
    visualCardNumber.textContent = `${inputCardNumber.value}`;
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
