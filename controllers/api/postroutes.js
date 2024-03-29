const router = require('express').Router();
const {Post, User, Comment} = require('../../models')

router.post("/new", async (req, res) => {
  try {
    const newpostData = await Post.create({
      title:req.body.title,
      body:req.body.body,
      user_id: req.session.user_id
    })
    console.dir(newpostData)
    res.json(newpostData);
  }catch (err) {
    console.error(err);
    res.status(500).json(err);

  }
})



router.get('/', async (req, res) => {
  await Post.findAll({
    // attributes: ["id", "title", "body"],
    include: [
      {
        model: Comment,
        attributes: ["id", "text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
  .then((dbPostData) => {
    const post = dbPostData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      post,
      // loggedIn: req.session.loggedIn,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
    // try {
    //     const postData = await Post.findAll()
    //     res.status(200).json(postData)
    // } catch (err) {
    //     res.status(500).json(err)
    // }
})

router.get("/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ all: true }],
      });
      if (!postData) {
        res.status(404).json({ message: "No Post found with this id!" });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newpostData = await Post.create({
        title:req.body.title,
        body:req.body.body,
        user_id: req.session.user_id
      })
      console.dir(newpostData)
      res.json(newpostData);
    }catch (err) {
      console.error(err);
      res.status(500).json(err);

    }
  })


  router.delete("/:id", async (req, res) => {
    // delete one product by its `id` value
    try {
      const postData = await Post.destroy({
        where: { id: req.params.id },
      });
  
      if (!postData) {
        res.status(404).json({ message: "No Post found with this id!" });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//   // update product
//   router.put("/:id", (req, res) => {
//     // update product data
//     Product.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     })
//       .then((product) => {
//         // find all associated tags from ProductTag
//         return ProductTag.findAll({ where: { product_id: req.params.id } });
//       })
//       .then((productTags) => {
//         // get list of current tag_ids
//         const productTagIds = productTags.map(({ tag_id }) => tag_id);
//         // create filtered list of new tag_ids
//         const newProductTags = req.body.tagIds
//           .filter((tag_id) => !productTagIds.includes(tag_id))
//           .map((tag_id) => {
//             return {
//               product_id: req.params.id,
//               tag_id,
//             };
//           });
//         // figure out which ones to remove
//         const productTagsToRemove = productTags
//           .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//           .map(({ id }) => id);
  
//         // run both actions
//         return Promise.all([
//           ProductTag.destroy({ where: { id: productTagsToRemove } }),
//           ProductTag.bulkCreate(newProductTags),
//         ]);
//       })
//       .then((updatedProductTags) => res.json(updatedProductTags))
//       .catch((err) => {
//         // console.log(err);
//         res.status(400).json(err);
//       });
//   });
  
  router.delete("/:id", async (req, res) => {
    // delete one product by its `id` value
    try {
      const postData = await Post.destroy({
        where: { id: req.params.id },
      });
  
      if (!postData) {
        res.status(404).json({ message: "No Post found with this id!" });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router