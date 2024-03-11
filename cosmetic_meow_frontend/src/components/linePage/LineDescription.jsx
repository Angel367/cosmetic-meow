import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

const down = process.env.PUBLIC_URL + '/img/dev/down.svg';
const img = process.env.PUBLIC_URL + '/img/line-page/img.png';

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
                        <Link to={`#production`}><span>Продукция</span><span>

            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={`#advantages`}><span>Преимущества</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={`#composition`}><span>Состав</span><span>
            <img alt="" src={down}/>
                        </span></Link>

                        <Link to={`#application`}><span>Применение</span><span>
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


