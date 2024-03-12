import React from "react";
import {addProduct, addQuantity, removeProduct, subQuantity} from "../../helpres/reduxCart";
import {useDispatch, useSelector} from "react-redux";

function ManageProductInCart({product, quantity}) {
    let dispatch = useDispatch();
    return (

        <div className="small-product-link">
            {quantity === 0 ?
                (<button onClick={() => dispatch(addProduct(product))}>Add to cart</button>) :
                ( <>
                    <button onClick={() => dispatch(addQuantity(product.id))}>+</button>
                <div>{quantity}</div>
                <button onClick={() => dispatch(subQuantity(product.id)) }>-</button>
                <button onClick={() => dispatch(removeProduct(product.id))}>Remove</button>
                </>)
            }
        </div>
    );
}

export default ManageProductInCart;