import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Cart.css';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartData, removeFromCart, updateCart } from '../../redux/actions/cartAction';
import formatCurrencyVND from '../../../util/formatCurrencyVND';

const Cart = () => {

    const notifySuccess = () => toast.success('Added 1 product successfully!');
    const notifyWarning = () => toast.success('Successfully reduced 1 product!');

    const [totalPrice,setTotalPrice] = useState();


    const handleAddProduct = async (id,quantity) => {
        let result = updateCart(id, {quantity: (quantity+1)})
        await result()
        dispatch(fetchCartData());
        notifySuccess();
    }
    const handleReducedProduct = async (id,quantity) => {
        if(quantity==1){
            return toast.error('Số lượng sản phẩm không được nhỏ hơn 1!');
        }
        let result = updateCart(id, {quantity: (quantity-1)})
        await result();
        dispatch(fetchCartData());
        
        notifyWarning();
    }


    const [showModalDelete, setShowModalDelete] = useState(false);
    const [productNameDelete,setProductNameDelete] = useState();
    const [idProductDelete,setIdProductDelete] = useState();


    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = (id,productName) => {
        setProductNameDelete(productName);
        setIdProductDelete(id);
        setShowModalDelete(true);
    }
    const handleDeleteCart = async() => {
        let result = removeFromCart(idProductDelete)
        await result();
        dispatch(fetchCartData());
        toast.success('Remove 1 product successfully!');
        setShowModalDelete(false);
    }


    // cart state
    const cart = useSelector((state) => state.cart.carts);
    
    const dispatch = useDispatch();
    // console.log(user);

    useEffect(()=>{
        
        dispatch(fetchCartData());
        
    },[])

    useEffect(()=>{
        console.log(cart);
    },[cart])


    const handleActive = (id,currentActive) => {
        let result = dispatch(updateCart(id, {active: (!currentActive)}))
        dispatch(fetchCartData());
    }

    // handle total price
    const calculateTotalPrice = () => {
        let sum = 0;
        for (let index = 0; index < cart.length; index++) {
            if(cart[index].active){
                sum += (cart[index].variation.sale_price*cart[index].quantity);
            }
        }
        return sum;
    }

    useEffect(()=>{
        const tempTotalPrice = calculateTotalPrice();
        // console.log(tempTotalPrice);
        setTotalPrice(tempTotalPrice);
    },[cart]);


    return (
        <div className='shofy-app'>
            <div id='cart' className='mt-3 mb-5'>
                <div className="container">
                    <div className="title-cart">
                        <h2>Shopping Cart</h2>
                    </div>
                    
                    <section className="route">
                        <i class="fa-solid fa-house"></i>
                        <span className='ms-1 me-1'>Home</span>
                        /
                        <span className='me-1 ms-1'>Shopping Cart</span>
                    </section>

                    <div className="content-cart mt-3">
                        <div className="row">
                            <div className="col-12 col-xl-9 mb-3">
                                <div className="list-carts">
                                    <table class="table">
                                        <thead>
                                            <tr className='table-secondary'>
                                                <th scope="col"></th>
                                                <th scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart &&
                                                cart.map((value,index)=>{
                                                    return(
                                                        <tr key={index} className='pt-3 pb-3'>
                                                            <td style={{padding:'0'}}>
                                                                <div className='check-box' >
                                                                    <input onClick={()=>{handleActive(value.id,value.active)}} type="checkbox" name="" id="" checked={value.active} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="product-des d-flex align-items-center">
                                                                    <div className="img ">
                                                                        <img src={import.meta.env.VITE_API_URL+ value.variation.product.img_preview} alt="" />
                                                                    </div>
                                                                    <div className="name ">
                                                                        {value.variation.name}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className='price'>
                                                                    {formatCurrencyVND(value.variation.sale_price*value.quantity)+'₫'}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className="quantity d-flex align-items-center justify-content-around">
                                                                    <button 
                                                                    onClick={()=>{handleReducedProduct(value.id,value.quantity);}}
                                                                    className=''>
                                                                        <i class="fa-solid fa-minus"></i>
                                                                    </button>
                                                                    <span className='quantity-value'>
                                                                        {value.quantity}
                                                                    </span>
                                                                    <button
                                                                    onClick={()=>{handleAddProduct(value.id,value.quantity)}}
                                                                    >
                                                                        <i class="fa-solid fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div 
                                                                onClick={()=>{
                                                                    handleShowModalDelete(value.id,value.variation.name)
                                                                }}
                                                                className="action-remove">
                                                                    <i class="fa-solid fa-trash"></i>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                            

                                            
                                            
                                        </tbody>
                                    </table>
                                </div>

                                <div className="coupon-code">
                                    <div>
                                        Coupon Code:
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 col-lg-6 col-xl-6 d-flex mb-2">
                                            <input class="form-control rounded-0" type="text" placeholder='Enter Coupon Code' />
                                            <button className='btn bg-dark text-white rounded-0'>Apply</button>
                                        </div>
                                        <div className="clear-cart col-12 col-lg-6 col-xl-6  mb-2 d-none d-md-none d-lg-block d-xl-block">
                                            <button className='rounded-0 btn border border-secondary'>
                                                Clear Cart
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-12 col-xl-3 mb-3">
                                <div className="row">
                                    <div className="action col-12 col-md-6 col-lg-6 col-xl-12">
                                        <div className="subtotal d-flex justify-content-between">
                                            <h6>
                                                Tạm tính:
                                            </h6>
                                            <h6>
                                                {formatCurrencyVND(totalPrice)+'₫'}
                                            </h6>
                                        </div>
                                        <div className="shiping mt-1 d-flex justify-content-between">
                                            <div>
                                                Phí giao:
                                            </div>
                                            <div>
                                                ---
                                            </div>
                                        </div>
                                        <div className="discount mt-1 d-flex justify-content-between">
                                            <div>
                                                Giảm giá:
                                            </div>
                                            <div>
                                                ---
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="total-price mt-2 d-flex justify-content-between">
                                            <h4>
                                                Tổng:
                                            </h4>
                                            <h4>
                                                {formatCurrencyVND(totalPrice)+'₫'}
                                            </h4>
                                        </div>

                                        <div className="btn-bottom-action mt-4">
                                            <Link to={'/checkout'} className='btn w-100 rounded-0 bg-dark text-white'>
                                                Proceed to Checkout
                                            </Link>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Cảnh báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn chắc chắn muốn xóa '{productNameDelete}' khỏi giỏ hàng của bạn?</Modal.Body>
                <Modal.Footer>
                <Button className='btn-sm' variant="secondary" onClick={handleCloseModalDelete}>
                    Hủy
                </Button>
                <Button className='btn-sm' variant="danger" onClick={handleDeleteCart}>
                    Xóa
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    );
};

export default Cart;