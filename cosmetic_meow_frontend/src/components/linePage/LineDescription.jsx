import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {render} from "react-dom";
import axios from "axios";
const down = process.env.PUBLIC_URL + '/img/dev/down.svg';
const img = process.env.PUBLIC_URL + '/img/line-page/img.png';
 // todo get from db
 function LineDescription({lineDescription}) {
     // let  = useParams();
    if (!lineDescription)
        return <div>Загрузка...</div>

        return (
            <section className="description">
                <div className="text">
                    <h3>Продукция</h3>
                    <h1>{lineDescription.name}</h1>
                    <p>{lineDescription.description}
                    </p>
                    <div className="link-holder">
                        <Link to={'/line'}><span>Продукция</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={'/line'}><span>Преимущества</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={'/line'}><span>Состав</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={'/line#usage'}><span>Применение</span><span>
            <img alt="" src={down}/>
                        </span></Link>
                    </div>
                </div>
                <div className="img-holder">
                    <img alt="[img]" src={img}/>
                </div>
            </section>
        );

}
export default LineDescription;


