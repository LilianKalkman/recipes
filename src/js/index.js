import axios from 'axios';

async function getResults(query){
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
  try {
    const result = await axios.get(`${proxy}http://food2fork.com/api/search?key=${apikey}&q=${query}`);
    const recipes = result.data.recipes;
    console.log(recipes);
  } catch(error){
    console.log(error);
  }
}

function getResultsOldway(query){
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
  axios.get(`${proxy}http://food2fork.com/api/search?key=${apikey}&q=${query}`)
  .then(res => {
    console.log(res.data.recipes);
  })
  .catch(error => console.log(error));
}

getResults('salmon');
// getResultsOldway('salmon');
