const sequelize = require('../config/connection')
// const {User, Post, Comment} = require('../models')

const userData = require('./user-data')
const postData = require('./post-data')
const commentData = require('./comment-data')

const seedDB = async() => {
    await sequelize.sync({force: true})
    await userData()
    await postData()
    await commentData()

    // const users = await User.bulkCreate(userData, {
    //     individualHooks: true,
    //     returning: true
    // })



    // for(const post of postData){
    //     await Post.create({
    //         ...post,
    //         user_id: users[Math.floor(Math.random() * users.length)].id
    //     })
    
    process.exit(0)
}
seedDB()
