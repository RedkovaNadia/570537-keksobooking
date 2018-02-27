'use strict';

var NUMBER_OF_OFFERS = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES_OF_HOUSE = ['flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
// переменные с номерами клавиш
var ESC_KEYCODE = 27;
// var ENTER_KEYCODE = 13;

// функция, возвращающая рандомный индекс массива
function getRandomIndex(number) {
  return Math.floor(Math.random() * number);
}

// ф-ция случайного числа в заданном промежутке
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var shuffleArray = function (array) { // ф-ция, которая мешает массив
  var arrayCopy = array.slice();
  var mixedArray = [];
  while (mixedArray.length < array.length) {
    var randomIndex = getRandomIndex(arrayCopy.length);
    mixedArray.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }
  return mixedArray;
};

var getOfferObject = function (index) {
  var titlesArrayCopy = TITLES.slice();

  var randomIForTitlesArrayCopy = getRandomIndex(titlesArrayCopy.length);
  var randomIForTypes = getRandomIndex(TYPES_OF_HOUSE.length);
  var randomIForCheckin = getRandomIndex(CHECKIN_TIME.length);
  var randomIForCheckout = getRandomIndex(CHECKOUT_TIME.length);

  var featuresArrayShuffleCopy = shuffleArray(FEATURES);
  featuresArrayShuffleCopy.splice(0, getRandomIndex(featuresArrayShuffleCopy.length));

  var mixedPhotosArray = shuffleArray(PHOTOS);
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
      'features': featuresArrayShuffleCopy,
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
// document.querySelector('.map').classList.remove('map--faded');

//  dom-элемент объяления

// ф-ция, проверяющая тип жилища
var getTypeOfHouse = function (offerType) {
  var typeOfHouse;
  switch (offerType) {
    case 'flat':
      typeOfHouse = 'Квартира';
      break;

    case 'bungalo':
      typeOfHouse = 'Бунгало';
      break;

    case 'house':
      typeOfHouse = 'Дом';
      break;
  }
  return typeOfHouse;
};
//  ф-ция манипуляций с фичами
var getFeaturesArrayElement = function (featuresElement, offerFeaturesArray) {

  // удаляю иконки из шаблона, которые идут по умолчанию
  var featureElement = featuresElement.querySelectorAll('.feature');
  for (i = 0; i <= 5; i++) {
    featuresElement.removeChild(featureElement[i]);
  }
  // создаю фрагмент для <li>
  var documentFragment = document.createDocumentFragment();
  for (i = 0; i < offerFeaturesArray.length; i++) {
    var newFeatureElement = document.createElement('li');
    newFeatureElement.className = 'feature feature--' + offerFeaturesArray[i];
    documentFragment.appendChild(newFeatureElement);
  }
  // добавляю <li> в нужный блок
  featuresElement.appendChild(documentFragment);
};
//  dom-элемент объяления
var template = document.querySelector('template');
var offerCardTemplate = template.content.querySelector('article.map__card');

var renderOfferCard = function (object) {
  var authorOfferCardElement = offerCardTemplate.cloneNode(true);
  authorOfferCardElement.querySelector('h3').textContent = object.offer.title;
  authorOfferCardElement.querySelector('small').textContent = object.offer.address;
  authorOfferCardElement.querySelector('.popup__price').innerHTML = object.offer.price + '&#x20bd;/ночь';
  // в блок h4 вывожу тип жилья через вызов ф-ции типа дома
  authorOfferCardElement.querySelector('h4').textContent = getTypeOfHouse(object.offer.type);
  authorOfferCardElement.children[6].textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
  authorOfferCardElement.children[7].textContent = 'Заезд после ' + object.offer.checkin + ' , выезд до ' + object.offer.checkout;
  authorOfferCardElement.children[9].textContent = object.offer.description;

  // вызов ф-ции фич
  var featuresElement = authorOfferCardElement.querySelector('.popup__features');
  getFeaturesArrayElement(featuresElement, object.offer.features);
  // удаляю строку <li> из шаблона
  var picturesElement = authorOfferCardElement.querySelector('.popup__pictures');
  var pictureElement = picturesElement.querySelector('li');
  picturesElement.removeChild(pictureElement);
  // создаю фрагмент для <li> и вложенного в него <img>
  var documentFragment = document.createDocumentFragment();
  for (i = 0; i < offers[0].offer.photos.length; i++) {
    var newLiElement = document.createElement('li');
    var newImgElementForLi = document.createElement('img');
    newImgElementForLi.src = object.offer.photos[i];
    newImgElementForLi.width = 70;
    newImgElementForLi.height = 70;
    newLiElement.appendChild(newImgElementForLi);
    documentFragment.appendChild(newLiElement);
  }
  // вывожу фрагмент в нужный блок
  picturesElement.appendChild(documentFragment);
  authorOfferCardElement.querySelector('.popup__avatar').src = object.author.avatar;
  // добавляю класс hidden
  authorOfferCardElement.classList.add('hidden');
  return authorOfferCardElement;
};

// document.querySelector('.map').insertBefore(renderOfferCard(offers[0]), document.querySelector('.map__filters-container'));

// вызываю ф-цию отрисовки меток
// renderPins();
var map = document.querySelector('.map');
var mapPinTemplate = template.content.querySelector('.map__pin');
var mapPinWidth = mapPinTemplate.offsetWidth;
var mapPinHeight = mapPinTemplate.offsetHeight;
var mapPins = map.querySelector('.map__pins');
// объявляю переменную - карточку со стартовыми значениями, которые будут меняться при клике на каждую новую метку
var mapCard = renderOfferCard(offers[0]);

// Оптимизирую с вынесением одинаковых операций в отдельные ф-ции - понадобятся для обработчиков
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
    // console.log('esc');
  }
};
// показывает карточку при клике на метку
var openPopup = function (object) {
  mapCard = renderOfferCard(object);
  mapCard.classList.remove('hidden');
  // console.log(1);
  // закрывает карточку при нажатии на esc
  document.addEventListener('keydown', onPopupEscPress);
};
// закрывает попап и убаирает обработчик нажатия на esc
var closePopup = function () {
  mapCard.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// создаю метку на карте
var createMapPinElement = function (object) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = (object.location.x - mapPinWidth) + 'px';
  mapPinElement.style.top = (object.location.y - mapPinHeight / 2) + 'px';
  mapPinElement.querySelector('img').src = object.author.avatar;
  // обработчик клика по метке, показывающий попап (внутри него - обработчик, который при помощи esc закрывает открытый попап)
  mapPinElement.addEventListener('click', function () {
    openPopup();
    // console.log('mapPinElement');
  });
  return mapPinElement;
};

