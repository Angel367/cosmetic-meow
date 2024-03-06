import React from "react";
class LineComposition extends React.Component {
    render() {
        return (
            <section className="similar" id="similar">
                <h2>Активные компоненты</h2>
                <p>Lorem ipsum dolor sit amet consectetur.
                    Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                <div className="similar-holder">

                    {/*{% for product in similar%}*/}
                    {/*{% include 'base_elements/product_line_page.html' with product=product%}*/}
                    {/*{% endfor %}*/}
                </div>
            </section>
        );
    }
}

export default LineComposition;