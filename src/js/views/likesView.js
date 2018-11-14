const likesHTML = document.querySelector('.likes');
const likesList = document.querySelector('.likes__list');

export const toggleHeart = (isLiked) => {
  const string = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${string}`);
};

export const addLikeHTML = like => {
  const html = `
  <li>
      <a class="likes__link" href="#${like.id}">
          <figure class="likes__fig">
              <img src="${like.img}" alt="${like.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${like.title}</h4>
              <p class="likes__author">${like.author}</p>
          </div>
      </a>
  </li>
  `;
  likesList.insertAdjacentHTML('beforeend', html);
};

export const deleteLikeHTML = (id) => {
  const item = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
  if(item){
    item.parentElement.removeChild(item);
  }
};
