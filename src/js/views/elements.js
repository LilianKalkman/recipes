export const elements = {
  searchInput: document.querySelector('.search__field'),
  searchList: document.querySelector('.results__list'),
  resultsDiv: document.querySelector('.results')
};

export const renderLoader = parent => {
  const loader = `
  <div className="loader">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>`;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if(loader){
    loader.parentElement.removeChild(loader);
  }
}
