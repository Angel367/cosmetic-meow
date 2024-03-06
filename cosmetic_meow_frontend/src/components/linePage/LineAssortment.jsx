import React from "react";


class LineAssortment extends React.Component {
    render() {
        return (
            <section className="production" id="production">
                <h2>Продукция</h2>
                <p>Lorem ipsum dolor sit amet consectetur.
                    Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                <div className="production-holder">

                    {/*{% for product in products %}*/}
                    {/*{% include 'base_elements/product_line_page.html' with product=product%}*/}
                    {/*{% endfor %}*/}
                </div>
            </section>
        );
    }
}
export default LineAssortment;