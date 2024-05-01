import React, { useEffect, useState } from 'react';
import SlideProduct from '../../../../components/SlideProduct/SlideProduct';
import ProductAPI from '../../../../service/NodejsServerAPI/ProductAPI';
import { useTranslation } from 'react-i18next';

const NewArrivals = () => {
    const {t,i18n} = useTranslation();
    const [products,setProducts] = useState([]);

    // api get product home
    useEffect(()=>{
        let result;
        async function fetchData() {
            result = await ProductAPI.GetAll();
            if(result) setProducts(result);
            // console.log(result);
        }
        fetchData();
    }, []);
    return (
        <section className='new-arrivals mt-5'>
                    <div className="container mt-3">
                        <div className="title-top">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 title">
                                    <h1>
                                        {t('app.content._New_Arrivals')}
                                    </h1>
                                </div>
                                <div className="col-xl-5 col-lg-5 d-none d-xl-block d-lg-block line">
                                    <hr />
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 action d-flex -align-items-center justify-content-end">
                                    <div className="aciton ps-md-5">
                                        <button className='btn btn-md'>
                                            <span className='me-2'>
                                            {t('app.content._view_all')}
                                            </span>
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="list-products mt-3">
                            <SlideProduct products={products}/>
                        </div>
                    </div>
                </section>
    );
};

export default NewArrivals;