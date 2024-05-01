const FavoriteService = require("../services/favoriteService");

const FavoriteController = {
    create: async (req,res) => {
        try {
            const product_id = req.params.product_id;
            const user_id = req.body.decode.id;
            if(!product_id) return res.status(400).json('missing data');
            // checkexist
            const data = {
                product_id: product_id,
                user_id: user_id
            }
            const checkExist = await FavoriteService.checkExist(data);
            if(checkExist) return res.status(409).json('duplicate data')

            const resultAdd = await FavoriteService.create(data);
            if(resultAdd) return res.status(200).json("successfully added");
            throw new Error('server error');
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },

    delete: async (req,res ) => {
        try {
            const product_id = req.params.product_id;
            const user_id = req.body.decode.id;

            if(!product_id) return res.status(400).json('missing data');
            const resultDelete = await FavoriteService.delete(product_id, user_id);
            if(resultDelete) return res.status(200).send('delete successfully');
            throw new Error('server error')
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    },

    getAllByUser: async(req,res) => {
        try {
            const user_id = req.body.decode.id;
            const result = await FavoriteService.getAllByUser(user_id);
            if(result) return res.status(200).json(result);
            throw new Error('server error')
        } catch (error) {
            console.log(error);
            return res.status(500).json(error)
        }
    }
}

module.exports = FavoriteController;