// добиваюсь нужного мне количества меток при помощи ф-ции с циклом внутри, вставляю каждую во фрагмент и далее - в DOM
var renderPins = function () {
  var documentFragment = document.createDocumentFragment();
  for (i = 0; i < offers.length; i++) {
    documentFragment.appendChild(createMapPinElement(offers[i]));
  }
  mapPins.appendChild(documentFragment);
};
// обработчик, который закрывает попап если на нем нажать крестик
var mapCardClose = mapCard.querySelector('.popup__close');

mapCardClose.addEventListener('click', function () {
  closePopup();
  // console.log('mapCardClose');
});

// ф-ция смены значения атрибута disabled
var noticeForm = document.querySelector('.notice__form');
var formElementCollection = noticeForm.querySelectorAll('.form__element');

var changeDisabledValue = function (boolean) {
  for (i = 0; i < formElementCollection.length; i++) {
    formElementCollection[i].disabled = boolean;
  }
};
// noticeForm.children.length;
// alert(document.getElementById('mymenu').childNodes.length);
// document.getElementById('mymenu').getElementsByTagName('li').length);
// неактивно в неактивном сотоянии
changeDisabledValue(true);

var mapPinMain = map.querySelector('.map__pin--main');
var mapPinMainWidth = mapPinMain.offsetWidth;
var mapPinMainHeight = mapPinMain.offsetHeight;

var getMapPinMainXY = function (biasX, biasY) {
  var mapPinMainCoordinates = mapPinMain.getBoundingClientRect();
  document.querySelector('#address').value = (mapPinMainCoordinates.left - biasX) + ', ' + (mapPinMainCoordinates.top - biasY);
};
// задаю координаты середины метки
getMapPinMainXY(mapPinMainWidth / 2, mapPinMainHeight / 2);

mapPinMain.addEventListener('mouseup', function () {
  // 1 убираю затемнение карты
  map.classList.remove('map--faded');
  // 2 добавляю карту в разметку - стартовый вариант (остается скрытой)
  map.insertBefore(mapCard, document.querySelector('.map__filters-container'));
  // 3 показываю похожие метки
  renderPins();
  // 4 убираю затемненность формы и убираю дисэйбл
  noticeForm.classList.remove('notice__form--disabled');
  changeDisabledValue(false);

  // 5 задаю полю адреса текущий адрес главной метки (учитывая острый конец)
  getMapPinMainXY(mapPinMainWidth / 2, mapPinMainHeight);
  // --console.log('g')
});
