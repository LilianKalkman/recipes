import uniqid from 'uniqid';

export default class List {
  constructor(){
    this.items = [];
  }

  addItem(count, unit, ingredient){
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }

  deleteItem(id){
    // splice vs slice;
    // splice krijgt begin index en als 2e arg het AANTAL dat er uit moet, en bij slice is het 2e arg de eind index (not included / TOT die index).
    // *splice mutates original array, slice niet.
    const index = this.items.findIndex(el => el.id === id);
    this.items.splice(index, 1);
  }

  updateCount(id, newCount){
    this.items.find(el => el.id === id).count = newCount;
  }


}
