
const FavoriteRepository = require("../models/favorite/favoriteRepository")

const FavoriteService = {
    create: async (data) => {
        return await FavoriteRepository.create(data);
    },

    delete: async(product_id,user_id) => {
        return await FavoriteRepository.delete(product_id,user_id);
    },

    getAllByUser: async (user_id) => {
        return await FavoriteRepository.getAllByUser(user_id);
    },

    checkExist: async (data) => {
        return await FavoriteRepository.checkExist(data);
    }
    
}

module.exports = FavoriteService;