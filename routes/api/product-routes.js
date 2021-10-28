const router = require('express').Router();
const { product, category, tag, productTag } = require('../../models');
const Sequelize = require('../../config/connection')

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated category and tag data
  product.findAll({
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id',
      [Sequelize.literal('(SELECT COUNT(*) FROM product WHERE product.id = category.category_id)'), 'product_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id', 'created_at'],
        include: {
          model: category,
          attributes: ['category_name:']
        }
      },
      {
        model: product,
        attributes: ['product_name:']
      }
    ]
  })
    .then(dbpostData => res.json(dbcategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated category and tag data
  product.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'product_name',
      'price',
      'stock',
      'category_id',
      [sequelize.literal('(SELECT COUNT(*) FROM category WHERE product.id = category.product_id)'), 'category_count']
    ],
    include: [
      {
        model: product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id', 'created_at'],
        include: {
          model: category,
          attributes: ['category_name']
        }
      },
      {
        model: product,
        attributes: ['product_name']
      }
    ]
  })
    .then(dbproductData => {
      if (!dbproductData) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(dbproductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    Comment.create({
      product_name: req.body.product_name,
      price : req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
    })

  product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the productTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return productTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from productTag
      return productTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newproductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        productTag.destroy({ where: { id: productTagsToRemove } }),
        productTag.bulkCreate(newproductTags),
      ]);
    })
    .then((updatedproductTags) => res.json(updatedproductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  product.destroy ({
    where: {id: req.params.id}
  })
  .then(dbproductDate => {
    if (!dbproductDate) {
    res.status(404).json({message: "No product found with this ID!"});
  return;
  }
  res.json(dbproductDate);
})
.catch(err => {
  console.log(err);
  res.status(505).json(err);
  })
});

module.exports = router;
