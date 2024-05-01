const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Variation = require('../Variation/Variation');
const User = require('../user/user');
const Product = require('../product/product');
const Favorite = sequelize.define('favorites',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

})



Favorite.belongsTo(Product,{
    foreignKey: 'product_id'
})


Favorite.belongsTo(User,{
    foreignKey: 'user_id'
})


User.hasMany(Favorite,{
    foreignKey: 'user_id'
})


// sequelize.sync().then(() => {
//     console.log('Favorites table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table Favorites : ', error);
// });


module.exports = Favorite;