import React from "react";
import {Link, useParams} from "react-router-dom";
const active_substance_image = process.env.PUBLIC_URL + '/img/main/product.png';

function LineActiveSubstanceCard(){
     let active_substance =( useParams()||{
            id: 1,
            name: "active_substance",
            description: "Short description"
        })
        return (
            <div className="small-product-box line-page">
                <div className="small-product-img-box">
                    {/*{% if product.get_images.count > 0 %}*/}
                    {/*{% for image in product.get_images %}*/}
                    {/*{% if image.is_main %}*/}
                    {/*<img src="{{ image.image.url }}" alt="{{ product.name }} Image"/>*/}
                    {/*{% endif %}*/}
                    {/*{% endfor %}*/}
                    {/*{%  else %}*/}
                    <img alt="product" src={active_substance_image}/>
                    {/*{% endif %}*/}
                </div>

                <div className="small-product-info-box">
                    <div className="small-product-name">{active_substance.name}</div>
                    <div className="small-product-description">{active_substance.description}</div>
                </div>

            </div>
        );

}
export default LineActiveSubstanceCard;