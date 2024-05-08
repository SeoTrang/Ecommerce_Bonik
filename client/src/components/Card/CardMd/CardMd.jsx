import React, { useEffect, useRef } from 'react';

import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {Link, useLocation, useNavigate} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


import './CardMd.css';
import SlideImgProduct from '../../SlideImgProduct/SlideImgProduct';

import formatCurrencyVND from '../../../../util/formatCurrencyVND';
import ListImgAPI from '../../../service/NodejsServerAPI/ListImgAPI';
import ProductAPI from '../../../service/NodejsServerAPI/ProductAPI';
import OptionAPI from '../../../service/NodejsServerAPI/OptionAPI';
import formatCurrencyVNDMutiple from '../../../../util/formatCurrencyVNDMutiple';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAction, fetchWishlistData } from '../../../redux/actions/wishlistAction';
import { addToCart, fetchCartData } from '../../../redux/actions/cartAction';

const CardMd = ({item}) => {
    const dispatch = useDispatch();
    const {t,i18n} = useTranslation();
    const [product,setProduct] = useState();
    const [quantity,setQuantity] = useState(1);
    const navigate = useNavigate();

    const [option,setOption] = useState();
    const [variantion,setVariantion] = useState();
    useEffect(()=>{
        // console.log(item);
        if(item) setProduct(item)
        
    },[item])

    const minusQuantity = () =>{
        if(quantity <= 1){
            toast.error('Giá trị không được nhỏ hơn 1')
            return;
        }
        setQuantity(quantity-1)
    }

    const plusQuantity = () =>{
        setQuantity(quantity+1)
    }
   

    

    const [listImg,setListImg] = useState([]);
   
    const array =[1,2,3,4,5];

    const [show, setShow] = useState(false);

    const cardRef = useRef(null);
    let [optionActive,setOptionActive] = useState({})

    const handleClose = (e) => {
            setShow(false);
            

    }
    const handleShow = (e) => {
        console.log(e);
        e.stopPropagation();
        e.preventDefault(); // Ngăn chặn chuyển hướng mặc định
        setShow(true);
    }



    useEffect(()=>{
        // console.log(optionActive);
    },[optionActive])



    const [linkTo,setLinkTo] = useState(null);
    const [arrayParams,setArrayParams] = useState();
    const [objectParams,setObjectParams] = useState();

    

    const handleChangArrayParams = (type,value) => {
        console.log(type);
        console.log(value);
        // Sử dụng map để tạo một mảng mới với giá trị được cập nhật
        let tempParams = objectParams.map(item => {
            if (item.type === type) {
                return { ...item, value: value };
            }
            return item; // Trả về item nguyên vẹn nếu không phải là phần tử cần cập nhật
        });

        console.log(tempParams);
        setObjectParams(tempParams);

        if(!option) return;
        let optiontTemp = {};
        optiontTemp = {...optionActive}
        optiontTemp[type] = value;
        
        setOptionActive(optiontTemp);
    }

    useEffect(()=>{
        if(show == true){
            let product_id = product?.id;

            async function fetchData(product_id) {
                let result = await OptionAPI.getOptionByProduct(product_id);
                if(result){
                    // console.log(result);
                    return setOption(result);
                }
            }

            fetchData(product_id);

        }

        
    },[show,product])

    useEffect(()=>{
        // console.log(option);
        let paramActive = [];
        let optiontTemp = {};
        if(!option) return;
        option.forEach((item, index) => {
            console.log(item);
            paramActive.push({
                type: item.name,
                value: item.OptionValues[0].value
            })

            optiontTemp[item.name] = item.OptionValues[0].value;

          
        });
        // console.log(paramActive);
        // console.log(optionActive);
        // console.log(optionActive['Màu']);
        setOptionActive(optiontTemp);
        setObjectParams(paramActive);
    },[option])

    useEffect(()=> {
        // console.log(objectParams);
        let paramString = '';
        if(objectParams){
            objectParams.forEach((item,index) => {
                paramString += item.value;
                if (index < option.length - 1) {
                    paramString += ','; // Thêm dấu phẩy nếu không phải là phần tử cuối cùng
                }
            });
    
            setArrayParams(paramString);
        }
        
    },[objectParams])

    useEffect(()=>{
        async function fetchData(){
            // if(product && product.id){
                let result = await ProductAPI.GetDetail(product?.id,arrayParams);
                if(result) setVariantion(result);
            // }
            // return;
            

        }

        fetchData();
    },[arrayParams])

    useEffect(()=> {
        // console.log(variantion);
        if(variantion){
            async function fetchData() {
                let result = await ListImgAPI.GetByVariation(variantion[0].variation_id);
                if(result) setListImg(result);
                // console.log(result);
            }
            fetchData();
        }
    },[variantion])
  


    // add to wishlist
    const addToWishlist = async (e,product_id) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(product_id);
        const result = await dispatch(addToWishlistAction(product_id));
        if(result) toast.success('Đã thêm sản phẩm vào yêu thích')
        dispatch(fetchWishlistData());
    }

    const handleAddToCart = async() => {
        let data = {
            quantity: quantity,
            variation_id: variantion[0].variation_id
        }
        let result = await dispatch(addToCart(data));
        dispatch(fetchCartData());
        console.log(result);
        if(result) return toast.success('Đã thêm vào giỏ hàng');
    }

    const handleBuyNow = () => {
        console.log(variantion[0].variation_id);
        return navigate('/checkout?variantion=' + variantion[0].variation_id+'&quantity=' + quantity)
    }
    return (
        <>
            <RouterLink to={`/detail?id=${product && product.id}`} className=''>
        
            
        <div  className='cardMd mb-4 h-100'>
            <div className="img">
                {
                    product?
                    <img src={import.meta.env.VITE_API_URL+product.img_preview} alt="" />
                   
                    :
                    <img src="https://i.ibb.co/WVdTgR8/headphone-1.png" alt="" />
                }
            </div>
            <hr />
            <div className="des">
                <div className="category">
                    {
                        product?
                        product.category.name
                        :
                        'Headphones'
                    }
                </div>
                <div className="name">
                    <h6>
                        {
                            product?
                            product.name
                            :
                            'Tai nghe Bluetooth True Wireless AVA+ DS206'
                        }
                    </h6>
                </div>
                <div className="star d-flex flex-wrap mt-1">
                    <div className="number-star me-2">
                        {
                            array.map((value,index)=>{
                                return (
                                    <span><i class="fa-solid fa-star"></i></span>
                                )
                            })
                        }
                    </div>
                    <div className="number-rate">
                        (12 Review)
                    </div>
                </div>

                <div className="price mt-2  d-flex align-items-end flex-wrap">
                    <div className="price-current me-1">
                        {
                             product?
                             formatCurrencyVNDMutiple(product.price)
                            :
                            '120'
                        }
                        
                    </div>
                   
                </div>
            </div>

            <div className="actions d-none d-xl-block d-lg-block">
                 <div className=" action d-flex justify-content-end">
                    <div className="title d-flex align-items-center">
                        <div className="content">
                            View Cart
                        </div>
                        
                    </div>
                    <div className="icon">
                        <svg _ngcontent-ng-c2473316328="" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M3.93795 5.34749L4.54095 12.5195C4.58495 13.0715 5.03594 13.4855 5.58695 13.4855H5.59095H16.5019H16.5039C17.0249 13.4855 17.4699 13.0975 17.5439 12.5825L18.4939 6.02349C18.5159 5.86749 18.4769 5.71149 18.3819 5.58549C18.2879 5.45849 18.1499 5.37649 17.9939 5.35449C17.7849 5.36249 9.11195 5.35049 3.93795 5.34749ZM5.58495 14.9855C4.26795 14.9855 3.15295 13.9575 3.04595 12.6425L2.12995 1.74849L0.622945 1.48849C0.213945 1.41649 -0.0590549 1.02949 0.0109451 0.620487C0.082945 0.211487 0.477945 -0.054513 0.877945 0.00948704L2.95795 0.369487C3.29295 0.428487 3.54795 0.706487 3.57695 1.04649L3.81194 3.84749C18.0879 3.85349 18.1339 3.86049 18.2029 3.86849C18.7599 3.94949 19.2499 4.24049 19.5839 4.68849C19.9179 5.13549 20.0579 5.68649 19.9779 6.23849L19.0289 12.7965C18.8499 14.0445 17.7659 14.9855 16.5059 14.9855H16.5009H5.59295H5.58495Z" fill="currentColor"></path><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M14.8979 9.04382H12.1259C11.7109 9.04382 11.3759 8.70782 11.3759 8.29382C11.3759 7.87982 11.7109 7.54382 12.1259 7.54382H14.8979C15.3119 7.54382 15.6479 7.87982 15.6479 8.29382C15.6479 8.70782 15.3119 9.04382 14.8979 9.04382Z" fill="currentColor"></path><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M5.15474 17.702C5.45574 17.702 5.69874 17.945 5.69874 18.246C5.69874 18.547 5.45574 18.791 5.15474 18.791C4.85274 18.791 4.60974 18.547 4.60974 18.246C4.60974 17.945 4.85274 17.702 5.15474 17.702Z" fill="currentColor"></path><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M5.15374 18.0409C5.04074 18.0409 4.94874 18.1329 4.94874 18.2459C4.94874 18.4729 5.35974 18.4729 5.35974 18.2459C5.35974 18.1329 5.26674 18.0409 5.15374 18.0409ZM5.15374 19.5409C4.43974 19.5409 3.85974 18.9599 3.85974 18.2459C3.85974 17.5319 4.43974 16.9519 5.15374 16.9519C5.86774 16.9519 6.44874 17.5319 6.44874 18.2459C6.44874 18.9599 5.86774 19.5409 5.15374 19.5409Z" fill="currentColor"></path><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M16.435 17.702C16.736 17.702 16.98 17.945 16.98 18.246C16.98 18.547 16.736 18.791 16.435 18.791C16.133 18.791 15.89 18.547 15.89 18.246C15.89 17.945 16.133 17.702 16.435 17.702Z" fill="currentColor"></path><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M16.434 18.0409C16.322 18.0409 16.23 18.1329 16.23 18.2459C16.231 18.4749 16.641 18.4729 16.64 18.2459C16.64 18.1329 16.547 18.0409 16.434 18.0409ZM16.434 19.5409C15.72 19.5409 15.14 18.9599 15.14 18.2459C15.14 17.5319 15.72 16.9519 16.434 16.9519C17.149 16.9519 17.73 17.5319 17.73 18.2459C17.73 18.9599 17.149 19.5409 16.434 19.5409Z" fill="currentColor"></path></svg>
                    </div>
                 </div>
                 <div onClick={(e)=>{handleShow(e)}} className=" action action-view d-flex justify-content-end">
                    <div className="title d-flex align-items-center">
                        <div className="content">
                            Quick View
                        </div>
                    </div>
                    <div className="icon">
                        <svg _ngcontent-ng-c2473316328="" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M9.99938 5.64111C8.66938 5.64111 7.58838 6.72311 7.58838 8.05311C7.58838 9.38211 8.66938 10.4631 9.99938 10.4631C11.3294 10.4631 12.4114 9.38211 12.4114 8.05311C12.4114 6.72311 11.3294 5.64111 9.99938 5.64111ZM9.99938 11.9631C7.84238 11.9631 6.08838 10.2091 6.08838 8.05311C6.08838 5.89611 7.84238 4.14111 9.99938 4.14111C12.1564 4.14111 13.9114 5.89611 13.9114 8.05311C13.9114 10.2091 12.1564 11.9631 9.99938 11.9631Z" fill="currentColor"></path><g _ngcontent-ng-c2473316328="" mask="url(#mask0_1211_721)"><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M1.56975 8.05226C3.42975 12.1613 6.56275 14.6043 9.99975 14.6053C13.4368 14.6043 16.5697 12.1613 18.4298 8.05226C16.5697 3.94426 13.4368 1.50126 9.99975 1.50026C6.56375 1.50126 3.42975 3.94426 1.56975 8.05226ZM10.0017 16.1053H9.99775H9.99675C5.86075 16.1023 2.14675 13.2033 0.06075 8.34826C-0.02025 8.15926 -0.02025 7.94526 0.06075 7.75626C2.14675 2.90226 5.86175 0.00326172 9.99675 0.000261719C9.99875 -0.000738281 9.99875 -0.000738281 9.99975 0.000261719C10.0017 -0.000738281 10.0017 -0.000738281 10.0028 0.000261719C14.1388 0.00326172 17.8527 2.90226 19.9387 7.75626C20.0208 7.94526 20.0208 8.15926 19.9387 8.34826C17.8537 13.2033 14.1388 16.1023 10.0028 16.1053H10.0017Z" fill="currentColor"></path></g></svg>
                    </div>
                 </div>
                 <div className=" action d-flex justify-content-end">
                    <div className="title d-flex align-items-center">
                        <div className="content">
                            Add To Wishlist
                        </div>
                    </div>
                    <div className="icon" onClick={(e) => addToWishlist(e,product.id)}>
                        <svg _ngcontent-ng-c2473316328="" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M1.78158 8.88867C3.15121 13.1386 8.5623 16.5749 10.0003 17.4255C11.4432 16.5662 16.8934 13.0918 18.219 8.89257C19.0894 6.17816 18.2815 2.73984 15.0714 1.70806C13.5162 1.21019 11.7021 1.5132 10.4497 2.4797C10.1879 2.68041 9.82446 2.68431 9.56069 2.48555C8.23405 1.49079 6.50102 1.19947 4.92136 1.70806C1.71613 2.73887 0.911158 6.17718 1.78158 8.88867ZM10.0013 19C9.88015 19 9.75999 18.9708 9.65058 18.9113C9.34481 18.7447 2.14207 14.7852 0.386569 9.33491C0.385592 9.33491 0.385592 9.33394 0.385592 9.33394C-0.71636 5.90244 0.510636 1.59018 4.47199 0.316764C6.33203 -0.283407 8.35911 -0.019371 9.99836 1.01242C11.5868 0.0108324 13.6969 -0.26587 15.5198 0.316764C19.4851 1.59213 20.716 5.90342 19.615 9.33394C17.9162 14.7218 10.6607 18.7408 10.353 18.9094C10.2436 18.9698 10.1224 19 10.0013 19Z" fill="currentColor"></path><path _ngcontent-ng-c2473316328="" fill-rule="evenodd" clip-rule="evenodd" d="M15.7806 7.42904C15.4025 7.42904 15.0821 7.13968 15.0508 6.75775C14.9864 5.95687 14.4491 5.2807 13.6841 5.03421C13.2983 4.9095 13.0873 4.49737 13.2113 4.11446C13.3373 3.73059 13.7467 3.52209 14.1335 3.6429C15.4651 4.07257 16.398 5.24855 16.5123 6.63888C16.5445 7.04127 16.2446 7.39397 15.8412 7.42612C15.8206 7.42807 15.8011 7.42904 15.7806 7.42904Z" fill="currentColor"></path></svg>
                    </div>
                 </div>
            </div>
            
        </div>
        
    </RouterLink>

    <Modal show={show} onHide={handleClose} className='modal-quick-view' closeButton>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="quick-view row">
                        <div className="img-left col-xl-6 col-lg-7">
                            <div className="slider">
                                <SlideImgProduct listImg={listImg}/>
                            </div>
                        </div>

                        <div className="des-right col-xl-6 col-lg-5">
                            <div className="des-content">
                                <div className="category">
                                    {
                                        product?
                                        product.category.name
                                        :
                                        'Headphones'
                                    }
                                </div>
                                <div className="name">
                                    {
                                        product?
                                        product.name
                                        :
                                        'Tai nghe Bluetooth True Wireless AVA+ DS206'
                                    }
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    
                                    <span className="status me-2">in-stock</span>
                                    <span className='star'>
                                    {
                                         Array.from({ length: 5 }).map((_, index) => (
                                            <span className='ms-1' key={index}><i class="fa-solid fa-star"></i></span>
                                        ))
                                    }
                                    </span>
                                    <span className='number-rate ms-3'>(3 Reviews)</span>
                                    
                                </div>
                                
                                
                                <div className="price mt-3">
                                  
                                        <span className="old-price me-2">
                                            
                                        {
                                                variantion?
                                                formatCurrencyVND(variantion[0].price)+'₫'
                                                :
                                                '120₫'
                                        }
                                            
                                        </span>
                                    
                                    
                                        <span className="current-price">
                                        
                                        {
                                            variantion?
                                            formatCurrencyVND(variantion[0].sale_price)+'₫'
                                            :
                                            '120₫'
                                        }
                                        </span>
                                    
                                </div>
                                {
                                    option &&
                                    option.map((value,index)=> {
                                        return (
                                            value.name == 'Màu'
                                            ?
                                            <div className="colors mt-2">
                                                <div className="title">
                                                    Màu:
                                                    
                                                </div>
                                                <div className="list-colors mt-2">
                                                    
                                                    {
                                                        value?
                                                        (
                                                            value.OptionValues.map((color,index)=>{
                                                                
                                                                return (
                                                                    <div 
                                                                    key={index} 
                                                                    className={"color "+(color.value == optionActive[value.name] ? "color-active" : null)} 
                                                                    // className={"color "} 
                                                                    style={{backgroundColor:color?.color_code}}
                                                                    onClick={()=>{handleChangArrayParams(value.name,color.value)}}
                                                                    >


                                                                    </div>
                                                                    // <div>
                                                                    //     {
                                                                    //         color.value == optionActive[value.name] ? 'hello' : 'no'
                                                                    //         console.log(optionActive)
                                                                    //         optionActive ? optionActive['Màu'] : null
                                                                    //     }
                                                                    // </div>
                                                                )
                                                            })
                                                        )
                                                        :
                                                        (
                                                            <>
                                                                <div className="color " style={{backgroundColor:"#c1bae4"}}>

                                                                </div>
                                                                <div className="color " style={{backgroundColor:"#d8d7dd"}}>
                                                                    
                                                                </div>
                                                                <div className="color " style={{backgroundColor:"#f3c0d1"}}>
                                                                    
                                                                </div>
                                                                <div className="color " style={{backgroundColor:"#64bfd1"}}>
                                                                    
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                    
                                                </div>
                                            </div>
                                            :
                                            <div className='versions mt-3 mb-3 '>
                                                <div className="title">
                                                    {value.name}:
                                                </div>
                                                <div className="d-flex flex-wrap align-items-center">   
                                                
                                                {
                                                    value && 
                                                    value.OptionValues.map((optionValue,index)=>{
                                                        return (
                                                            <div
                                                            key={index} 
                                                            // className={'me-2 version '+(value.id == product.id ? 'version-active' : '')}
                                                            className={'me-2 version '+(optionValue.value == optionActive[value.name] ? 'version-active' : '')}
                                                            // to={`?id=${value.id}`}
                                                            
                                                            onClick={()=>{handleChangArrayParams(value.name,optionValue.value)}}
                                                            >
                                                                {optionValue.value}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            </div>
                                            
                                            
                                        )
                                    })
                                }
                                
                                <div className="title-quantity mt-3">
                                    <div className="title">
                                    {t('app.common._Quantity')}
                                    </div>
                                </div>
                                <div className="action-top mt-3">
                                    
                                    <div className="quantity">
                                        <button
                                        onClick={minusQuantity}
                                        >
                                            <i class="fa-solid fa-minus me-4"></i>
                                        </button>
                                        <span>{quantity}</span>
                                        <button
                                        onClick={plusQuantity}
                                        >
                                            <i class="fa-solid fa-plus ms-4"></i>
                                        </button>
                                    </div>
                                    <div onClick={handleAddToCart} className="add-to-cart ms-3">
                                        <button>{t('app.common._add_to_cart')}</button>
                                    </div>
                                </div>
                                <div onClick={handleBuyNow} className="action-bottom mt-3">
                                    <button>{t('app.common._buy_now')}</button>
                                </div>
                                    
                                 
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                
        </Modal>
        </>
        
    );
};

export default CardMd;


{/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer> */}