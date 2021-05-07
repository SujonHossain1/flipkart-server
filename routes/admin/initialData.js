const router = require('express').Router();
const { initialData } = require('../../controllers/admin/initalData');

router.post('/get-initial-data', initialData);

module.exports = router;
