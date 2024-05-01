import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import "./Wishlist.css";
import { useDispatch, useSelector } from "react-redux";
import formatCurrencyVNDMutiple from "../../../util/formatCurrencyVNDMutiple";
import { fetchWishlistData, removeFromWishlist } from "../../redux/actions/wishlistAction";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlists);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModalDelete, setShowModalDelete] = useState(false);
    const [productIdDelete,setProductIdDelete] = useState();
  const handleCloseModalDelete = () => setShowModalDelete(false);
  const handleShowModalDelete = (product_id) => {
    setProductIdDelete(product_id);
    setShowModalDelete(true);
  }
  const handleDeleteWishlist = async () => {
    toast.success("Remove 1 product successfully!");
    await dispatch(removeFromWishlist(productIdDelete));
    dispatch(fetchWishlistData());
    setShowModalDelete(false);
  };

  const handleAddToCart = (product_id) => {
    navigate("/detail?id="+product_id);
  };
  return (
    <div className="shofy-app">
      <div className="container">
        <div id="wishlist" className="mt-3 mb-5">
          <div className="title">
            <h2>Wishlist</h2>
            <section className="route">
              <i class="fa-solid fa-house"></i>
              <span className="ms-1 me-1">Home</span>/
              <span className="me-1 ms-1">Wishlist</span>
            </section>
          </div>

          {wishlist?.length > 0 ? (
            <div className="list-items mt-4">
              <table class="table">
                <thead>
                  <tr className="table-secondary">
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    {/* <th scope="col">Quantity</th> */}
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ padding: "0" }}>
                          <div className="check-box">{index+1}</div>
                        </td>
                        <td>
                          <div className="product-des d-flex align-items-center justify-content-start">
                            <div className="img ">
                              <img
                                src={import.meta.env.VITE_API_URL+value.product.img_preview}
                                alt=""
                              />
                            </div>
                            <div className="name ">
                              {
                                value.product.name
                              }
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="price">{formatCurrencyVNDMutiple(value.product.price)}</span>
                        </td>
                        <td>
                          <div className="action-mobile d-lg-none d-xl-none d-flex align-items-center">
                            <div
                              onClick={handleAddToCart}
                              className="add-to-cart d-flex align-items-center justify-content-around"
                            >
                              <i class="fa-solid fa-cart-shopping"></i>
                            </div>
                            <div
                              onClick={handleShowModalDelete}
                              className="ms-2 action-remove"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </div>
                          </div>

                          <div className="action-lg d-none d-lg-block d-xl-block ">
                            <div className="d-flex align-items-center justify-content-center">
                              <div
                                onClick={()=> handleAddToCart(value.product_id)}
                                className="add-to-cart d-flex align-items-center justify-content-around ms-3 me-3"
                              >
                                <button className="d-flex align-items-center">
                                    <i class="fa-regular fa-eye"></i>
                                    <span>View more</span>
                                </button>
                              </div>
                              <div
                                onClick={() => handleShowModalDelete(value.product_id)}
                                className="ms-2 action-remove ms-3 me-3"
                              >
                                <button className="d-flex align-items-center">
                                  <i class="fa-solid fa-trash"></i>
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div>Chưa có mục yêu thích nào</div>
          )}
        </div>
      </div>
      <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to remove the product from your shopping cart?
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-sm"
            variant="secondary"
            onClick={handleCloseModalDelete}
          >
            Close
          </Button>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={handleDeleteWishlist}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Wishlist;
