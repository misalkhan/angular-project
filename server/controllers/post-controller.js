const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY
const User = require('../models/userSchema')
const Post = require('../models/postSchema')


exports.createPost = async (req, res) => {
    try {
        let email = req.user.email
        let { title, content } = req.body;
        if (!title || !title.trim() || !content.trim() || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Session expired! Please login again" });
        }
        let post = new Post({ title: title.replace(/\s+/g, ' '), content: content.replace(/\s+/g, ' '), author: user._id });
        console.log('post from server', post)
        await post.save();
        return res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.getAllPosts = async (req, res) => {
    let user = req.user
    try {
        let posts = await Post.find({ author: { $ne: user._id } }).select('title content');
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.getPost = async (req, res) => {
    let user = req.user
    let postId = req.params.postId
    try {
        let post = await Post.findById(postId).select('title content');
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.updatePost = async (req, res) => {
    let user = req.user
    let postId = req.params.postId
    try {
        let post = await Post.findByIdAndUpdate(postId, { title: req.body.title.replace(/\s+/g, ' '), content: req.body.content.replace(/\s+/g, ' ') }, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.deletePost = async (req, res) => {
    let user = req.user
    let postId = req.params.postId
    try {
        let post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.json({ message: "Post deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

exports.activeUserPosts = async (req, res) => {
    let user = req.user
    try {
        let posts = await Post.find({ author: user._id }).select('title content');
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}
