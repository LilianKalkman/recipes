import axios from 'axios';

export default class Recipe {
  constructor(id){
    this.id = id;
  }

  async getRecipe(){
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apikey = '4b943e043588f1fc8cd5a56a1c23e32c';
    try {
      const result = await axios.get(`${proxy}http://food2fork.com/api/get?key=${apikey}&rId=${this.id}`);
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
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

  updateServings(type){
    const newServings = type === '-' ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach(i => {
      i.count *= (newServings / this.servings);
    });

    this.servings = newServings;
  }

  parseIngredients(){
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map(ingr => {
      // uniform units
      let ingredient = ingr.toLowerCase();

      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // haakjes weg
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      // get count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let ingObj;

      if(unitIndex >= 0){
        // there is a unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;

        if(arrCount.length === 1){
          count = eval(arrCount[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        };

        ingObj = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        };

      } else if(parseInt(arrIng[0])){
        // no unit, wel number
        ingObj = {
          count: parseInt(arrIng[0]),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }

      } else {
        // no unit and no number; only text
        ingObj = {
          count: 1,
          unit: '',
          ingredient
        };
      };

      return ingObj;

    });

    this.ingredients = newIngredients;
  }


};
