import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

const down = process.env.PUBLIC_URL + '/img/dev/down.svg';
const img = process.env.PUBLIC_URL + '/img/line-page/img.png';

 function LineDescription({lineDescription}) {
    if (!lineDescription)
        // todo add styles for loading
        return <div>Загрузка...</div>
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
                        <Link to={`#production`} className={'contact-us'}
                        ><span>Продукция</span><span>

            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={`#advantages`} className={'contact-us'}
                        ><span>Преимущества</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={`#composition`} className={'contact-us'}
                        ><span>Состав</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={`#application`} className={'contact-us'}
                        ><span>Применение</span><span>
            <img alt="" src={down}/>
                        </span></Link>
                    </div>
                </div>
                <div className="line-module__description-img-holder">
                    <img alt="[img]" src={img}/>
                </div>
            </section>
        );

}
export default LineDescription;


