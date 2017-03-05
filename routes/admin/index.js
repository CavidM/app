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
mongoose.connect('mongodb://cavid:mlab22@ds058369.mlab.com:58369/node_app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("open");
});

var newsSchema = mongoose.Schema({
    name: String,
    text: String
});

var News = mongoose.model('News', newsSchema);

router.post('/', function (req, res, next) {

    var news = req.body;

    // mongoose.createConnection('mongodb://localhost/press');

    var newNews = new News({
        name: news['news-name'],
        text: news['news-description']
    });

    newNews.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('success');
        }
    });

    res.render('admin/index', {news: JSON.stringify(req.body)});
})

module.exports = router;
