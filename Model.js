const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

const UserProfileSchema = new Schema({
    username: String,
    name: String,
    email: String,
    password: String
});

//converting the schema to a model
const BlogPost = mongoose.model('BlogPost',BlogPostSchema);
const Profile = mongoose.model('Profile',UserProfileSchema);

const newBlogPost = new BlogPost();