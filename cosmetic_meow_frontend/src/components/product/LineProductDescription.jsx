import React from "react";
import {addProduct} from "../../redux/reduxCart";

import ManageProductInCart from "./ManageProductInCart";
import {useSelector} from "react-redux";
import Loading from "../error/Loading";



const arrow = process.env.PUBLIC_URL + '/img/line-page/pink-arrow.svg';
function LineProductDescription({product}) {
    let quantity = useSelector(state => state.cart.products.find(
        (p) => p.id === product.id)?.quantity || 0
    )
    if (!product)
        return <Loading/>;

     return (
    <section>
        <div className="main-info">
            <p className="product-name not-main-p">{product.name || 'product.name'}</p>
            <p className="product-description not-main-p">{product.product_line.name || 'product.product_line.name'}</p>
            <p className="product-price  not-main-p">{product.price.price_value || 'product.price'}</p>

            {/*<ManageProductInCart    product={product} quantity={quantity} />*/}

            <p className={ "not-main-p"}>Закажите наш продукт на популярных площадках:</p>
            <div className="link-holder">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                {/*todo ссылки с бд*/}
                <a href="" className="link-to-other">Ozon
                    <img alt="" src={arrow}/>
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="" className="link-to-other">Wildberries
                    <img alt="" src={arrow}/>
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}



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
                        <p className="info-text not-main-p"
                           id="description-text">
                            <div>
                            {product.description || 'product.description' }</div>
                            {product.advantages.map((advantage, index) => {
                                return (<div>{index + 1}. {advantage.description}</div>);
                            })}


                        </p>

                        <p className="info-text  not-main-p" id="usage-text">
                            <div>Назначение: {product.purpose}</div>
                            <div>Способ применения: {product.application_method}</div>
                           <div>Результаты клинических испытаний: <br/>
                            {product.clinical_testing_result.description }</div>

                        </p>


                        <p className="info-text  not-main-p" id="composition-text">
                            <div>Активные вещества:</div>
                            {product.active_substances.map((substance, index) => {
                                return (<div>{index+1}. {substance.description || ''}</div>);
                            })}
                            <div>{'Coстав: ' + product.composition || ''}</div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        );
    }

export default LineProductDescription;
