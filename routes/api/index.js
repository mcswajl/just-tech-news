const router = require('express').Router();
const categoryRoutes = require('./Category-routes');
const productRoutes = require('./Product-routes');
const tagRoutes = require('./Tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
