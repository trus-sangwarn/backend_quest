'use strict';

import mongoose from 'mongoose';
import bluebird from 'bluebird';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {Trip} from './trip.model';

const Uri = 'mongodb://localhost/takemetour';

mongoose.set('debug', true);
mongoose.connect(Uri);
mongoose.Promise = bluebird;

const app = express();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.route('/trips')
  .get((req, res, next) => {
          Trip.find({},{
            "_id": true,
            "name": true
          }).then((err, trips) => {
            if(err) {return next(err);}
            else {res.json(trips);}
          });
      })
      .post((req, res, next) => {
          let trip = new Trip(req.body);

          trip.save((err) => {
            if(err) {return next(err);}
            else {res.json(trip);}
          });
      });

app.route('/trips/:id')
      .get((req, res) => {
          Trip.findOne({ _id: req.params.id})
              .then((trip)=>{
                  res.json(trip);
              });
      })
      .put((req, res, next) => {
          Trip.findOneAndUpdate({ _id: req.params.id}, req.body, (err, trip) => {
            if(err) {
              return next(err);
            } else {
              res.json(trip)
            }
          });
      })
      .delete((req, res) => {
          Trip.remove({ _id: req.params.id})
              .then((trip)=>{
                  res.json(trip);
              });
      });


app.listen(3000,() => {
  console.log('Server running at http://localhost:3000');
});
