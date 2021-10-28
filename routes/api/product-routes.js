const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const Sequelize = require('../../config/connection')

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated category and tag data
  Product.findAll({
    include: [ Category ]
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => [
      consol.log(err),
      res.status(500).json(err),
    ]);
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated category and tag data
  Product.findOne({
    where: {
      id: req.params.id
    }
    })
    .then(dbProductData => res.json(dbProductData))
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
    Product.create({
      product_name: req.body.product_name,
      price : req.body.price,
      stock: req.body.stock,
      tagIds: req.body.tagIds,
    })

  product.create(req.body)
    .then((Product) => {
      // if there's product tags, we need to create pairings to bulk create in the productTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_name: product.product_name,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(Product);
    })
    .then((productTagIds) => res.status(200).json(ProductTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
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
      const ProductTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newproductTags = req.body.tagIds
        .filter((tag_id) => !ProductTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_name: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newproductTags),
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
  Product.destroy ({
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
