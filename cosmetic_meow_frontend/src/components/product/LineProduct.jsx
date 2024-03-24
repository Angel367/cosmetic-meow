import {Link, Navigate, useNavigate, useParams} from "react-router-dom";

import LineProductImgHolder from "./LineProductImgHolder";
import LineProductDescription from "./LineProductDescription";

import React, {useEffect, useState} from 'react';
import fetchData from "../../requests/fetchData";
import Loading from "../error/Loading";
const arrow = process.env.PUBLIC_URL + '/img/line-page/black-arrow.svg';
const product_clinical_testing_result_image1 = process.env.PUBLIC_URL + '/img/clinc/1.png';
const product_clinical_testing_result_image2 = process.env.PUBLIC_URL + '/img/clinc/2.png';
const product_clinical_testing_result_image3 = process.env.PUBLIC_URL + '/img/clinc/3.png';
const product_clinical_testing_result_image4 = process.env.PUBLIC_URL + '/img/clinc/4.png';
const product_clinical_testing_result_image5 = process.env.PUBLIC_URL + '/img/clinc/5.jpg';
const product_clinical_testing_result_image6 = process.env.PUBLIC_URL + '/img/clinc/6.jpg';



function LineProduct() {
    const {id_product, id_line} = useParams();
    const [product, setProduct] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        async function fetchProduct() {
            try {
                const productData = await fetchData('product/' + id_product);
                setProduct(productData);
                document.title = productData.name || "Продукт";

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        fetchProduct();
    }, [id_product]);
    if (!product){

        return <Loading/>;
    }
    if (product.response && product.response.status){

        return <Navigate to={'/error'}/>
    }


    // if (product.product_line && (!id_line  || id_line !== product.product_line) ) {
    //     navigate(`/lines/${product.product_line.id}/products/${id_product}`);
    // }
    return (
            <main className="main-line-product">
                {/*<a href='#'>*/}
                {/*<div*/}
                {/*    onClick={() => navigate(-1)}*/}
                {/*      className="close"/>*/}
                {/*</a>*/}
                {/* todo fix cursor*/}
                <article>
                    <LineProductImgHolder imgs={product.images}/>
                    <LineProductDescription product={product}/>
                </article>

                <Link to={`/lines/${id_line}`}
                      className="back">К линейке продуктов
                    <img src={arrow} alt="arrow"/>
                </Link>


            {product.clinical_testing_result.description  === '' ? null :
                <article className={'line-product-clinch'}>
                    <h2 className='not-main-h2'>Результаты клинических испытаний</h2>
                    <p className={"not-main-p"}>{product.clinical_testing_result.description}</p>
                    <div className={'line-product-clinch-holder'}>
                        <p className={"not-main-p"}>
                            Визуализация исследования действия крема-эмолента на кожу больных
                            атопическим и ретиноевым дерматитом, а также пациентов с сенильным
                            ксерозом: </p>
                    <div className={'line-product-clinch-img-holder'}>
                        <div className={'line-product-clinch-img-holder__card'}>
                            <img src={product_clinical_testing_result_image1} alt="result"/>
                            <div className={'line-product-clinch-img-holder__card__text not-main-p'}>
                                Корнеометрия. Кожа больного атопическим дерматитом 3D до применения крема
                            </div>
                        </div>
                        <div className={'line-product-clinch-img-holder__card'}>
                            <img src={product_clinical_testing_result_image2} alt="result"/>
                            <div className={'line-product-clinch-img-holder__card__text not-main-p'}>
                                Корнеометрия. Кожа больного атопическим дерматитом 3D после применения крема
                            </div>
                        </div>
                    </div>
                    <div className={'line-product-clinch-img-holder'}>
                        <div className={'line-product-clinch-img-holder__card'}>
                            <img src={product_clinical_testing_result_image3} alt="result"/>
                            <div className={'line-product-clinch-img-holder__card__text not-main-p'}>
                                Изучение рельефа кожи больного сенильным ксерозом до применения крема 3D
                            </div>
                        </div>
                        <div className={'line-product-clinch-img-holder__card'}>
                            <img src={product_clinical_testing_result_image4} alt="result"/>
                            <div className={'line-product-clinch-img-holder__card__text not-main-p'}>
                                Изучение рельефа кожи больного сенильным ксерозом после применения крема 3D
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className={'line-product-clinch-holder'}>
                        <p className={"not-main-p"}>
                            У пациентов выявлено уменьшение выраженности основных клинических симптомов (сухость,
                            шелушение, чувство стянутости кожи, зуд). Крем способствует выравниванию рельефа и тона кожи. </p>
                        <div className={'line-product-clinch-img-holder'}>
                        <div className={'line-product-clinch-img-holder__card'}>
                            <img src={product_clinical_testing_result_image5} alt="result"/>
                            <div className={'line-product-clinch-img-holder__card__text not-main-p'}>
                                Динамика показателей корнеометрии (увлажнения) кожи у пациентов с ретиноевым дерматитом
                            </div>
                        </div>
                        <div className={'line-product-clinch-img-holder__card'}>
                            <img src={product_clinical_testing_result_image6} alt="result"/>
                            <div className={'line-product-clinch-img-holder__card__text not-main-p'}>
                                Динамика показателей корнеометрии (увлажнения) кожи у пациентов с ретиноевым дерматитом
                            </div>
                        </div>
                        </div>
                    </div>
                    <p className={"not-main-p"}>У пациентов было выявлено статистически значимое увеличение увлажненности кожи. Использование крема значительно
                        увеличило гидратацию кожи лица, а также снизило уровень трансэпидермальной потери влаги на 21,6%.</p>
                </article>
            }

            </main>
    );
}

export default LineProduct;