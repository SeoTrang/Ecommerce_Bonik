<template lang="">
    <div class="add-pd-component">
        <div class="box-add-pd">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-6">
                    <v-text-field v-model="fieldData.productName.value" label="Tên sản phẩm" variant="outlined"></v-text-field>
                </div>
                <div class="col-12 col-lg-6 col-xl-6">
                    <v-select
                        label="Chọn danh mục"
                        :items="categoriesData"
                        item-title="name"
                        item-value="id" 
                        v-model="fieldData.category.value"
                        variant="outlined"
                        
                        ></v-select>
                </div>

                <div class="col-12 col-lg-6 col-xl-6">
                    <v-select
                        label="Chọn nhãn hiệu"
                        :items="BrandsData"
                        v-model="fieldData.brand.value"
                        item-title="name"
                        item-value="id" 
                        variant="outlined"
                       
                        ></v-select>
                </div>
                <div class="col-12 col-lg-6 col-xl-6">
                    <v-text-field 
                        label="Giá bán" 
                        variant="outlined"
                        v-model="fieldData.price.value"
                        @input="validatePrice"
                        ></v-text-field>
                </div>
            </div>

            <div class="row ">
                <div class="col-12 col-lg-6 col-xl-6 mb-3">
                    <div class="title text-center">
                        Ảnh đại diện
                    </div>
                    <div class="box-upload-avatar mt-2">
                        <Avatar height="250px" :imageUrl="newProuctAvatarURL" :handleGetLinkImg="handleGetLinkImgAvatar"/>
                    </div>
                </div>

                <div class="col-12">
                    <div class="post mt-5">
                        <QuillEditorCumtom 
                        :handleGetContent1="handleGetContent1" 
                        :contentArticle = "article"
                        />
                    </div>

                </div>

            </div>

            <div class="row action-bottom mt-3">
                <div class="col-6 ">
                    <button class="btn btn-md btn-cancel w-100">
                        Hủy
                    </button>
                </div>
                <div class="col-6 ">
                    <button 
                    @click="handleUpdateProduct"
                    class="btn btn-md btn-add w-100">
                        Lưu lại
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, toRefs, watch } from 'vue';
import { defineProps } from 'vue';
import CategoryAPI from '../../../../services/NodeAPI/CategoryAPI';
import BrandAPI from '../../../../services/NodeAPI/BrandAPI';
import QuillEditorCumtom from '../../../../components/QuillEditorCumtom/QuillEditorCumtom.vue'
import Avatar from '../../../../components/Upload/Avatar.vue'
import ProductAPI from '../../../../services/NodeAPI/ProductAPI';
import { toast } from 'vue3-toastify';

const props = defineProps({	
    product : {
        type: Object, // Sử dụng kiểu dữ liệu Object để biểu diễn mọi loại dữ liệu
        required: false // Tùy chọn, nếu prop không bắt buộc
    }
})

const product = ref();


const notify = {
    success: (title) => {
        toast.success(title);
    },
    error: (title) => {
        toast.error(title);
    }
};

const fieldData = {
    category: ref(null),
    brand: ref(null),
    productName: ref(''),
    price: ref(''),
};




const categoriesData = ref([]);
const BrandsData = ref([]);
const newProuctAvatarURL = ref('');
const article = ref('');

// Sử dụng watch để theo dõi sự thay đổi của props.product
watch(() => props.product, (newVal, oldVal) => {
    console.log('Product prop has changed:', newVal);
    product.value = newVal;
    fieldData.productName.value = newVal.name;
    fieldData.brand.value = newVal.brand.id;
    fieldData.category.value = newVal.category.id;
    fieldData.price.value = newVal.price;
    newProuctAvatarURL.value = newVal.img_preview;
    article.value = newVal.description

});

// Sử dụng onMounted để thực hiện một hành động sau khi component được mounted
onMounted(() => {
    console.log('Product prop onMounted:', props.product);
});

const getCategories = async () => {
    try {
        const result = await CategoryAPI.GetAll();
        if (result) {
            categoriesData.value = result.map(item => ({ id: item.id, name: item.name }));
        }
    } catch (error) {
        console.log(error);
    }
};

const getBrands = async () => {
    try {
        const result = await BrandAPI.GetByCategory(fieldData.category.value);
        if (result) {
            BrandsData.value = result;
        }
    } catch (error) {
        console.log(error);
    }
};

const handleGetLinkImgAvatar = (url) => {
    if (url) newProuctAvatarURL.value = url;
};

const handleGetContent1 = (content) => {
    if (content) article.value = content;
};

const validatePrice = () => {
    fieldData.price.value = fieldData.price.value.replace(/[^\d-]/g, '');

    const dashIndex = fieldData.price.value.indexOf('-');
    if (dashIndex !== -1) {
        fieldData.price.value =
            fieldData.price.value.substring(0, dashIndex + 1) +
            fieldData.price.value.substring(dashIndex + 1).replace(/-/g, '');
    }
};

const handleUpdateProduct = async () => {
    const data = {
        name: fieldData.productName.value,
        img_preview: newProuctAvatarURL.value,
        description: article.value,
        brand_id: fieldData.brand.value,
        category_id: fieldData.category.value,
        price: fieldData.price.value
    };

    try {
        const result = await ProductAPI.Update(data,product.value.id);
        if (!result) {
            notify.error('Cập nhập thất bại 😔 !');
            return;
        }
        // localStorage.setItem("productId", result);
        // localStorage.setItem("categoryId", fieldData.category.value);
        notify.success('Cập nhập thành công 😊 !');
    } catch (error) {
        console.log(error);
        notify.error('Cập nhập thất bại 😔 !');
    }
};

onMounted(() => {
    getCategories();
});

watch(fieldData.category, (newVal, oldVal) => {
    if (!newVal) {
        return;
    }
    getBrands();
});
</script>

<style scoped>
    @import './UpdateProduct.css';
</style>