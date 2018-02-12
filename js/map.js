'use strict';

// количество объектов-объявлений
var NUMBER_OF_OFFERS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленькиц ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_OF_HOUSE = ['flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

//добавила исходный массив с удобствами, из которого потом буду составлять массив рандомной длины
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// функция, возвращающая рандомный индекс массива
function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

// ф-ция случайного числа в заданном промежутке
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
// функция копирования массива - пока оставлю, (сейчас без нее обхожусь)
var getCopyOfArray = function (array) {
  var copyOfArray = array.slice();
  return copyOfArray;
};
*/

var getOfferObject = function (index) {

  // копия массива, чтобы избежать повтора
  var copyOfTitlesArray = TITLES.slice();

  // рандомные индексы для 'случайных' значений - потребуются в ф-ции
  var randomIForTitles = getRandomIndex(TITLES.length);
  var randomIForTypes = getRandomIndex(TYPES_OF_HOUSE.length);
  var randomIForCheckin = getRandomIndex(CHECKIN_TIME.length);
  var randomIForCheckout = getRandomIndex(CHECKOUT_TIME.length);

  var featuresRandomArray = []; // объявляю массив рандомной длины
  featuresRandomArray.length = getRandomNumber(1, 6); //задаю его случайную длину


  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },

    'offer': {
      'title': copyOfTitlesArray[randomIForTitles] // беру рандомный индекс из копии массива (чтобы исключить повтор)
               copyOfTitlesArray.splice(randomIForTitles, 1), // удаляю текущее рандомное значение
      'address': 'location.x, location.y',
      'price': getRandomNumber(1000, 1000000), // беру рандомное число из представленного диапазона через ф-цию рандома заданного промежутка
      'type': TYPES_OF_HOUSE[randomIForTypes], // беру рандомный индекс из массива (слчайность)
      'room': getRandomNumber(1, 5), // беру рандомное число из представленного диапазона через ф-цию рандома заданного промежутка
      'guests': getRandomNumber(1, 10), // добавила гостей
      'checkin': CHECKIN_TIME[randomIForCheckin],
      'checkout': CHECKOUT_TIME[randomIForCheckout],
      'features': featuresRandomArray.push(FEATURES[getRandomIndex(featuresRandomArray.length)]), // создаю массив рандомной длины
      'description': '', // добавила пустую строку
      'photos': []
    },

    'location': {
      'x': getRandomNumber(300, 900)
      'y': getRandomNumber(150, 500)
    }
  }
};

// вывела некоторые нужные для цикла переменные из ф-ции getOfferObject (иначе линтер ругается, что их не видит в цикле)
var copyOfTitlesArray = TITLES.slice();
var randomIForTitles = getRandomIndex(TITLES.length);

var offers = [];
for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
  offers.push(getOfferObject(i));
  copyOfTitlesArray.splice(randomIForTitles, 1);// удаляю это рандомное значение из копии массива, чтобы избежать повтора
}
