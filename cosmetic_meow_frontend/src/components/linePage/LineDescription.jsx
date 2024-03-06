import React from 'react';
import {Link} from "react-router-dom";
const down = process.env.PUBLIC_URL + '/img/dev/down.svg';
const img = process.env.PUBLIC_URL + '/img/line-page/img.png';
 class LineDescription extends React.Component {
    render() {
        return (
            <section className="description">
                <div className="text">
                    <h3>Продукция</h3>
                    <h1>Название продукта</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Leo nulla imperdiet quam
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

                        <Link to={'/line'}><span>Применение</span><span>
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
}
export default LineDescription;


