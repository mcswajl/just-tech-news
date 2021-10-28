const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
// Post http://localhost:3001/api/products1
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;