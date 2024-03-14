import React from "react";
import {addProduct} from "../../redux/reduxCart";

import ManageProductInCart from "./ManageProductInCart";
import {useSelector} from "react-redux";



const arrow = process.env.PUBLIC_URL + '/img/line-page/pink-arrow.svg';
function LineProductDescription({product}) {
    let quantity = useSelector(state => state.cart.products.find(
        (p) => p.id === product.id)?.quantity || 0
    )
    if (!product)
        return <div>Загрузка</div>

     return (
    <section>
        <div className="main-info">
            <p className="product-name">{product.name || 'product.name'}</p>
            <p className="product-description">{product.product_line.name || 'product.product_line.name'}</p>
            <p className="product-price">{product.price.price_value || 'product.price'}</p>

            <ManageProductInCart    product={product} quantity={quantity} />

            <p>Shop product on other marketplaces</p>
            <div className="link-holder">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" className="link-to-other">Ozon
                    <img alt="" src={arrow}/>
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" className="link-to-other">Wildberries
                    <img alt="" src={arrow}/>
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" className="link-to-other">Beru
                    <img alt="" src={arrow}/>
                </a>


            </div>
            <div className="info">
                <div className="controls-text">

                    <input type="radio" id="description-radio" name="info" className="info-radio" defaultChecked/>
                    <label htmlFor="description-radio" className="info-label">Описание</label>
                    <input type="radio" id="usage-radio" name="info" className="info-radio"/>
                    <label htmlFor="usage-radio" className="info-label">Использование</label>
                    <input type="radio" id="composition-radio" name="info" className="info-radio"/>
                    <label htmlFor="composition-radio" className="info-label">Состав</label>
                    <div>
                        <p className="info-text" id="description-text">
                            {product.short_description + ' ' || 'product.short_description'}
                            {product.description || 'product.description' }

                            {product.advantages.map((advantage) => {
                                return ' ' + advantage.name + ' : ' + advantage.description + ' ';
                            })}


                        </p>

                        <p className="info-text" id="usage-text">
                            {product.purpose || 'product.purpose' +

                            + ' 2.product.purpose'  }

                            { ' ' + product.application_method || 'product.application_method' +

                            + ' 2.product.application_method'  }

                            { ' ' + product.clinical_testing_result.description || 'product.clinical_testing_result' +
                            + ' 2.product.clinical_testing_result' }

                        </p>


                        <p className="info-text" id="composition-text">
                            {product.composition || 'product.composition' }

                            {product.active_substances.map((substance) => {
                                return ' ' + substance.name + ' : '  + substance.description + ' ';
                            })
                             || 'product.active_substances' }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        );
    }

export default LineProductDescription;
