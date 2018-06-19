import axios from 'axios';

export default class Search {
  constructor(query){
    this.query = query;
  }

  async getResults(){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
    try {
      const result = await axios.get(`${proxy}http://food2fork.com/api/search?key=${apikey}&q=${this.query}`);
      this.result = result.data.recipes;
    } catch(error){
      console.log(error);
    }
  }
}


// function getResultsOldway(query){
//   const proxy = 'https://cors-anywhere.herokuapp.com/';
//   const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
//   axios.get(`${proxy}http://food2fork.com/api/search?key=${apikey}&q=${query}`)
//   .then(res => {
//     console.log(res.data.recipes);
//   })
//   .catch(error => console.log(error));
// }
