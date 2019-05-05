var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

var comfort = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var roomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var typeOfHouse = ["palace", "flat", "house", "bungalo"];

var checkinTime = ["12:00", "13:00", "14:00"];

var checkoutTime = ["12:00", "13:00", "14:00"];

var min_X_mapSize = 10;
var max_X_mapSize = 1000;
var min_Y_mapSize = 130;
var max_Y_mapSize = 630;

var NUMBER_OF_ADVS = 8;

var PIN_WIDTH = 46;
var PIN_HEIGHT = 62;

//Функция рандомного числа, в том числе в диапазоне
var random = function(min, max, oneOf) {
  if (max === undefined) {
    return (Math.floor(Math.random() * min));
  } else {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }
};



//Функция, которая выводит отсортированный массив, произвольной длины.
//ЕСли есть второй аргумент, то массив будет ограничен до произвольной длины.
//Если второго аргумента нет, то длина массива не меняется.
//Можно еще потом добавить аргумент - какой именно длины выводить отсортированный массив.
function arrSortNoLimit(arr) {
  var c = arr;
  //Функция, помещаемая в качестве аргумента функции sort
    c.sort(function compareRandom() {
    return Math.random() - 0.5;
  });
  return c;
};

// function arrSortWhithLimit(arr) {
//   var c = arr;
//   c.sort(compareRandom);
//     c.length = Math.floor(Math.random()*arr.length);
//     return c;
// };
// console.log(arrSortWhithLimit(comfort));

var randomAdvs = function(NUMBER_OF_ADVS) {
  var houses = [];
  for (var i = 0; i < NUMBER_OF_ADVS; i++) {
    var locationX = random(min_X_mapSize, max_X_mapSize);
    var locationY = random(min_Y_mapSize, max_Y_mapSize);
    houses[i] = {
        author: {
          avatar: "img/avatars/user0" + random(1, 8) + ".png"
      },
        offer: {
          title: titles[random(titles.length)],
          address: locationX + ", " + locationY,
          price: random(1000, 1000000),
          type: typeOfHouse[random(typeOfHouse.length)],
          rooms: random(1, 5),
          guests: random(10),
          checkin: checkinTime[random(checkinTime.length)],
          checkout: checkoutTime[random(checkoutTime.length)],
          features: arrSortNoLimit(comfort),
          description: "",
          //Почему то arr.arrSortWhithLimit здесь не работает - массив пустой
          photos: arrSortNoLimit(roomPhotos)
      },
      location: {
        x: locationX,
        y: locationY
      }
      }
      console.log(comfort);
  };
  return houses;
};

var advs = randomAdvs(NUMBER_OF_ADVS);

console.log(advs);
console.log(advs[1].offer.title);

var mapActiveSwitch = document.querySelector('.map');
mapActiveSwitch.classList.remove('map--faded');



var renderPin = function (advs) {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinList = document.createDocumentFragment();

  for (var i = 0; i < advs.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (advs[i].location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (advs[i].location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = advs[i].author.avatar;
    pinElement.querySelector('img').alt = advs[i].offer.title;
    pinList.appendChild(pinElement);

    console.log(pinElement);
  }
  return document.querySelector('.map__pins').appendChild(pinList);
};

var mapPins = renderPin(advs);

var typeOnRussian = function (oneOfType) {
  if (oneOfType === 'flat') {
    return 'Квартира';
  } else if (oneOfType === 'bungalo') {
    return 'Бунгало';
  } else if (oneOfType === 'house') {
    return 'Дом';
  } else if (oneOfType === 'palace') {
    return 'Дворец';
  }
}

// Удаление всех дочерних элементов, описание на MDN: Node.removeChild "Удаление всех дочерних элементов" (своровал);
function removeChild(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// Создение DOM-элементов для списка удобств (своровал);
function featureCreateAll(featureCard) {
  var featureFragment = document.createDocumentFragment();
  for (var i = 0; i < featureCard.length; i++) {
    var featureAdd = document.createElement('li');
    featureAdd.classList.add('feature');
    featureAdd.classList.add('feature--' + featureCard[i]);
    featureFragment.appendChild(featureAdd);
  }
  return featureFragment;
}

//Создание DOM-элементов для списка фотографий: одна фотография (своровал);
function photoCreateAll(photoArr) {
  var photoTemplate = document.querySelector('template').content.querySelector('.popup__pictures');
  var photoFragment = document.createDocumentFragment();
  for (var i = 0; i < photoArr.length; i++) { // Цикл для добавления в DocumentFragment дом-элементов <img></img> с заданными из массива src;
    var photoNew = photoTemplate.cloneNode(true);
    var photoElement = photoNew.querySelector('li');
    photoElement.querySelector('img').style.width = 50 + 'px';
    photoElement.querySelector('img').style.height = 50 + 'px';
    photoElement.querySelector('img').src = photoArr[i];
    photoFragment.appendChild(photoElement);
  }
  return photoFragment;
}

var popupElement = function(i) {
  var houseTemplate = document.querySelector('template').content.querySelector('.map__card');
  var houseElement = houseTemplate.cloneNode(true);
  houseElement.querySelector('.popup__title').textContent = advs[i].offer.title;
  houseElement.querySelector('.popup__text--address').textContent = advs[i].offer.address;
  houseElement.querySelector('.popup__text--price').textContent = advs[i].offer.price + '₽/ночь';
  houseElement.querySelector('.popup__type').textContent = typeOnRussian(advs[i].offer.type);
  console.log(typeOnRussian(advs[i].offer.type));
  houseElement.querySelector('.popup__text--capacity').textContent = advs[i].offer.rooms + ' комнаты для ' + advs[i].offer.guests + ' гостей';
  houseElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advs[i].offer.checkin + ', выезд до ' + advs[i].offer.checkout;
  removeChild(houseElement.querySelector('.popup__features')); // Удаляю дефолтный список удобств из шаблона (своровал);
  houseElement.querySelector('.popup__features').appendChild(featureCreateAll(advs[i].offer.features));
  houseElement.querySelector('.popup__description').textContent = advs[i].offer.description;
  removeChild(houseElement.querySelector('.popup__pictures')); // Удаляю дефолтный список элементов под фотографии из шаблона (своровал);
  houseElement.querySelector('.popup__pictures').appendChild(photoCreateAll(advs[i].offer.photos));
  houseElement.querySelector('.popup__avatar').src = advs[i].author.avatar;

  var newCard = mapActiveSwitch.appendChild(houseElement);
  return newCard;
};

popupElement(0);



// var fragment = document.createDocumentFragment();
// for (var i = 0; i < advs.length; i++) {
//   fragment.appendChild(renderHouse(advs[1]));
//   console.log(fragment.appendChild(renderHouse(advs[1])));
// }
// similarListElement.appendChild(fragment);
