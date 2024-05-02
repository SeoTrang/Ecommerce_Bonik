<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import OrderAPI from "../../../services/NodeAPI/OrderAPI";
import formatCurrencyVND from "../../../util/formatCurrencyVND.js";
import { toast } from "vue3-toastify";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const orderId = ref("");
const route = useRoute();
let order = ref(null);
const dialog = ref(false);

async function getProduct() {
  let product = await OrderAPI.getByOrderId(orderId.value);
  order.value = product;
}



onMounted(() => {
  orderId.value = route.params.order_id;
  console.log(orderId.value);
  if (orderId.value) {
    let ordersTemp = OrderAPI.getByOrderId(orderId.value);
    ordersTemp
      .then((data) => {
        console.log(data);
        order.value = data;
      })
      .catch((err) => console.log(err));
  }
});



const updateOrderToShiping = async () => {
  let result = await OrderAPI.updateOrderStatus(orderId.value,2);

  if(result) {
    getProduct();
    return toast.success('Cập nhật đơn hàng thành công!');
  }
}
// const updateOrderToSuccess = async () => await OrderAPI.updateOrderStatus(orderId.value,3);
const updateOrderToCanceled = async () => {
  let result = await OrderAPI.updateOrderStatus(orderId.value,0);
  if(result) {
    getProduct();
    return toast.success('Cập nhật đơn hàng thành công!');
  }
}

const handleOpenDialog = () => {
  return dialog.value = true;
}
const handleCloseDialog = () => {
  return dialog.value = false;

}

const handleOkCanceledOrder = () => {
  updateOrderToCanceled();
  handleCloseDialog();
}
</script>
<style>
    @import './OrderDetail.css';
</style>
<template>
  <div id="order-detail" class="order order-detail">
    <div class="content-page">
      <div class="title-top row align-items-center">
        <div class="left col-6">
          <div class="title-page">Sản phẩm</div>
          <div class="route mt-2">
            <span><i class="fa-solid fa-house"></i> </span>
            <span class="ms-2 me-2">/</span>
            <span>Sản phẩm</span>
          </div>
        </div>

        <div class="right col-6 text-end">
          <router-link to="/order">
            <button class="btn btn-md btn-dark">
              <span><i class="fa-solid fa-arrow-left"></i></span>
              <span class="ms-1">Quay lại</span>
            </button>
          </router-link>
        </div>
      </div>

      <div v-if="order" class="content-order-detail mt-3">
        <div class="section-infor-top">
          <div class="row">
            <div class="col-12 col-md-4 mb-2">
              <div class="d-flex">
                <div class="text-title main-blur-color">Mã đơn hàng:</div>
                <div class="text-value ms-1">Y6CFCCJSQXXU</div>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-2">
              <div class="d-flex">
                <div class="text-title main-blur-color">Thời gian đặt:</div>
                <div class="text-value ms-1">11:21 18/04/2024</div>
              </div>
            </div>
            <div class="col-12 col-md-4 mb-2">
                <div class="d-flex mb-3">
            <div class="title">
            Trạng thái:
            </div>
            <div v-if="order">
            <div v-if="order.state === 1" class="value ms-1 pedding">
                <span class="status">Chờ</span>
            </div>
            <div v-else-if="order.state === 2" class="value ms-1 delivering">
                <span class="status">Đang giao</span>
            </div>
            <div v-else-if="order.state === 3" class="value ms-1 completed">
                <span class="status">Đã giao</span>
            </div>
            <div v-else-if="order.state === 0" class="value ms-1 cancelled">
                <span class="status">Đã hủy</span>
            </div>
            </div>
        </div>
            </div>
          </div>
        </div>

        <div class="box-products">
          <div class="table-responsive-md">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ảnh</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in order.orderdetails" :key="index">
                  <th scope="row">{{ index+1 }}</th>
                  <td>
                    <div class="tr-img">
                      <img :src="VITE_API_URL+item.avatar" alt="" />
                    </div>
                  </td>
                  <td>
                    <div class="tr-name">{{ item.name }}</div>
                  </td>
                  <td>
                    <div class="tr-quantity">x {{ item.quantity }}</div>
                  </td>
                  <td>
                    <div class="tr-price">
                      {{ formatCurrencyVND(item.price * item.quantity) }}₫
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="box-info-customer">
            <div class="row">
              <div class="box-price col-12 col-md-6">
                <div class="item row">
                  <div class="col-6 text-title">Tạm tính :</div>
                  <div class="text-value col-6">
                    {{ order ? formatCurrencyVND(order.subtotal_price) : "" }}₫
                  </div>
                </div>
                <div class="item row">
                  <div class="col-6 text-title">Phí vận chuyển :</div>
                  <div class="text-value col-6">---</div>
                </div>
                <div class="item row">
                  <div class="col-6 text-title">Giả giá :</div>
                  <div class="text-value col-6">---</div>
                </div>
                <hr />
                <div class="item row">
                  <h5 class="col-6 text-title">Tổng :</h5>
                  <h5 class="text-value col-6">
                    {{ order ? formatCurrencyVND(order.total_price) : "" }}₫
                  </h5>
                </div>
              </div>
              <div class="box-address col-12 col-md-6">
                <div class="address">
                  <div class="item row">
                    <div class="text col-4 -title">Người nhận :</div>
                    <div class="text-value col-8">
                      {{ order?.customer_name }}
                    </div>
                  </div>
                  <div class="item row">
                    <div class="text col-4 -title">Số điện thoại :</div>
                    <div class="text-value col-8">
                      {{ order?.phone_number }}
                    </div>
                  </div>
                  <div class="item row">
                    <div class="text col-4 -title">Địa chỉ :</div>
                    <div class="text-value col-8">{{ order?.address }}</div>
                  </div>
                  <div class="item row">
                    <div class="text col-4 -title">Ghi chú :</div>
                    <div class="text-value col-8">{{ order?.note }}</div>
                  </div>
                </div>
                <div class="action mt-3">
                  <div class="">
                    <template v-if="order.state == 1">
                        <div
                          class="btn btn-md w-100 btn-cancel"
                          @click="handleOpenDialog()"
                        >
                          Hủy
                        </div>
                        <div
                          class="btn btn-md w-100 btn-confirm mt-3"
                          @click="updateOrderToShiping()"
                        >
                          Xác nhận
                        </div>
                    </template>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>

  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      
      <v-card>
        <v-card-title class="text-h5">
          Thông báo ⚠️
        </v-card-title>
        <v-card-text>
          Bạn chắc chắn muốn hủy đơn hàng?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="handleCloseDialog()"
          >
            Không
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="handleOkCanceledOrder()"
          >
            Có
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
