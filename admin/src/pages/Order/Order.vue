<template lang="">
    <div class="order-page">
        <div class="content-page">
            <div class="title-top row align-items-center">
                <div class="left col-6">
                    <div class="title-page">
                        Đơn hàng
                    </div>
                    <div class="route mt-2">
                        <span><i class="fa-solid fa-house"></i> </span>
                        <span class="ms-2 me-2">/</span>
                        <span>Đơn hàng</span>
                    </div>
                </div>

                <div class="right col-6 text-end">
                    <router-link to="/add-product">
                        <button class="btn btn-md btn-dark">
                        <span><i class="fa-solid fa-plus"></i></span>
                        <span class="ms-1">Thêm mới</span>
                    </button>
                    </router-link>
                </div>
            </div>

            <div class="box-page mt-4">
                <!-- <div class="options-top">
                    <div class="row">
                        <div class="col-12 col-lg-5">
                           <div class="input-left row d-flex align-items-center">
                            <div class="col-12 col-lg-6 mb-3">
                                    <v-combobox
                                    v-model="selectStock"
                                    :items="itemsStock"
                                    label="Còn hàng"
                                    variant="underlined"
                                    multiple
                                    chips
                                    ></v-combobox>
                                </div>
                                <div class="col-12 col-lg-6 mb-3">
                                    <v-combobox
                                    v-model="selectPublic"
                                    :items="itemsPublic"
                                    label="Công khai"
                                    variant="underlined"
                                    multiple
                                    chips
                                    ></v-combobox>
                                </div>
                           </div>
                            
                        </div>

                        <div class="col-12 col-lg-7">
                            <div class="row">
                                <div class="input-searh col-9 col-md-10">
                                    <div class="box-search row align-items-center">
                                        <v-text-field 
                                            variant="underlined"
                                            label="Tìm kiếm..."
                                            append-inner-icon="mdi-magnify"
                                            ></v-text-field>
                                    </div>
                                </div>
                                <div class="action col-3 col-md-2">
                                    <div class="d-flex h-100 align-items-center justify-content-center">
                                        <div class="box-menu">
                                            <i class="fa-solid  fa-ellipsis-vertical"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- <div class="results mt-4">
                    <div class="title">
                        <b>7</b>
                        <span class="ms-2">kết quả được tìm thấy</span>
                    </div>

                    <div class="filter mt-3 d-flex flex-wrap align-items-center">
                        <div class="filter-box filer-stock d-flex mb-2 me-2">
                            <div class="text">
                                Tình trạng :
                            </div>
                            <div class="ms-2 filter-value d-flex flex-wrap">
                                <div class="value me-2">
                                    Còn hàng
                                </div>
                                <div class="value me-2">
                                    Hết hàng
                                </div>
                            </div>
                        </div>
                        <div class="filter-box filter-public d-flex mb-2 me-2">
                            <div class="text">
                                Trạng thái :
                            </div>
                            <div class="ms-2 filter-value d-flex flex-wrap">
                                <div class="value me-2">
                                    Còn hàng
                                </div>
                                <div class="value me-2">
                                    Hết hàng
                                </div>
                            </div>
                        </div>

                        <div class="clear-filter mb-2">
                            <i class="fa-solid fa-trash"></i>
                            <span class="ms-2">Xóa bộ lọc</span>
                        </div>
                    </div>

                </div> -->
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane key="1">

                        <template #tab>
                            <div class="tab-title tab-all">
                            
                                Tất cả
                                <span class='ms-1'>{{Orders.length}}</span>
                            </div>
                        </template>
                        <div class="container-table-order">
                            <div class="min-width-960">

                                <div class="table-product mt-4">
                                    <table class="table  table-borderless table-hover table-xxl">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Khách hàng</th>
                                                    <th scope="col">Mã</th>
                                                    <th scope="col">Giá </th>
                                                    <th scope="col">Thời gian đặt</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody  class="table-group-divider">
                                                <tr v-for="(item, index) in Orders" :key="index" @click="handleForwardDetail(item.id)">
                                                    <td>
                                                        <input type="checkbox">
                                                    </td>
                                                    <td>
                                                        <div class="customer">
                                                            <div class="img d-flex align-items-center ">
                                                                <img :src="VITE_API_URL+item.user.avatar" alt="">
                                                            </div>
                                                            <div class="customer-name mt-1">
                                                                {{item.customer_name}}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="code">
                                                            {{item.code}}
                                                        </div>
                                                    </td>
                                                    
                                                    <td>
                                                        <div class="price">
                                                            {{formatCurrencyVND(item.total_price)}}₫
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="createAt">
                                                           21:27 11/12/2023
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="state">
                                                            <div v-if="item.state === 1" class="pedding">Chờ</div>
                                                            <div v-else-if="item.state === 2" class="delivering">Đang giao</div>
                                                            <div v-else-if="item.state === 3" class="completed">Đã giao</div>
                                                            <div v-else-if="item.state === 0" class="cancelled">Đã hủy</div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div class="address">
                                                            Thái nguyên
                                                            
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="action">
                                                            <v-menu>
                                                                <template v-slot:activator="{ props }">
                                                                    
                                                                    <button
                                                                    v-bind="props">
                                                                        <i class="fa-solid fa-ellipsis-vertical pe-2 ps-2"></i>
                                                                    </button>
                                                                </template>
                                                                <v-list class="list-action-category">
                                                                    <v-list-item
                                                                    >
                                                                        <v-list-item-title>
                                                                            <router-link to="/brand">
                                                                                <div class="view action">
                                                                                    <i class="fa-solid fa-eye"></i>
                                                                                    <span class="ms-3">Xem</span>
                                                                                </div>
                                                                            </router-link>
                                                                        </v-list-item-title>
                                                                    </v-list-item>
                                                                    <v-list-item
                                                                    >
                                                                        <v-list-item-title>
                                                                            <div class="edit action">
                                                                                <i class="fa-solid fa-pen-to-square"></i>
                                                                                <span class="ms-3">Sửa</span>
                                                                            </div>
                                                                        </v-list-item-title>
                                                                    </v-list-item>
                                                                    <v-list-item
                                                                    >
                                                                        <v-list-item-title>
                                                                            <div class="delete action" @click="showModalDelete">
                                                                                <i class="fa-solid fa-trash"></i>
                                                                                <span class="ms-3">Xóa</span>
                                                                            </div>
                                                                            
                                                                        </v-list-item-title>
                                                                    </v-list-item>
                                                                </v-list>
                                                                </v-menu>
                                                        </div>
                                                    
                                                    </td>

                                                </tr>
                                                
                                                



                                            
                                                
                                            
                                            </tbody>
                                        </table>
                                </div>
                                </div>

                            <div class="mt-1">
                                <div class="pagination mt-3 d-flex align-items-center justify-content-center">
                                    <a-pagination 
                                    v-model:current="currentPage" 
                                    @change="changePage"
                                    :total="500" />
                                </div>
                            </div>
                        </div>

                    </a-tab-pane>
                    <a-tab-pane key="2" force-render>

                        <template #tab>
                            <div class="tab-title tab-pedding">
                            
                                Chờ
                                <span class='ms-1'>{{
                                    Orders.reduce((count, item) => (item.state === 1 ? count + 1 : count), 0)
                                }}</span>
                            </div>
                        </template>
                        
                        <div class="container-table-order">
                            <div class="min-width-960">

                                <div class="table-product mt-4">
                                    <table class="table  table-borderless table-hover table-xxl">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Khách hàng</th>
                                                    <th scope="col">Mã</th>
                                                    <th scope="col">Giá </th>
                                                    <th scope="col">Thời gian đặt</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody  class="table-group-divider">
                                                <tr v-for="(item, index) in Orders" :key="index" @click="handleForwardDetail(item.id)">
                                                    <template v-if="item.state == 1">
                                                        <td>
                                                            <input type="checkbox">
                                                        </td>
                                                        <td>
                                                            <div class="customer">
                                                                <div class="img d-flex align-items-center ">
                                                                    <img :src="VITE_API_URL+item.user.avatar" alt="">
                                                                </div>
                                                                <div class="customer-name mt-1">
                                                                    {{item.customer_name}}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="code">
                                                                {{item.code}}
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <div class="price">
                                                                {{formatCurrencyVND(item.total_price)}}₫
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="createAt">
                                                               21:27 11/12/2023
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="state">
                                                                <div class="pedding">
                                                                    Chờ
                                                                </div>
                                                            </div>
                                                        </td>
    
                                                        <td>
                                                            <div class="address">
                                                                Thái nguyên
                                                                
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="action">
                                                                <v-menu>
                                                                    <template v-slot:activator="{ props }">
                                                                        
                                                                        <button
                                                                        v-bind="props">
                                                                            <i class="fa-solid fa-ellipsis-vertical pe-2 ps-2"></i>
                                                                        </button>
                                                                    </template>
                                                                    <v-list class="list-action-category">
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <router-link to="/brand">
                                                                                    <div class="view action">
                                                                                        <i class="fa-solid fa-eye"></i>
                                                                                        <span class="ms-3">Xem</span>
                                                                                    </div>
                                                                                </router-link>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="edit action">
                                                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                                                    <span class="ms-3">Sửa</span>
                                                                                </div>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="delete action" @click="showModalDelete">
                                                                                    <i class="fa-solid fa-trash"></i>
                                                                                    <span class="ms-3">Xóa</span>
                                                                                </div>
                                                                                
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                    </v-list>
                                                                    </v-menu>
                                                            </div>
                                                        
                                                        </td>
                                                    </template>

                                                </tr>
                                                
                                                



                                            
                                                
                                            
                                            </tbody>
                                        </table>
                                </div>
                                </div>

                            <div class="mt-1">
                                <div class="pagination mt-3 d-flex align-items-center justify-content-center">
                                    <a-pagination 
                                    v-model:current="currentPage" 
                                    @change="changePage"
                                    :total="500" />
                                </div>
                            </div>
                        </div>

                    </a-tab-pane>
                    <a-tab-pane key="3" >
                        <template #tab>
                            <div class="tab-title tab-shiping">
                            
                                Đang giao
                                <span class='ms-1'>{{
                                    Orders.reduce((count, item) => (item.state === 2 ? count + 1 : count), 0)
                                }}</span>
                            </div>
                        </template>
                        
                        <div class="container-table-order">
                            <div class="min-width-960">

                                <div class="table-product mt-4">
                                    <table class="table  table-borderless table-hover table-xxl">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Khách hàng</th>
                                                    <th scope="col">Mã</th>
                                                    <th scope="col">Giá </th>
                                                    <th scope="col">Thời gian đặt</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody  class="table-group-divider">
                                                <tr v-for="(item, index) in Orders" :key="index" @click="handleForwardDetail(item.id)">
                                                    <template v-if="item.state == 2">
                                                        <td>
                                                            <input type="checkbox">
                                                        </td>
                                                        <td>
                                                            <div class="customer">
                                                                <div class="img d-flex align-items-center ">
                                                                    <img :src="VITE_API_URL+item.user.avatar" alt="">
                                                                </div>
                                                                <div class="customer-name mt-1">
                                                                    {{item.customer_name}}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="code">
                                                                {{item.code}}
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <div class="price">
                                                                {{formatCurrencyVND(item.total_price)}}₫
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="createAt">
                                                               21:27 11/12/2023
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="state">
                                                                <div class="delivering">
                                                                    Đang giao
                                                                </div>
                                                            </div>
                                                        </td>
    
                                                        <td>
                                                            <div class="address">
                                                                Thái nguyên
                                                                
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="action">
                                                                <v-menu>
                                                                    <template v-slot:activator="{ props }">
                                                                        
                                                                        <button
                                                                        v-bind="props">
                                                                            <i class="fa-solid fa-ellipsis-vertical pe-2 ps-2"></i>
                                                                        </button>
                                                                    </template>
                                                                    <v-list class="list-action-category">
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <router-link to="/brand">
                                                                                    <div class="view action">
                                                                                        <i class="fa-solid fa-eye"></i>
                                                                                        <span class="ms-3">Xem</span>
                                                                                    </div>
                                                                                </router-link>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="edit action">
                                                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                                                    <span class="ms-3">Sửa</span>
                                                                                </div>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="delete action" @click="showModalDelete">
                                                                                    <i class="fa-solid fa-trash"></i>
                                                                                    <span class="ms-3">Xóa</span>
                                                                                </div>
                                                                                
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                    </v-list>
                                                                    </v-menu>
                                                            </div>
                                                        
                                                        </td>
                                                    </template>

                                                </tr>
                                                
                                                



                                            
                                                
                                            
                                            </tbody>
                                        </table>
                                </div>
                                </div>

                            <div class="mt-1">
                                <div class="pagination mt-3 d-flex align-items-center justify-content-center">
                                    <a-pagination 
                                    v-model:current="currentPage" 
                                    @change="changePage"
                                    :total="500" />
                                </div>
                            </div>
                        </div>
                        
                    </a-tab-pane>
                    <a-tab-pane key="4">
                        <template #tab>
                            <div class="tab-title tab-shipped">
                            
                                Đã giao
                                <span class='ms-1'>{{
                                    Orders.reduce((count, item) => (item.state === 3 ? count + 1 : count), 0)
                                }}</span>
                            </div>
                        </template>
                       
                        <div class="container-table-order">
                            <div class="min-width-960">

                                <div class="table-product mt-4">
                                    <table class="table  table-borderless table-hover table-xxl">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Khách hàng</th>
                                                    <th scope="col">Mã</th>
                                                    <th scope="col">Giá </th>
                                                    <th scope="col">Thời gian đặt</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody  class="table-group-divider">
                                                <tr v-for="(item, index) in Orders" :key="index" @click="handleForwardDetail(item.id)">
                                                    <template v-if="item.state == 3">
                                                        <td>
                                                            <input type="checkbox">
                                                        </td>
                                                        <td>
                                                            <div class="customer">
                                                                <div class="img d-flex align-items-center ">
                                                                    <img :src="VITE_API_URL+item.user.avatar" alt="">
                                                                </div>
                                                                <div class="customer-name mt-1">
                                                                    {{item.customer_name}}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="code">
                                                                {{item.code}}
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <div class="price">
                                                                {{formatCurrencyVND(item.total_price)}}₫
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="createAt">
                                                               21:27 11/12/2023
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="state">
                                                                <div class="completed">
                                                                    Đã giao
                                                                </div>
                                                            </div>
                                                        </td>
    
                                                        <td>
                                                            <div class="address">
                                                                Thái nguyên
                                                                
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="action">
                                                                <v-menu>
                                                                    <template v-slot:activator="{ props }">
                                                                        
                                                                        <button
                                                                        v-bind="props">
                                                                            <i class="fa-solid fa-ellipsis-vertical pe-2 ps-2"></i>
                                                                        </button>
                                                                    </template>
                                                                    <v-list class="list-action-category">
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <router-link to="/brand">
                                                                                    <div class="view action">
                                                                                        <i class="fa-solid fa-eye"></i>
                                                                                        <span class="ms-3">Xem</span>
                                                                                    </div>
                                                                                </router-link>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="edit action">
                                                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                                                    <span class="ms-3">Sửa</span>
                                                                                </div>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="delete action" @click="showModalDelete">
                                                                                    <i class="fa-solid fa-trash"></i>
                                                                                    <span class="ms-3">Xóa</span>
                                                                                </div>
                                                                                
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                    </v-list>
                                                                    </v-menu>
                                                            </div>
                                                        
                                                        </td>
                                                    </template>

                                                </tr>
                                                
                                                



                                            
                                                
                                            
                                            </tbody>
                                        </table>
                                </div>
                                </div>

                            <div class="mt-1">
                                <div class="pagination mt-3 d-flex align-items-center justify-content-center">
                                    <a-pagination 
                                    v-model:current="currentPage" 
                                    @change="changePage"
                                    :total="500" />
                                </div>
                            </div>
                        </div>

                    </a-tab-pane>
                    <a-tab-pane key="5">
                        <template #tab>
                            <div class="tab-title tab-canceled">
                            
                                Đã hủy
                                <span class='ms-1'>{{
                                    Orders.reduce((count, item) => (item.state === 0 ? count + 1 : count), 0)
                                }}</span>
                            </div>
                        </template>
                        
                        <div class="container-table-order">
                            <div class="min-width-960">

                                <div class="table-product mt-4">
                                    <table class="table  table-borderless table-hover table-xxl">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Khách hàng</th>
                                                    <th scope="col">Mã</th>
                                                    <th scope="col">Giá </th>
                                                    <th scope="col">Thời gian đặt</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Địa chỉ</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody  class="table-group-divider">
                                                <tr v-for="(item, index) in Orders" :key="index" @click="handleForwardDetail(item.id)">
                                                    <template v-if="item.state == 1">
                                                        <td>
                                                            <input type="checkbox">
                                                        </td>
                                                        <td>
                                                            <div class="customer">
                                                                <div class="img d-flex align-items-center ">
                                                                    <img :src="VITE_API_URL+item.user.avatar" alt="">
                                                                </div>
                                                                <div class="customer-name mt-1">
                                                                    {{item.customer_name}}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="code">
                                                                {{item.code}}
                                                            </div>
                                                        </td>
                                                        
                                                        <td>
                                                            <div class="price">
                                                                {{formatCurrencyVND(item.total_price)}}₫
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="createAt">
                                                               21:27 11/12/2023
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="state">
                                                                <div class="cancelled">
                                                                    Đã hủy
                                                                </div>
                                                            </div>
                                                        </td>
    
                                                        <td>
                                                            <div class="address">
                                                                Thái nguyên
                                                                
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div class="action">
                                                                <v-menu>
                                                                    <template v-slot:activator="{ props }">
                                                                        
                                                                        <button
                                                                        v-bind="props">
                                                                            <i class="fa-solid fa-ellipsis-vertical pe-2 ps-2"></i>
                                                                        </button>
                                                                    </template>
                                                                    <v-list class="list-action-category">
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <router-link to="/brand">
                                                                                    <div class="view action">
                                                                                        <i class="fa-solid fa-eye"></i>
                                                                                        <span class="ms-3">Xem</span>
                                                                                    </div>
                                                                                </router-link>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="edit action">
                                                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                                                    <span class="ms-3">Sửa</span>
                                                                                </div>
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                        <v-list-item
                                                                        >
                                                                            <v-list-item-title>
                                                                                <div class="delete action" @click="showModalDelete">
                                                                                    <i class="fa-solid fa-trash"></i>
                                                                                    <span class="ms-3">Xóa</span>
                                                                                </div>
                                                                                
                                                                            </v-list-item-title>
                                                                        </v-list-item>
                                                                    </v-list>
                                                                    </v-menu>
                                                            </div>
                                                        
                                                        </td>
                                                    </template>

                                                </tr>
                                                
                                                



                                            
                                                
                                            
                                            </tbody>
                                        </table>
                                </div>
                                </div>

                            <div class="mt-1">
                                <div class="pagination mt-3 d-flex align-items-center justify-content-center">
                                    <a-pagination 
                                    v-model:current="currentPage" 
                                    @change="changePage"
                                    :total="500" />
                                </div>
                            </div>
                        </div>

                    </a-tab-pane>
                </a-tabs>
               

                

                
            </div>



        </div>
    </div>


    <!-- modal -->
    <!-- modal delete -->
    <a-modal
      v-model:open="openModelDelete"
      title="Xác nhận xóa?"
      okText="Xóa"
      cancelText="Hủy"
      okType= 'danger'
      @ok="handleDeleteOk"

    >
      <p>Bạn chắc chắn muốn xóa danh mục sản phẩm ?</p>
    </a-modal>

   
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from 'vue-router';
import OrderAPI from '../../services/NodeAPI/OrderAPI'
import formatCurrencyVND from '../../util/formatCurrencyVND.js'

const VITE_API_URL = import.meta.env.VITE_API_URL
const currentPage = ref(6)
const selectStock = ref([])
const selectPublic = ref([])
const openModelDelete = ref(false)
const activeKey = ref('1')
const Orders = ref([])
const route = useRoute();
const router = useRouter();

const changePage = (page, pageSize) => {
    console.log(page)
    console.log(pageSize)
}

const notify = (title) => {
    toast.success(title)
}

const showModalDelete = () => {
    openModelDelete.value = true
}

const handleDeleteOk = (e) => {
    console.log(e)
    openModelDelete.value = false
    return notify("Thêm thành công !")
}

const handleForwardDetail = (id) => {
    console.log(id)
    router.push('/order-detail/' + id);
}

onMounted(() => {
    let ordersTemp = OrderAPI.getAll()
    ordersTemp
        .then(data => Orders.value = data)
        .catch(err => console.log(err))
})

watch(Orders, (newVal, oldVal) => {
    console.log(Orders.value)
})
</script>

<style >
    @import './Order.css';
</style>