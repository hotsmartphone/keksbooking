var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

var fetures = [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var photos = [ "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var NUMBER_OF_ADVS = 8;

//Надо написать функцию, которая умеет принимать или одно или два значения (диапазон)
var random = function(min, max) {
  if max === null {
    return Math.floor(Math.random() * min;
  } else {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}
};

var randomWAdvs = function(NUMBER_OF_ADVS) {
  var x = [];
  for (var i = 0; i < NUMBER_OF_ADVS; i++) {
    x[i] = {
      {author: {avatar: "img/avatars/user0" + random(8) + ".png";}},
      {offer: {
          title:
          address:
          price
          type
          rooms
          guests
          checkin
          checkout
          features
          description
          photos
      }
    }, {location: {
        x:
        //Здесь нужно применить функцию с диапазоном
        y: random()
      }
    }
  }
};
  return x;
};

wizards = randomWizards(NUMBER_OF_WIZARDS);
