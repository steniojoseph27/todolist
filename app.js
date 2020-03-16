const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = "mongodb://127.0.0.1:27017/todolistdb";

app.use("/", express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/tasks/new", function(req, res){
	MongoClient.connect(url, function(err, db){
		let tasks = db.collection('tasks');
		tasts.insert({
			timestamp: new Date(),
			description: req.body.description
		})
	})
})

app.get("/tasks", function(req, res){
	MongoClient.connect(url, function(err, db){
		if(!err){
			let tasks = db.collection('tasks');
			tasks.find({}).toArray(function(error, results){
				res.send(JSON.stringify(results));
			})
		}
	})
})

app.put("/tasks/update/:id", function(req, res){
	MongoClient.connect(url, function(err, db){
		let tasks = db.collection('tasks');
		tasks.update({
			_id: new ObjectId(req.params.id)
		}, {$set: {
			description: req.body.description
		}})
	})
})

app.delete("/tasks/delete/:id", function(req, res){
	MongoClient.connect(url, function(err, db){
		let tasks = db.collection('tasks');
		tasks.remove({_id: new ObjectId(req.params.id)}, function(error, results){
			if(!err){
				console.log(results);
			}else{
				console.log(error)
			};
		});
	});
})

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
})

app.listen(3000);