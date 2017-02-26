/**
 * Created by metal on 2/19/17.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/index', { title: 'Express' });
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/press');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("open");
});

var kittySchema = mongoose.Schema({
    name: String
});

var Kitten = mongoose.model('Kitten', kittySchema);

router.post('/', function (req, res, next) {

    // mongoose.createConnection('mongodb://localhost/press');

    var fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('meow');
        }
    });

    res.render('admin/index', {news: JSON.stringify(req.body)});
})

module.exports = router;
