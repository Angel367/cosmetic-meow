import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {NotificationManager} from "react-notifications";
import fetchData from "../../requests/fetchData";
import Loading from "../error/Loading";

const VerificationProduct = () => {
    const {code} = useParams();
    const [validated, setValidated] = React.useState(false);
    const [productCode, setProductCode] = React.useState(code);
    const [codeWasSent, setCodeWasSent] = React.useState(false);
    const [productData, setProductData] = React.useState(null);
    const [disabled, setDisabled] = React.useState(code.length < 5);
    useEffect(() => {
        const getProduct = async () => {
            if (codeWasSent) {
                console.log("productCode", productCode, codeWasSent);
                const data = await fetchData(`product_code/${productCode}`);
                setProductData(data);


            }
        }
        getProduct();
    }, [codeWasSent]);
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

    }
    if (codeWasSent) {
        if (productData === undefined || productData === null)
            return <Loading/>;
        else{
            if (productData.product !== undefined) {
                NotificationManager.success(
                    "Продукт подлинный", "Успешно", 5000);
            } else if (productData.detail === "Not found.") {
                NotificationManager.error("Продукт не найден", "Ошибка", 5000);
            } else {
                NotificationManager.error("Произошла ошибка при отправке запроса", "Ошибка", 5000);
            }
            setCodeWasSent(false);
        }
    }
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

                           onChange={(e) => {

                               setProductCode(e.target.value);
                               setCodeWasSent(false);
                               if (e.target.value.length >= 5)
                                    setDisabled(false);
                                 else
                                     setDisabled(true);
                            } }
                    />
                </p>
                <button type={"submit"} className={"blue button"}
                        id={"submit-product-code"}
                        disabled={disabled}
                >Проверить</button>
            </form>

        </main>
    );
}
export default VerificationProduct;