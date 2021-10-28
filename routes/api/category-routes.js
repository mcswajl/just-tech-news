const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');
const Sequelize = require('../../config/connection')

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [ Product ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => [
      consol.log(err),
      res.status(500).json(err),
    ]);
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    }
    })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.post('/', (req, res) => {
  // create a new category
  Category.create ({
    category_id: req.body.category_id,
    category_name: req.body.category_name,
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update ({
  category_id: req.body.category_id
},
{where: {id: req.params.id}
}
  )
.then(dbCategoryData => {
if (!dbCategoryData) {
  res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy ({
    where: {id: req.params.id}
  })
  .then(dbCategoryDate => {
    if (!dbCategoryDate) {
    res.status(404).json({message: "No category found with this ID!"});
  return;
  }
  res.json(dbCategoryDate);
})
.catch(err => {
  console.log(err);
  res.status(505).json(err);
  })
});

module.exports = router;
