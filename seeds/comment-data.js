const { Comment } = require("../models")


const tempComment=[
    {
        "user_id": 2,
        "post_id": 3,
        "text": "TEST COMMENT"
    }
]

const commentData = () => Comment.bulkCreate(tempComment)

module.exports = commentData