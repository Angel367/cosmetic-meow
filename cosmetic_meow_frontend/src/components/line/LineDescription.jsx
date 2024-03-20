import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Loading from "../error/Loading";

const down = process.env.PUBLIC_URL + '/img/dev/down.svg';
let img = process.env.PUBLIC_URL + '/img/line-page/no_photo.jpg';

 function LineDescription({lineDescription, productsCount, advantagesCount, activeSubstancesCount, purposesCount}) {


    if (!lineDescription)
        return <Loading/>
    if (lineDescription.images && lineDescription.images.length > 0)
        img = lineDescription.images[0].image;

        return (
            <section className="line-module__description">
                <div className="line-module__description-text">
                    <h3 className={'not-main-h3'}>
                        Линейка продуктов
                    </h3>
                    <h1 className={'not-main-h1'}>
                        {lineDescription.name}
                    </h1>
                    <p className={'not-main-p'}>
                        {lineDescription.description}
                    </p>


                    <div className="link-holder">
                        { productsCount > 0 ? (
                        <a href="#production-line" className={'contact-us'}><span>Продукция</span><span>
            <img alt="" src={down}/>
                        </span></a>) : null}
                        {advantagesCount > 0 ? (
                        <a href={`#advantages-line`} className={'contact-us'}
                        ><span>Преимущества</span><span>
            <img alt="" src={down}/>
                        </span></a>)
                        : null}

                        {activeSubstancesCount > 0 ? (
                        <a href={`#active-substances-line`}
                           className={'contact-us'}

                        ><span>Состав</span><span>
            <img alt="" src={down}/>
                        </span></a>)
                        : null}
                        {purposesCount > 0 ?

                        <a href={`#applications-line`}
                              className={'contact-us'}
                        ><span>Применение</span><span>
            <img alt="" src={down}/>
                        </span></a>
                        : null}
                    </div>
                </div>
                <div className="line-module__description-img-holder">
                    <img alt="" src={img}/>
                </div>
            </section>
        );

}
export default LineDescription;


