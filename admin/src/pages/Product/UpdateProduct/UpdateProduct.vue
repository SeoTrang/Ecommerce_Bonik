<template lang="">
    <div class="content-page">
        <div class="title-top row align-items-center">
                <div class="left col-7">
                    <div class="title-page">
                        Thêm sản phẩm
                    </div>
                    <div class="route mt-2">
                        <span><i class="fa-solid fa-house"></i> </span>
                        <span class="ms-2 me-2">/</span>
                        <span>Thêm sản phẩm</span>
                    </div>
                </div>
                <div class="right col-5 text-end">
                    <router-link to="/product">
                        <button class="btn btn-md btn-dark">
                        <span><i class="fa-solid fa-arrow-left"></i></span>
                        <span class="ms-1">Quay lại</span>
                    </button>
                    </router-link>
                </div>
        </div>
        <div class="box-page-1 mt-4">
            <div class="content-form">
                <a-tabs
                    v-model:activeKey="activeKey"
                    :tab-position="'left'"
                    :style="{ height: '100%' }"
                    @tabScroll="callback"
                    >
                    <!-- <a-tab-pane v-for="i in 5" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</a-tab-pane> -->
                    <a-tab-pane :key="1" :tab="'Sản phẩm'">
                        <UpdateProduct :product="productUpdate" />
                    </a-tab-pane>
                    <a-tab-pane :key="2" :tab="'Option'" >
                        <Option />
                    </a-tab-pane>
                    <a-tab-pane :key="3" :tab="'Biến thể'" >
                        <Variation/>
                    </a-tab-pane>
                    <a-tab-pane :key="4" :tab="'Thuộc tính'" >
                        <Attribute/>
                    </a-tab-pane>
                    
                </a-tabs>
            </div>

            
            
        </div>
    </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from "vue-router";
import UpdateProduct from './Product/UpdateProduct.vue';
import Option from './Option/Option.vue';
import Variation from './Variaction/Variation.vue';
import Attribute from './Attribute/Attribute.vue';
import ProductAPI from '../../../services/NodeAPI/ProductAPI';

const route = useRoute();

const activeKey = ref(1);
const productUpdate = ref();
const product_id = ref(null);
onMounted(() => {
    product_id.value = route.params.product_id;
    if (product_id.value) {
    let product = ProductAPI.getProductById(product_id.value);
    product
      .then((data) => {
        console.log(data);
        productUpdate.value = data;
      })
      .catch((err) => console.log(err));
  }
})
</script>
<style lang="">
    
</style>