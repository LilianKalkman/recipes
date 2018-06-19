import axios from 'axios';

async function getResults(query){
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
  const result = await axios.get(`${proxy}http://food2fork.com/api/search?key=${apikey}&q=${query}`);
  console.log(result);
}

getResults('pizza');


// 4b943e043588f1fc8cd5a56a1c23e32c   =API
// http://food2fork.com/api/search    =Request url
