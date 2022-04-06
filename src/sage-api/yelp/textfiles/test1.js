
// there are 1565 items in the categories array
const jsonData= require('./yelp/categories.json'); 
const fsLibrary  = require('fs')

const resto = [];
const food = [];

// this is to get the list of food related category
for( i = 0; i < jsonData.length; i++ ){

    var obj = jsonData[i]

    if (obj.parents == 'restaurants'){
        resto.push(obj.title)
    }

    if (obj.parents == 'food'){
        food.push(obj.title)
        
        fsLibrary.appendFile('foodCat.txt', obj.title, (error) => {
            if (error) throw err;
        })
    }
}


console.log(food)