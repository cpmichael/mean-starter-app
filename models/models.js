/**
 * Created by Cengkuru on 8/29/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Post schema
var postSchema = new mongoose.Schema({
    imageUrl: String,
    title: {type: String, index: true},
    slug: String,
    text: String,
    upvotes: Number,
    likes: Number,
    tag_ids: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],// Many-To-Many
    created_by: {type: Schema.ObjectId, ref: 'User', index: true},		//should be changed to ObjectId, ref "User"
    created_at: {type: Date, default: Date.now}
});

// User schema
var userSchema = new mongoose.Schema({
    username: {type: String, index: true},
    name: {type: String, index: true},
    email: String,
    password: String,
    profile: {
        imageUrl: String,
        phones: [],
        address: String,
        facebook: String,
        twitter: String,
        github: String,
        bio: String,
        occupation: String
    },
    created_at: {type: Date, default: Date.now}
});


// Register Models
mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
