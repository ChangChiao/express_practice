const { json } = require('express');
const express = require('express');
const router = express.Router();
const Posts = require("../models/posts");

router.get('/', async function(req, res, next) {
    const postList = await Posts.find();
    res.status(200).json({message:"success", posts:postList})
});
  

router.post('/', async function(req, res, next) {
    const { content, image, name, likes } = req.body
    Posts.create({
        content, image, name, likes,
    })
    const postList = await Posts.find();
    res.status(200).json({message:"success", posts:postList})
});

router.patch('/:id', async function(req, res, next) {
    const { id } = req.params;
    const { name, content } = req.body;
    if(name === undefined && content === undefined){
        res.status(400).send("參數有缺");
        return     
    }
    try {
        await Posts.findByIdAndUpdate(id, {name, content});
        const target = await Posts.findById(id);
        res.status(200).json({message:"success", post: target})
    } catch (error) {
        res.status(400).send("無此id");   
    }
});


router.delete('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
        await Posts.findByIdAndDelete(id)
        res.status(200).json({message:"success"})
    } catch (error) {
        res.status(400).send("無此id");     
    }
});

router.delete('/', async function(req, res, next) {
    await Posts.deleteMany({});
    res.status(200).json({message:"success", posts:[]})
});


module.exports = router;