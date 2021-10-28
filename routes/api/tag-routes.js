const router = require('express').Router();
const { tag, product, productTag } = require('../../models');
const Sequelize = require('../../config/connection')

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  tag.findAll({
    attributes: [
      'tag_id',
      'tag_name',
      [Sequelize.literal('(SELECT COUNT(*) FROM productTag WHERE productTag.id = tag.tag_id)'), 'tag_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id', 'created_at'],
        include: {
          model: productTag,
          attributes: ['product_id:']
        }
      },
      {
        model: product,
        attributes: ['product_name:']
      }
    ]
  })
    .then(dbPostData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'tag_id',
      'tag_name',
      [sequelize.literal('(SELECT COUNT(*) FROM productTag WHERE product.id = producTag.product_id)'), 'tag_count']
    ],
    include: [
      {
        model: productTag,
        attributes: ['id', 'product_id', 'created_at'],
        include: {
          model: tag,
          attributes: ['tag_name']
        }
      },
      {
        model: tag,
        attributes: ['tag_name']
      }
    ]
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  tag.create ({
    tag_id: req.body.tag_id,
    tad_name: req.body.taf_name,
  })
  .then(dbtagData => res.json(dbtagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  tag.update ({
    tag_id: req.body.tag_id
  },
  {where: {id: req.params.id}
  }
    )
  .then(dbtagData => {
  if (!dbtagData) {
    res.status(404).json({ message: 'No tag found with this id' });
          return;
        }
        res.json(dbtagData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  tag.destroy ({
    where: {id: req.params.id}
  })
  .then(dbtagDate => {
    if (!dbtagDate) {
    res.status(404).json({message: "No tag found with this ID!"});
  return;
  }
  res.json(dbtagDate);
})
.catch(err => {
  console.log(err);
  res.status(505).json(err);
  })
});

module.exports = router;