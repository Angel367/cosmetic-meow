import React, {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import fetchData from "../../requests/fetchData";

const arrow = process.env.PUBLIC_URL + '/img/main/fi-rr-arrow-small-right.svg';

const VerificationProduct = () => {
    const {code} = useParams() || '';
    const navigation = useNavigate();
    const [validated, setValidated] = React.useState(false);
    const [productCode, setProductCode] = React.useState(code);
    const [codeWasSent, setCodeWasSent] = React.useState(false);
    const [productData, setProductData] = React.useState(null);
    const [disabled, setDisabled] = React.useState(code.length < 5);
    const [isVerified, setIsVerified] = React.useState(null);
    const [realProduct, setRealProduct] = React.useState(null);
    useEffect(() => {
        const getProduct = async () => {
            if (codeWasSent) {
                // console.log("productCode", productCode, codeWasSent);
                const data = await fetchData(`product_code/${productCode}`);
                setProductData(data);
                // console.log(data);
                if (data !== null && data !== undefined && data.product !== undefined) {
                    const realData = await fetchData(`product/${data.product}`);
                    setRealProduct(realData);
                    console.log(realData);
                }

            }

        }
        getProduct();
    }, [codeWasSent, productCode]);
    const handleSubmit =  (e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
            return;
        }
        // console.log("productCode", productCode);
        setValidated(true);
        setCodeWasSent(true);
        setDisabled(true);
        navigation(`/verify_product/${productCode}`);

    }
    useEffect(() => {
        if (productData !== undefined && productData !== null){

            if (productData.product !== undefined) {
                NotificationManager.success(
                    "Продукт подлинный", "Успешно", 5000);
                setIsVerified(true);

            } else if (productData.detail === "Not found.") {
                NotificationManager.error("Продукт не найден", "Ошибка", 5000);
                setIsVerified(false);
            } else {
                NotificationManager.error("Произошла ошибка при отправке запроса", "Ошибка", 5000);
                setIsVerified(false);
            }
            setCodeWasSent(false);
        }

    }, [productData]);


    return (
        <main id="verification-product">
            <h2 className={"not-main-h3"}>Проверьте подлинность продукта</h2>
            <h1 className={"not-main-h1"}>Верификация продукта</h1>

            <form onSubmit={handleSubmit} validated={validated.toString()} method="POST">
                <p className={"not-main-p"}>
                    <label htmlFor="product-code">Введите код продукта</label>
                    <input type="text" placeholder={"Введите код продукта"}
                              id={"product-code"} name={"product-code"} required={true}
                                value={productCode} minLength={5} maxLength={20}
                                className={
                                    isVerified === null ?
                                        "" : isVerified ? "verified" : "not-verified"
                                }

                           onChange={(e) => {
                               setIsVerified(null)
                               setProductCode(e.target.value);
                               setCodeWasSent(false);
                               if (e.target.value.length >= 5)
                                    setDisabled(false);

                                 else
                                     setDisabled(true);
                            } }
                    />
                    {isVerified === null ? null :
                    isVerified ?

                        (<>
                        <span className={"verified"}>Продукт подлинный</span>
                        {realProduct !== null && realProduct !== undefined ?
                            <>
                                <div><span className={"link-ver"}> Название продукта: </span>{realProduct.name}</div>
                                <div ><span className={"link-ver"}>Линия продукта: </span>{realProduct.product_line.name}</div>
                                <div ><span className={"link-ver"}>Состав продукта: </span>{realProduct.composition}</div>
                            <Link to={`/lines/${realProduct.product_line.id}/products/${realProduct.id}`} className={"contact-us"}>
                                <span>Подробнее</span>
                                <span><img src={arrow} alt={" перейти"}/></span></Link>
                            </> : null
                        }
                        </>):
                        <span className={"not-verified"}>Продукт не подлинный</span>
                }
                </p>

                <button type={"submit"} className={"blue button"}
                        id={"submit-product-code"}
                        disabled={disabled}>Проверить</button>
            </form>



                <p className={"not-main-p"}>
                    Ознакомьтесь с другими нашими
                    <Link to={"/development"} className={"link-ver"}> продуктами</Link> или
                    <Link to={"/contacts"} className={"link-ver"}> свяжитесь с нами</Link>
                </p>

        </main>
    );
}
export default VerificationProduct;