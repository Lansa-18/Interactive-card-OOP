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
    if(this.name !== '' || this.surname !== ''){
      this._allErrorMessage(0)
    }
  }

  _validateNumber(){
    if(this.number === ''){
      this._allErrorMessage(0)
    }
  }

  _validateExpDate(){

  }

  // The form method
  _form(e) {
    e.preventDefault();
    this._validateForm();
    this._validateName();
    this._updateCard();
    this._splitYear();
    this._fourDigitSpacing();
    // console.log('This form has been submitted');
    // console.log(
    //   this.name,
    //   this.surname,
    //   this.number,
    //   this.month,
    //   this.year,
    //   this.#cvc
    // );
  }

  _allErrorMessage(i){
    allErrorSpan.forEach((err, index, arr) => {
      arr[i].classList.remove('hidden')
    })
  }

  _splitYear(){
    const twoDigitYear = this.year.slice(2,4)
    visualCardExpDate.textContent = `${this.month}/${twoDigitYear}`
  }

  _updateCard(){
    visualCardName.textContent = `${this.surname} ${this.name}`;
    visualCardCvc.textContent = `${this.#cvc}`
    this._splitYear();
  }

  _fourDigitSpacing(){
    const numberArray = this.number.split('')
    const numArray = numberArray.map((num, index) => {
      if(index % 4 === 0){
        return num + ' '
      }else{
        return num
      }
    })
    const numString = numArray.join('')
    visualCardNumber.textContent = numString
  }
  _maxTwentyNum(){

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
  // userCard._updateCard();
});
