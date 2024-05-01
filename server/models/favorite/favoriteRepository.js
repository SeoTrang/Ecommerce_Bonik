const Product = require("../product/product");
const Favorite = require("./favorite");


const FavoriteRepository = {
    create: async (data) => {
        try {
            
            const result = await Favorite.create(data);
            if(result) return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    delete: async (product_id,user_id) => {
        try {
            const result = await Favorite.destroy({
                where:{
                    product_id: product_id,
                    user_id: user_id
                }
            })

            if(result) return true;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    checkExist: async (data) => {
        try {
            const {product_id, user_id} = data;
            const result = await Favorite.findOne({
                where:{
                    product_id: product_id,
                    user_id: user_id
                }
            })

            if(result) return true;
            return false;
        } catch (error) {
            console.log(error);
        }
    },

    getAllByUser: async (user_id) => {
        try {
            const result = await Favorite.findAll({
                where:{
                    user_id: user_id
                },
                include:[
                    {
                        model: Product
                    }
                ]
            })

            if(result) return result;
            return [];
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = FavoriteRepository;