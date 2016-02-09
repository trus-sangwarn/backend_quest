'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TripSchema = new Schema({
    name: String,
    price: Number,
    description: String
});

export let Trip = mongoose.model('Trip',TripSchema);
