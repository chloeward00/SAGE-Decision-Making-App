
var DecisionTree = require('decision-tree');

// this is for activities category

var training_data = [
    {name: "beautysvc", type: "chill", picked: true},
    {name: "shopping", type: "chill", picked: true},
    {name: "museums", type: "chill", picked: true},
    {name: "arts", type: "chill", picked: true},
    {name: "wineries", type: "chill", picked: true},
    {name: "movietheaters", type: "chill", picked: true},
    {name: "sports", type: "active", picked: true},
    {name: "nightlife", type: "active", picked: true},
    {name: "fitness", type: "active", picked: true},
    {name: "active", type: "active", picked: true},
    {name: "festivals", type: "active", picked: true},
    {name: "zoos", type: "active", picked: true},
    {name: "beautysvc", type: "chill", picked: false},
    {name: "shopping", type: "chill", picked: false},
    {name: "museums", type: "chill", picked: false},
    {name: "arts", type: "chill", picked: false},
    {name: "wineries", type: "chill", picked: false},
    {name: "movietheaters", type: "chill", picked: false},
    {name: "sports", type: "active", picked: false},
    {name: "nightlife", type: "active", picked: false},
    {name: "fitness", type: "active", picked: false},
    {name: "active", type: "active", picked: false},
    {name: "festivals", type: "active", picked: false},
    {name: "zoos", type: "active", picked: false},
];

// var training_data = [
// 	{"color":"blue", "shape":"square", "picked":false},
// 	{"color":"red", "shape":"square", "picked":false},
// 	{"color":"blue", "shape":"circle", "picked":true},
// 	{"color":"red", "shape":"circle", "picked":true},
// 	{"color":"blue", "shape":"hexagon", "picked":false},
// 	{"color":"red", "shape":"hexagon", "picked":false},
// 	{"color":"yellow", "shape":"hexagon", "picked":true},
// 	{"color":"yellow", "shape":"circle", "picked":true}
// ];

// var test_data = [
// 	{"color":"blue", "shape":"hexagon", "picked":false},
// 	{"color":"red", "shape":"hexagon", "picked":true},
// 	{"color":"yellow", "shape":"hexagon", "picked":true},
// 	{"color":"yellow", "shape":"circle", "picked":true}
// ];

var test_data = [
    {name: "beautysvc", type: "chill", picked: false},
    {name: "shopping", type: "chill", picked: false},
    {name: "museums", type: "chill", picked: true},
    {name: "arts", type: "chill", picked: true},
    {name: "wineries", type: "chill", picked: true},
    {name: "movietheaters", type: "chill", picked: true},
    {name: "sports", type: "active", picked: false},
    {name: "nightlife", type: "active", picked: false},
    {name: "fitness", type: "active", picked: false},
    {name: "active", type: "active", picked: false},
    {name: "festivals", type: "active", picked: false},
    {name: "zoos", type: "active", picked: false},
];

var class_name = "picked";

// var features = ["color", "shape"];
var features = ["name", "type"];
var dt = new DecisionTree(class_name, features);
dt.train(training_data);

// var predicted_class = dt.predict({
// 	color: "red",
// 	shape: "hexagon"
// });

var predicted_class = dt.predict({
    "name": "sports",
    "type": "active",
});

var accuracy = dt.evaluate(test_data);

var treeJson = dt.toJSON();

console.log(treeJson.model['vals'])


// const ActivityTree = ({name, type, picked}) => {

//     var class_name = "picked";

//     var features = ["name", "type"];
    
//     var dt = new DecisionTree(class_name, features);
    
//     dt.train(training_data);

//     var predicted_class = dt.predict({
//         "name": "sports",
//         "type": "active",
//     });
    
//     var accuracy = dt.evaluate(test_data);
    
//     var treeJson = dt.toJSON();

//     return 
// }
 
// export default ActivityTree;