import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import postData from "../../requests/postData";
import {NotificationManager} from "react-notifications";
import fetchData from "../../requests/fetchData";
import Loading from "../error/Loading";

const VerificationProduct = () => {
    const {code} = useParams();
    const [productCode, setProductCode] = React.useState(code);
    const [codeWasSent, setCodeWasSent] = React.useState(false);
    const [productData, setProductData] = React.useState(null);
    useEffect(() => {
        const getProduct = async () => {
            if (codeWasSent) {
                try {
                    const data = await fetchData(`verify-product/${productCode}`);
                    setProductData(data);
                    if (productData === null || productData === undefined) {
                        return <Loading/>;
                    } else if (productData.id !== undefined){
                        NotificationManager.success("Спасибо за ваше сообщение! Мы обязательно его рассмотрим!", "Сообщение отправлено", 5000);
                    } else if (productData.detail === "Not found.") {
                        NotificationManager.error("Продукт не найден", "Ошибка", 5000);
                    } else {
                        NotificationManager.error("Произошла ошибка при отправке запроса", "Ошибка", 5000);
                    }
                } catch (error) {
                    NotificationManager.error("Произошла ошибка при отправке запроса", "Ошибка", 5000);
                    console.error(error);
                }

            }
        }
        getProduct();
    }, [codeWasSent]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCodeWasSent(true);
    }
    return (
        <main id="verification-product">
            <h2 className={"not-main-h3"}>Проверьте подлинность продукта</h2>
            <h1 className={"not-main-h1"}>Верификация продукта</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="product-code">Введите код продукта</label>
                <input type="text" placeholder={"Введите код продукта"}
                          id={"product-code"} name={"product-code"} required={true}
                            value={productCode} minLength={5} maxLength={20}
                       onChange={(e) => setProductCode(e.target.value)}
                />
                <button type={"submit"} className={"blue button"}>Проверить</button>
            </form>

        </main>
    );
}
export default VerificationProduct;