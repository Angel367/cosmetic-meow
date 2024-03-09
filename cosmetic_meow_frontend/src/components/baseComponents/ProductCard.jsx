import React from "react";
import {Link} from "react-router-dom";

// const product_image = process.env.PUBLIC_URL + '/img/main/product.png';

class  ProductCard extends React.Component {
    render() {
        const product = {
            id: 1,
            name_: "Product",
            short_description_: "Short description"
        }
        return (
            <Link className="small-product-box" to={`/product/${product.id}`}>

            {/*    <div class="small-product-img-box">*/}
            {/*        {% if product.get_images.count > 0 %}*/}
            {/*        {% for image in product.get_images %}*/}
            {/*        {% if image.is_main %}*/}
            {/*        <img src="{{ image.image.url }}" alt="{{ product.name }} Image">*/}
            {/*            {% endif %}*/}
            {/*            {% endfor %}*/}
            {/*            {%  else %}*/}
            {/*            <img alt="product" src="{% static 'img/main/product.png'%}">*/}
            {/*                {% endif %}*/}
            {/*    </div>*/}
            {/*    {#    <div class="small-product-text-box">#}*/}
            {/*    <div class="small-product-name">{{ product.name }}</div>*/}
            {/*    <div class="small-product-description">{{ product.short_description }}</div>*/}
            {/*    {#    </div>#}*/}
            {/*    <div class="small-product-main-box">*/}
            {/*        <div class="small-product-price">{{ product.price }}</div>*/}
            {/*        <div class="small-product-link">*/}
            {/*            {% if count_in_cart %}*/}
            {/*            {% if count_in_cart > 0 %}*/}
            {/*            <a href="{% url 'shop:product_info_incr' product_id=product.id %}">*/}
            {/*                +*/}
            {/*            </a>*/}
            {/*            <span>{{ count_in_cart }}</span>*/}
            {/*            <a href="{% url 'shop:product_info_decr' product_id=product.id %}">*/}
            {/*                -*/}
            {/*            </a>*/}
            {/*            {% else %}*/}
            {/*            <a href="{% url 'shop:product_info_add' product_id=product.id %}">*/}
            {/*                <img alt="[cart]" src="{% static 'img/header/fi-rr-shopping-cart.svg'%}">*/}
            {/*            </a>*/}
            {/*            {% endif %}*/}
            {/*            {% else %}*/}
            {/*            <a href="{% url 'shop:product_info_view' product_id=product.id %}">*/}
            {/*                <img alt="Перейти" src="{% static 'img/main/fi-rr-arrow-small-right.svg'%}">*/}
            {/*            </a>*/}
            {/*            {% endif %}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</>*/}

            </Link>
        );
    }
}
export default ProductCard;