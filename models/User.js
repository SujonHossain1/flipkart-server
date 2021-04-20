const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            lowercase: true,
        },
        phone: {
            type: Number,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Password Must be 6 characters'],
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
);

authSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 11);
    }
    next();
});

authSchema.methods.getToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            type: this.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

const User = model('User', authSchema);
module.exports = User;
