import React from "react";
import {Link} from "react-router-dom";
import Loading from "../error/Loading";

const mainTitleMobile = process.env.PUBLIC_URL + '/img/main/main_title_mobile.png';
const mainTitle = process.env.PUBLIC_URL + '/img/main/main_title.png';
const proportion = 2880 / 2074;
function MainTitle() {
    let [startHeight, setStartHeight] = React.useState(0);
    let [startPadding, setStartPadding] = React.useState(0);
    let [clientWidth, setClientWidth] = React.useState(window.innerWidth);
    let [headerHeight, setHeaderHeight] = React.useState(0);
    let newHeight = 0;
    React.useEffect(() => {
        const handleResize = () => {
            setClientWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        const mainTitleDescription = document.getElementById("main-title-description");
        if (mainTitleDescription) {
            setStartHeight(mainTitleDescription.clientHeight);
            let computedStyle = getComputedStyle(mainTitleDescription);
            setStartPadding(parseInt(computedStyle.paddingTop) + parseInt(computedStyle.paddingBottom));
        }
        if (document.getElementById("main-header")) {
            setHeaderHeight(document.getElementById("main-header").clientHeight);
        }

    }, []);
    if (startHeight !== 0) {
        newHeight = clientWidth / proportion;
        if (newHeight > startHeight) {
            setStartHeight(newHeight);
            document.getElementById("main-title-description").style.height =
                (newHeight - headerHeight - startPadding) + "px";

        }
    }

    return (
        <article id="main-title">
            <div className="main-title-description" id={"main-title-description"}
                    // style={{height: startHeight}}
            >
                <div className="main-title-description-header">
                <h1 className={"main-h1"}>SIDERID</h1>
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