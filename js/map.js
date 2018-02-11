'use strict';

// количество объектов-объявлений
var NUMBER_OF_OFFERS = 8;

// функция, возвращающая рандомный индекс массива
function getRandomInt(array) {
  return Math.floor(Math.random() * array.length);
}

// функция копирования массива
var getCopyOfArray = function (array) {
  var copyOfArray = array.slice();
  return copyOfArray;
};

var getOffersObject = function (index) {
  return {
    'author': {'avatar': 'img/avatars/user0' + index + '.png'},
    'offer': {},
    'location': {}
  };
};


var offers = [];
for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
  offers.push(getOffersObject(i));
}


