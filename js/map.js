var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

var comfort = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var roomPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var typeOfHouse = ["palace", "flat", "house", "bungalo"];

var checkinTime = ["12:00", "13:00", "14:00"];

var checkoutTime = ["12:00", "13:00", "14:00"];

var NUMBER_OF_ADVS = 8;

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

//Функция, помещаемая в качестве аргумента функции sort
function compareRandom(a, b) {
  return Math.random() - 0.5;
}

//Функция, которая выводит отсортированный массив, произвольной длины.
//ЕСли есть второй аргумент, то массив будет ограничен до произвольной длины.
//Если второго аргумента нет, то длина массива не меняется.
//Можно еще потом добавить аргумент - какой именно длины выводить отсортированный массив.
function arrSortNoLimit(arr) {
  var c = arr;
  c.sort(compareRandom);
  return c;
};

function arrSortWhithLimit(arr) {
  var c = arr;
  c.sort(compareRandom);
    c.length = Math.floor(Math.random()*arr.length);
    return c;
};
// console.log(arrSortWhithLimit(comfort));

var randomAdvs = function(NUMBER_OF_ADVS) {
  var z = [];
  for (var i = 0; i < NUMBER_OF_ADVS; i++) {
    z[i] = {
        author: {
          avatar: "img/avatars/user0" + random(8) + ".png"
      },
        offer: {
          title: titles[random(titles.length)],
          address:  random(650) + ", " + random(130, 630),
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
        x: random(650),
        y: random(130, 630)
      }
      }
  };
  return z;
};

var advs = randomAdvs(NUMBER_OF_ADVS);

console.log(advs);
// var mapActiveSwitch = document.querySelector('.map');
// mapActiveSwitch.classList.remove('map--faded');
