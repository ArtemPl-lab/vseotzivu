const {Router} = require('express');
const cyrillicToTranslit = require('cyrillic-to-translit-js');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { check, validationResult } = require('express-validator');
const router = Router();
router.post(
    '/create',
    [
        check('title', 'Это обязательное поле').exists(),
        check('content', 'Это обязательное поле').exists(),
        check('organisation', 'Это обязательное поле').exists(),
        check('tags', 'Это обязательное поле').exists(),
    ],
    async (req, res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                
                return res.status(400).json({
                    errors: errors.array(),
                    type: "invalid value"
                });
            }
            const {title, content, organisation, address, phone, email, site, tags, category} = req.body;
            const isDuplicate = await Post.findOne({ content });
            if(isDuplicate) return res.status(400).json({ message: "Такой пост уже существует", type: "error"});
            const url = cyrillicToTranslit().transform(title.toLowerCase(), "-");
            const post = new Post({url, title, content, organisation, address, phone, email, site, tags, category});
            await post.save();
            res.status(201).json({ message: `Пост успешно создан! ${url}`, type: "success"});

        } catch (error) {
            res.status(500).json({ message: error, type: "error" });
        }
    }
);
router.post('/get/review-data', async (req, res)=>{
    const { url } = req.body;
    const post = await Post.findOne({ url });
    res.status(200).json(post);
});
router.post('/comments', async (req, res)=>{
    const { postId } = req.body;
    const comments = await Comment.find({ postId: postId });
    console.log(comments);
    res.status(200).json(comments);
});
router.get('/get/comments', async (req, res)=>{
    const posts = await Post.find({ category: 'Отзыв' });
    res.status(200).json(posts);
});
router.get('/get/reviews', async (req, res)=>{
    const posts = await Post.find({ category: 'Отзыв' });
    res.status(200).json(posts);
});
router.get('/get/complaints', async (req, res)=>{
    const posts = await Post.find({ category: 'Жалоба' });
    res.status(200).json(posts);
});
router.post('/add/comment', async (req, res)=>{
    const {replay, postId, name, content } = req.body;
    console.log(replay);
    try{
        if(replay){
            const comment = new Comment({ postId, name, content });
            const {_id} = await comment.save();
            Comment.update(
                { "_id": replay},
                { "$push": { "replays": _id } },
                function (err, raw) {
                    if (err) return handleError(err);
                    res.status(200).json({
                        type: "success",
                        message: "Комментарий успешно оставлен"
                    });
                }
            );
        }
        else{
            const comment = new Comment({ postId, name, content });
            await comment.save();
            res.status(200).json({
                type: "success",
                message: "Комментарий успешно оставлен"
            });
        }
    }
    catch(e){
        res.status(200).json({
            type: "error",
            message: "Произошла ошибка"
        });
    }
    res.status(200);
});
router.post('/edit', async (req, res)=>{

});
router.post('/delete', async (req, res)=>{

});

module.exports = router;