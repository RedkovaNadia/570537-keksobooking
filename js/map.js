'use strict';

// количество объектов-объявлений
var NUMBER_OF_OFFERS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленькиц ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_OF_HOUSE = ['falt', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];

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

// копия массива с описанием дома (потому что необходимо, чтобы значения не повторялись)
var copyOfTitlesArray = TITLES.slice();

// рандомные индексы для 'случайных' значений - потребуются в ф-ции
var randomIForTitles = getRandomIndex(TITLES.length);
var randomIForTypes = getRandomIndex(TYPES_OF_HOUSE.length);
var randomIForCheckin = getRandomIndex(CHECKIN_TIME.length);
var randomIForCheckout = getRandomIndex(CHECKOUT_TIME.length);

var getOfferObject = function (index) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + index + '.png'
    },

    'offer': {
      'title': copyOfTytlesArray[randomIForTitles], // беру рандомный индекс из копии массива (чтобы исключить повтор)
      'address': 'location.x, location.y',
      'price': getRandomNumber(1000, 1000000), // беру рандомное число из представленного диапазона через ф-цию рандома заданного промежутка
      'type': TYPES_OF_HOUSE[randomIForTypes], // беру рандомный индекс из массива (слчайность)
      'room': getRandomNumber(1, 5), // беру рандомное число из представленного диапазона через ф-цию рандома заданного промежутка
      'guests': ,
      'checkin': CHECKIN_TIME[randomIForCheckin],
      'checkout': CHECKOUT_TIME[randomIForCheckout]
    },

    'location': {}
  };
};

var offers = [];
for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
  offers.push(getOfferObject(i));
  copyOfTitlesArray.splice(randomIForTitles, 1);// удаляю это рандомное значение из копии массива, чтобы избежать повтора
}
