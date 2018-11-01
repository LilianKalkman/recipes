import axios from 'axios';

export default class Recipe {
  constructor(id){
    this.id = id;
  }

  async getRecipe(){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
    try {
      const result = await axios.get(`${proxy}http://food2fork.com/api/search?key=${apikey}&rId=${this.id}`);
      console.log(result);
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
      console.log(this);
    } catch(error){
      console.log(error);
    }
  }

  calcTime(){
    const numIngr = this.ingredients.length;
    const periods = Math.ceil(numIngr / 3);
    this.time = periods * 15;
  }

  calcServings(){
    this.servings = 4;
  }
};
