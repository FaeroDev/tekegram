const router = require('express').Router();
const {Comment} = require('../../models')

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({})
        res.json(commentData)
    } catch (err) {
        console.dir(err)
        res.status(500).json(err)

    }
})


router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.json(commentData)

    } catch (err) {
        console.dir(err)
        res.status(500).json(err)
    }

})

module.exports = router