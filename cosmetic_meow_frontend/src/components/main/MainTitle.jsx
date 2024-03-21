import React from "react";
import {Link} from "react-router-dom";
import Loading from "../error/Loading";

const mainTitleMobile = process.env.PUBLIC_URL + '/img/main/main_title_mobile.png';
const mainTitle = process.env.PUBLIC_URL + '/img/main/main_title.png';
const proportion = 2880 / 2074;
function MainTitle() {
    let [imgHeight, setImgHeight] = React.useState(0);
    let [descriptionHeight, setDescriptionHeight] = React.useState(0);
    let [clientWidth, setClientWidth] = React.useState(window.innerWidth);
    let [headerHeight, setHeaderHeight] = React.useState(0);

    let newHeight = 0;
    React.useEffect(() => {
        const handleResize = () => {
            setClientWidth(window.innerWidth);

        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        console.log("clientWidth: " + clientWidth);
        const img = document.getElementById("main-title-img_desktop");
        const mainTitle = document.getElementById("main-title");
         if (clientWidth > 768) {
             if (img) {
                 setImgHeight(clientWidth / proportion);
             }
             if (document.getElementById("main-title-description")) {
                 setDescriptionHeight(document.getElementById("main-title-description").clientHeight);
             }
             if (document.getElementById("main_header")) {
                 setHeaderHeight(document.getElementById("main_header").clientHeight);
             }
             if (imgHeight > mainTitle.clientHeight + headerHeight) {
                 console.log("imgHeight > mainTitle.clientHeight + headerHeight");
                 mainTitle.style.height =
                     (imgHeight - headerHeight) + "px";

                 img.style.width = clientWidth + "px";
                 img.style.height = "auto";
             } else if (descriptionHeight > imgHeight - headerHeight) {
                 console.log("descriptionHeight > imgHeight - headerHeight");
                 mainTitle.style.height =
                     (descriptionHeight) + "px";
                 img.style.height = (mainTitle.clientHeight + headerHeight) + "px";
                 img.style.width = "auto";
             }
         } else {

            img.style.height = "0";
            img.style.width = "0";

        }


    }, [clientWidth, imgHeight, descriptionHeight, headerHeight]);



    return (
        <article id="main-title">
            <div className="main-title-description" id={"main-title-description"}
                    // style={{height: startHeight}}
            >
                <div className="main-title-description-header">
                <h1 className={"main-h1"}>SIDERIS</h1>
                <h2 className={"main-h2"}>Твой Онлайн Гламур Гайд</h2>
                </div>
                <p className={"main-p"}
                >Мы предлагаем вам лучшие товары для вашего здоровья и красоты.
                    Все товары сертифицированы и прошли проверку качества.
                    Вы можете быть уверены в покупке и качестве товара.
                </p>
                <div className="button-holder">
                    <Link to={'/lines/11'} className={"blue button"}>
                        {/*Подробнее про*/}
                       Подробнее о BIOACTIV</Link>
                   <Link to={'/lines/12'} className={"white button"}>
                       {/*Больше о*/}
                      Больше о Dr.Sechenov</Link>
                </div>

            {/*<div className="review-mark-holder">*/}
            {/*    <div className="review-mark">*/}
            {/*        <div className="mark">4.9</div>*/}
            {/*        <div className="review">Отзывов: 1000</div>*/}
            {/*    </div>*/}
            {/*    /!*TODO мб что-то из результатов иссл*!/*/}
            {/*    <div className="review-mark">*/}
            {/*        <div className="mark">4.9</div>*/}
            {/*        <div className="review">Отзывов: 1000</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            </div>
            <div className="main-title-img">
                <img src={mainTitleMobile} alt="" className={"main-title-img_mobile"}/>
                <img src={mainTitle} alt="" className={"main-title-img_desktop"}
                id={"main-title-img_desktop"}
                />
            </div>
        </article>
    );
}

export default MainTitle;