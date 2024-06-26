import axios from '../../config/axiosBaseUrl/axios'

const ProductAPI = {
    GetAll: async () => {
        try {
            let result = false;
            await axios.get('/product')
            .then( res => {
                result = res.data;
            })
            .catch( err => {
                console.log(err);
            })
            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    GetByCategory: async (categoryId) => {
        try {
            if(!categoryId) return false;
            let result = false;
            await axios.get(`/get-attribute-by-category/${categoryId}`)
            .then( res => {
                result = res.data;
            })
            .catch( err => {
                console.log(err);
            })
            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    Create: async (data)=>{
        try {
            let result = null;
            console.log(data);
            await axios.post('/product',{data: data})
            .then(res => {
                console.log(res.data);
                result = res.data;
            })
            .catch (err => {
                console.log(err);
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },


    Update: async (data,product_id)=>{
        try {
            let result = null;
            console.log(data);
            await axios.put('/product/'+product_id,{data: data})
            .then(res => {
                console.log(res.data);
                result = res.data;
            })
            .catch (err => {
                console.log(err);
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getProductById: async (product_id) => {
        try {
            let result = null;
            await axios.get('/product/'+product_id)
            .then(res => {
                console.log(res.data);
                result = res.data;
            })
            .catch (err => {
                console.log(err);
            })

            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }
    
}

export default ProductAPI;