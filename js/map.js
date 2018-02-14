'use strict';

var NUMBER_OF_OFFERS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_OF_HOUSE = ['flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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
  var titlesArrayCopy = TITLES.slice();

  var randomIForTitlesArrayCopy = getRandomIndex(titlesArrayCopy.length);
  var randomIForTypes = getRandomIndex(TYPES_OF_HOUSE.length);
  var randomIForCheckin = getRandomIndex(CHECKIN_TIME.length);
  var randomIForCheckout = getRandomIndex(CHECKOUT_TIME.length);

  var featuresArrayCopy = FEATURES.slice();
  featuresArrayCopy.length = getRandomNumber(1, FEATURES.length);
  var featuresRandomLengthArray = [];
  for (var i = 0; i < featuresArrayCopy.length; i++) { // создаю массив рандомной длины
    var randomIForFeaturesArrayCopy = getRandomIndex(featuresArrayCopy.length);
    featuresRandomLengthArray.push(featuresArrayCopy.splice(randomIForFeaturesArrayCopy, 1)[0]);
  }

  var photosArrayCopy = PHOTOS.slice();
  var mixedPhotosArray = [];
  while (mixedPhotosArray.length < PHOTOS.length) { // мешаю новый массив (значения беру из копии исходного)
    var randomIForPhotosArrayCopy = getRandomIndex(photosArrayCopy.length);
    mixedPhotosArray.push(photosArrayCopy[randomIForPhotosArrayCopy]);
    photosArrayCopy.splice(randomIForPhotosArrayCopy, 1);
  }
  var randomX = getRandomNumber(300, 900);
  var randomY = getRandomNumber(150, 500);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },
    'offer': {
      'title': titlesArrayCopy.splice(randomIForTitlesArrayCopy, 1)[0], // беру рандомное значение из копии массива для текущего свойства объекта и удаляю его из копии массива
      'address': randomX + ',' + randomY,
      'price': getRandomNumber(1000, 1000000),
      'type': TYPES_OF_HOUSE[randomIForTypes],
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 10),
      'checkin': CHECKIN_TIME[randomIForCheckin],
      'checkout': CHECKOUT_TIME[randomIForCheckout],
      'features': featuresRandomLengthArray,
      'description': '',
      'photos': mixedPhotosArray
    },
    'location': {
      'x': randomX,
      'y': randomY
    }
  };
};

var offers = [];
for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
  offers.push(getOfferObject(i));
}
// убираю класс у блока
document.querySelector('.map').classList.remove('map--faded');

// создаю метку на карте
var mapPins = document.querySelector('.map__pins');

var fragmentFirst = document.createDocumentFragment();

var createButtonElement = function (object) {
  var newButtonElement = document.createElement('button');
  newButtonElement.style.left = (object.location.x + 20) + 'px';
  newButtonElement.style.top = (object.location.y + 40) + 'px';
  newButtonElement.className = 'map__pin';

  var newImgElement = document.createElement('img');
  newImgElement.src = object.author.avatar;
  newImgElement.width = 40;
  newImgElement.height = 40;
  newImgElement.draggable = false;

  newButtonElement.appendChild(newImgElement);
  return newButtonElement;
};
// добиваюсь нужного мне количества меток при помощи цикла
for (i = 0; i < offers.length; i++) {
  fragmentFirst.appendChild(createButtonElement(offers[i]));
}

mapPins.appendChild(fragmentFirst);

/*
старый вариант создания метки (без ф-ции)

var mapPins = document.querySelector('.map__pins');

var fragmentFirst = document.createDocumentFragment();

for (i = 0; i < offers.length; i++) {
  var newButtonElement = document.createElement('button');
  newButtonElement.style.left = (offers[i].location.x + 20) + 'px';
  newButtonElement.style.top = (offers[i].location.y + 40) + 'px';
  newButtonElement.className = 'map__pin';

  var newImgElement = document.createElement('img');
  newImgElement.src = offers[i].author.avatar;
  newImgElement.width = 40;
  newImgElement.height = 40;
  newImgElement.draggable = false;
  newButtonElement.appendChild(newImgElement);
  fragmentFirst.appendChild(newButtonElement);
}
mapPins.appendChild(fragmentFirst);
*/

//  dom-элемент объяления

var offerCardTemplate = document.querySelector('template').content.querySelector('article.map__card');

var renderOfferCard = function (object) {
  var authorOfferCardElement = offerCardTemplate.cloneNode(true);
  authorOfferCardElement.querySelector('h3').textContent = object.offer.title;
  authorOfferCardElement.querySelector('small').textContent = object.offer.address;
  authorOfferCardElement.querySelector('.popup__price').innerHTML = object.offer.price + '&#x20bd;/ночь';
  // в блок h4 вывожу тип жилья
  if (object.offer.type === 'flat') {
    authorOfferCardElement.querySelector('h4').textContent = 'Квартира';
  }
  if (object.offer.type === 'bungalo') {
    authorOfferCardElement.querySelector('h4').textContent = 'Бунгало';
  }
  if (object.offer.type === 'house') {
    authorOfferCardElement.querySelector('h4').textContent = 'Дом';
  }
  authorOfferCardElement.children[6].textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  authorOfferCardElement.children[7].textContent = 'Заезд после ' + object.offer.checkin + ' , выезд до ' + object.offer.checkout;
  authorOfferCardElement.children[9].textContent = object.offer.description;
  // удаляю иконки из шаблона, которые идут по умолчанию
  var ulBlock = authorOfferCardElement.querySelectorAll('ul');
  var liBlockFirst = ulBlock[0].querySelectorAll('.feature');
  ulBlock[0].removeChild(liBlockFirst[0]);
  ulBlock[0].removeChild(liBlockFirst[1]);
  ulBlock[0].removeChild(liBlockFirst[2]);
  ulBlock[0].removeChild(liBlockFirst[3]);
  ulBlock[0].removeChild(liBlockFirst[4]);
  ulBlock[0].removeChild(liBlockFirst[5]);
  // создаю фрагмент для <li>
  var fragmentSecond = document.createDocumentFragment();
  for (i = 0; i < object.offer.features.length; i++) {
    var newLiElementFirst = document.createElement('li');
    newLiElementFirst.className = 'feature feature--' + object.offer.features[i];
    fragmentSecond.appendChild(newLiElementFirst);
  }
  // добавляю <li> в нужный блок
  ulBlock[0].appendChild(fragmentSecond);
  // удаляю строку <li> из шаблона
  var liBlockSecond = ulBlock[1].querySelector('li');
  ulBlock[1].removeChild(liBlockSecond);
  // создаю фрагмент для <li> и вложенного в него <img>
  var fragmentThird = document.createDocumentFragment();
  for (i = 0; i < offers[0].offer.photos.length; i++) {
    var newLiElementSecond = document.createElement('li');
    var newImgElementForLi = document.createElement('img');
    newImgElementForLi.src = object.offer.photos[i];
    newImgElementForLi.width = 70;
    newImgElementForLi.height = 70;
    newLiElementSecond.appendChild(newImgElementForLi);
    fragmentThird.appendChild(newLiElementSecond);
  }
  // вывожу фрагмент в нужный блок
  ulBlock[1].appendChild(fragmentThird);
  return authorOfferCardElement;
};

document.querySelector('.map').insertBefore(renderOfferCard(offers[0]), document.querySelector('.map__filters-container'));

