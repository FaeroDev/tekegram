const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ all: true}]
    });

    const post = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render("homepage", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//1post
router.get('/post/:id', async (req, res) => {
  try {
    // console.dir(req.params.id)
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{all: true},
        User,
        {
          model: Comment,
          include:[User]
        }
      ]
    } )

    if (dbPostData) {
      const post = dbPostData.get({ plain: true})
      res.render('one-post', {post 
        , loggedIn: req.session.loggedIn
      })
      
    }else{res.status(404).json({message: 'Post-ID Not Found'}).end()}
  } catch (err) {
    console.dir(err)
    res.status(500).json(err)
  }
})


// // GET one picture
// router.get("/picture/:id", async (req, res) => {
//   try {
//     const dbPictureData = await Picture.findByPk(req.params.id, {
//       include: [
//         {
//           model: Phrase,
//           attributes: ["id", "upper_text", "lower_text", "picture_id"],
//         },
//       ],
//     });

//     const picture = dbPictureData.get({ plain: true });
//     res.render("picture", { picture,
//        loggedIn: req.session.loggedIn 
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// router.get("/phrase/:id", async (req, res) => {
//   try {
//     const dbPhraseData = await phrase.findbyFK(req.params.id);

//     const phrase = dbPhraseData.get({ plain: true });
//     res.render("phrase", { phrase });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Login route
router.get("/login", (req, res) => {
  res.render("login");
});

// dashboard
router.get('/dashboard', async (req, res) => {
  try{
    const dbPostData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ all: true}]
    })
    const post = dbPostData.map((post) => post.get({plain: true}))
    res.render('homepage', {post, loggedIn: req.session.loggedIn})
  }catch (err)
  {console.dir(err)
  res.redirect('login')}
})

module.exports = router;

