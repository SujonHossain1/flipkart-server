const productRoutes = require('./product');
const userRoutes = require('./user');

module.exports = (app) => {
	app.use('/api/products', productRoutes);
	app.use('/api/users/', userRoutes);
};
