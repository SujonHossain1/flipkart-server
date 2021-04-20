const productRoutes = require('./product');
const userRoutes = require('./user');
const categoryRoutes = require('./category');

/**** Admin ****/
const adminRoutes = require('./admin/auth');

module.exports = (app) => {
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/categories', categoryRoutes);
};
