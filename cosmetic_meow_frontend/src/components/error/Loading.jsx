import React from "react";


function Loading() {
    return (
            // todo: add loading animation

            <span className={"loading not-main-h1"}>
                <span className="loading__spinner"/>
                Загрузка...
            </span>
    )
}
export default Loading;