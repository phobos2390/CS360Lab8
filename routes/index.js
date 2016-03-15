var express = require('express');
var router = express.Router();
var mongo = require('mongo');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB');

var commentSchema = mongoose.Schema(
{
	Name:String,
	Comment:String,
	Timestamp:Date
});

var Comment = mongoose.model('Comment',commentSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',() =>
{
	console.log('connected to the database');
});

/* GET home page. */
router.get('/', function(req, res, next) 
{
	res.sendfile('views/index.html');
});

router.get('/comment', (req,res,next) =>
{
	console.log("In the GET route");
	Comment.find((err,commentList) =>
	{
		if(err) 
		{
			return console.error(err);
		}
		else
		{
			console.log(commentList);
			res.json(commentList);
		}
	});
});

router.post('/comment', function(req, res, next)
{
	console.log("POST comment route");//[1]
	req.body.Timestamp = new Date();
	console.log(req.body);
	var newcomment = new Comment(req.body);
	console.log(newcomment);
	newcomment.save((err, post) =>
	{
		if(err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	});
});

module.exports = router;
