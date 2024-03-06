import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {render} from "react-dom";
import axios from "axios";
const down = process.env.PUBLIC_URL + '/img/dev/down.svg';
const img = process.env.PUBLIC_URL + '/img/line-page/img.png';
 // todo get from db
 function LineDescription() {
     let {lineDescription} = useParams();
    if (!lineDescription)
        lineDescription = {
            name: 'lineDescription.name',
           description: 'lineDescription.description'
        };

        return (
            <section className="description">
                <div className="text">
                    <h3>Продукция</h3>
                    <h1>{lineDescription.name}</h1>
                    <p>{lineDescription.description}
                        Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam
                        tellus fringilla viverra eleifend tempor quis. Nec dolor risus
                        fermentum nec vulputate proin nulla nulla consequat. Vitae
                        velit mi velit tortor euismod. Commodo velit eu amet ac.
                        Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet
                        quam tellus fringilla viverra eleifend tempor quis. Nec dolor
                        risus fermentum nec vulputate proin nulla nulla consequat.
                        Vitae velit mi velit tortor euismod. Commodo velit eu amet ac.
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


