'use strict';

var PHOTO_COMMENTS = [
  'Всё отлично',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PHOTO_DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomIntBetweenTwo = function (min, max) {
  return Math.floor((Math.random() * max) + min);
};

var getRandomItemFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomItemsFromArray = function (array, count) {
  var randomItemsFromArray = array.sample(array, count);
  return randomItemsFromArray;
};

var getPhotos = function (count, minLikes, maxLikes, commentsCount) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomIntBetweenTwo(minLikes, maxLikes),
      comments: getRandomItemFromArray(PHOTO_COMMENTS, commentsCount),
      description: getRandomItemFromArray(PHOTO_DESCRIPTIONS)
    };
  }
  return photos;
};

var renderPhotos = function (count) {
  var photos = getPhotos(count, 15, 200, 2);
  var pictureTemplate = document.querySelector('#picture').content;
  var photosListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').setAttribute('src', photos[i].url);
    photoElement.querySelector('.picture__stat--likes').textContent = photos[i].likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photos[i].comments;

    fragment.appendChild(photoElement);
  }

  photosListElement.appendChild(fragment);
};

renderPhotos(25);
