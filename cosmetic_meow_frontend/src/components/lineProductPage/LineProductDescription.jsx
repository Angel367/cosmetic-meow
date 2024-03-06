import React from "react";
import {useParams} from "react-router-dom";

const arrow = process.env.PUBLIC_URL + '/img/line-page/pink-arrow.svg';
function LineProductDescription() {
    const {product} = useParams();
    console.log(product + 'product from LineProductDescription')
    if (!product)
        return (
            <div>
                <p>Product is loading</p>
            </div>
        )
        else
     return (
    <section>
        <div className="main-info">
            <p className="product-name">{product.name || 'product.name'}</p>
            <p className="product-description">{product.product_line.name || 'product.product_line.name'}</p>
            <p className="product-price">{product.price || 'product.price'}</p>

            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="" className="blue button">Добавить в корзину</a>

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
                    {/*todo fix radio*/}
                    <input type="radio" id="description-radio" name="info" className="info-radio" defaultChecked/>
                    <label htmlFor="description-radio" className="info-label">Описание</label>
                    <input type="radio" id="usage-radio" name="info" className="info-radio"/>
                    <label htmlFor="usage-radio" className="info-label">Использование</label>
                    <input type="radio" id="composition-radio" name="info" className="info-radio"/>
                    <label htmlFor="composition-radio" className="info-label">Состав</label>
                    <div>
                        <p className="info-text" id="description-text">
                            {product.short_description + ' ' || 'product.short_description'}
                            {product.description || 'product.description' +
                                ' 1.product.description' +
                                ' 1.product.description' +
                                ' 1.product.description' +
                                ' 1.product.description'}
                            {' \nAdvantages: ' +
                            product.advantages.map((advantage) => {
                                return ' ' + advantage.name + ' : ' + advantage.description + ' ';
                            }
                            ) || 'product.advantages' +
                            ' 1.product.advantages' +
                            ' 1.product.advantages' +
                            ' 1.product.advantages' +
                            ' 1.product.advantages'}

                        </p>

                        <p className="info-text" id="usage-text">
                            {product.purpose || 'product.purpose' +
                            + ' 2.product.purpose' +
                            + ' 2.product.purpose' +
                            + ' 2.product.purpose' +
                            + ' 2.product.purpose'  }

                            { ' ' + product.application_method || 'product.application_method' +
                            + ' 2.product.application_method' +
                            + ' 2.product.application_method' +
                            + ' 2.product.application_method' +
                            + ' 2.product.application_method'  }

                        </p>


                        <p className="info-text" id="composition-text">
                            {product.composition || 'product.composition' +
                            + ' 3.product.composition' +
                            + ' 3.product.composition' +
                            + ' 3.product.composition' +
                            + ' 3.product.composition'}

                            {product.active_substances.map((substance) => {
                                return ' ' + substance.name + ' : '  + substance.description + ' ';
                            })
                             || 'product.active_substances' +
                            + ' 3.product.active_substances1' +
                            + ' 3.product.active_substances2' +
                            + ' 3.product.active_substances3' +
                            + ' 3.product.active_substances4'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        );
    }

export default LineProductDescription;