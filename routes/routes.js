const productRoutes = require('./product');
const userRoutes = require('./user');
const categoryRoutes = require('./category');
const cartRoutes = require('./cart');

/**** Admin ****/
const adminRoutes = require('./admin/auth');

module.exports = (app) => {
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/carts', cartRoutes);
};
