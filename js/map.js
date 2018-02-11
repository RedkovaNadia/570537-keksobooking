'use strict';

//количество объектов-объявлений
var NUMBER_OF_OFFERS = 8;

//массив с числами-строками для адреса картинок аватара
var NUMBER_FOR_AVATAR_ADDRESS = ["01", "02", "03", "04", "05", "06", "07", "08"];

//функция, возвращающая рандомный индекс массива
function getRandomInt(array) {
  return Math.floor(Math.random() * array.length);
};

//функция копирования массива
var getCopyOfArray = function (array) {
  var copyOfArray = array.slice();
  return copyOfArray;
};

// ф-ция, создающая массив объектов (начало)
var generateOffersArray = function (XX) {
  var offers = [];
  for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
    offers.push({"author": { "avatar": img/avatars/user XX.png}});

    //удаляю из массива numberOfAvatarAdressCopy значение, только что записанное в массив offers
    numberOfAvatarAdressCopy.splice(randomIForAvatarAddress, 1);
  } return offers;
};

//копия массива NUMBER_FOR_AVATAR_ADDRESS как рез-т ф-ции getCopyOfArray
var numberOfAvatarAdressCopy = getCopyOfArray(NUMBER_FOR_AVATAR_ADDRESS);

//переменная рандомного индекса для копии массива
var randomIForAvatarAddress = getRandomInt(NUMBER_FOR_AVATAR_ADDRESS);

//переменная, возвращающая массив объектов (на данный момент)
var offersArray = generateOffersArray(numberOfAvatarAdressCopy[randomIForAvatarAddress]);


