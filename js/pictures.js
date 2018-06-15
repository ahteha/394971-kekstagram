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

var getRandomComments = function (array, count) {
  var comments = [];
  for (var i = 0; i < count; i++) {
    comments.push(getRandomItemFromArray(array));
  }
  return comments;
};

var getPhotos = function (count, minLikes, maxLikes, commentsCount) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomIntBetweenTwo(minLikes, maxLikes),
      comments: getRandomComments(PHOTO_COMMENTS, commentsCount),
      description: getRandomItemFromArray(PHOTO_DESCRIPTIONS)
    };
  }
  return photos;
};

var renderPhotos = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('src', array[i].url);
    photoElement.querySelector('.picture__stat--likes').textContent = array[i].likes;
    photoElement.querySelector('.picture__stat--comments').textContent = array[i].comments.lenght;
    fragment.appendChild(photoElement);
  }
  photosListElement.appendChild(fragment);
};

var pictureTemplate = document.querySelector('#picture').content;
var photosListElement = document.querySelector('.pictures');

renderPhotos(getPhotos(25, 15, 200, 2));

var bigPicture = document.querySelector('.big-picture');

var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  var socialComments = bigPicture.querySelector('.social__comments');
  var socialComment = socialComments.querySelector('.social__comment').cloneNode(true);
  socialComments.innerHTML = '';

  var fragmentBigPicture = document.createDocumentFragment();

  for (var i = 0; i < photo.comments.length; i++) {
    var comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = 'img/avatar-' + getRandomIntBetweenTwo(1, 6) + '.svg';
    var socialText = comment.querySelector('.social__text');
    socialText.innerHTML = '';
    socialText.textContent = photo.comments[i];
    fragmentBigPicture.appendChild(comment);
  }
  socialComments.appendChild(fragmentBigPicture);
};

renderBigPicture(getRandomItemFromArray(getPhotos(25, 15, 200, 2)));

var socialCommentCount = document.querySelector('.social__comment-count');
var socialCommentLoad = document.querySelector('.social__loadmore');
socialCommentCount.classList.add('visually-hidden');
socialCommentLoad.classList.add('visually-hidden');
