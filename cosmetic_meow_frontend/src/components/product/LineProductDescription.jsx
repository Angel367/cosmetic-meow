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
    let marketplaces = [];
        // product.market_place_links || [];

     return (
    <section>
        <div className="main-info">
            <p className="product-name not-main-p">{product.name || 'product.name'}</p>
            <p className="product-description not-main-p">{product.product_line.name || 'product.product_line.name'}</p>
            {/*<p className="product-price  not-main-p">{product.price?.price_value || 'product.price'}</p>*/}

            {/*<ManageProductInCart    product={product} quantity={quantity} />*/}
            { marketplaces?.length === 0 ?  <p className={ "not-main-p"}>Продукт еще недоступен для заказа</p> :
                <p className={ "not-main-p"}>Закажите наш продукт на популярных площадках:</p> }
            <div className="link-holder">

                    {marketplaces.map((marketplace, index) => {
                    return (
                        <>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href={marketplace.link} className="link-to-other" key={index}>
                            {marketplace.marketplace}
                            <img alt="" src={arrow}/>
                        </a></>
                    );
                }
                )}




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
                        <div className="info-text" id="description-text">

                            <p className={ "not-main-p"}>{product.description}</p>
                            {product.advantages.length === 0 ? null :
                                ( <p className={ "not-main-p link-ver"}>Преимущества:</p>)
                            }

                            {product.advantages.map((advantage, index) => {
                               return <p className={ "not-main-p"}>{index+1}. {advantage.description}</p>
                            })}


                        </div>

                        <div className={ "info-text"} id="usage-text">

                            {product.purpose === '' ? null :
                               <><span className='link-ver'>Назначение</span>: <p className={"not-main-p"}>{product.purpose}</p></>
                        }
                        {product.application_method === '' ? null :
                            <><span className='link-ver'>Способ применения</span>: <p className={"not-main-p"}>{product.application_method}</p></>
                        }


                        </div>


                        <div className="info-text" id="composition-text">
                            {product.active_substances.length === 0 ? null :
                            <p className={ "not-main-p"}>Активные компоненты:</p>}
                            {product.active_substances.map((substance, index) => {
                                return (<p className={ "not-main-p"}>{index+1}. {substance.description || ''}</p>);
                            })}
                            {product.composition === '' ? null :
                            <p className={ "not-main-p"}>{'Coстав: ' + product.composition || ''}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        );
    }

export default LineProductDescription;
