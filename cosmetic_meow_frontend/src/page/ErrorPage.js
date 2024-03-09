import {Link, useRouteError} from "react-router-dom";

 function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Ой, что-то пошло не так</h1>
            <p>
                К сожалению, мы не смогли загрузить страницу.
            </p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={"/"}>Вернуться на главную</Link>
        </div>
    );
}
export default ErrorPage;