const OrderDetail = require("../orderDetail/OrderDetail");
const User = require("../user/user");
const Order = require("./Order");

const OrderRepository = {
    create: async (data) => {
        try {
            const result = await Order.create(data);
            if(result) return result.id;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getAllByUser: async(user_id) => {
        try {
            const result = await Order.findAll({
                where:{
                    user_id: user_id
                }
            });
            if(result) return result;
            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    getOneById: async(id) => {
        try {
            const result = await Order.findByPk(id,{
                include: OrderDetail
            })
            if(result) return result;
            return null;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    getAll: async () => {
        try {
            const result = await Order.findAll({
                include: User
            })
            if(result) return result;
            return null;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    updateOrderStatus: async(order_id,status)=> {
        try {
            const data = {
                state: status
            }
            const [updated] = await Order.update(data,{
                where: {
                    id: order_id
                }
            })
            if (updated === 1) {
                return true;
            } else {
                console.error('Không tìm thấy lỗi khi cập nhật.');
                throw new Error('Không tìm thấy lỗi khi cập nhật.');
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = OrderRepository;