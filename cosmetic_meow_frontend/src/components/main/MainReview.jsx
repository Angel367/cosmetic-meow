import React from "react";

function MainReview() {
    return (
        <article id="review" className={"upper-line"}>
            <div className="upper-line__header">
                <span>Нам доверяют множество</span>
                <span>Экспертов Красоты</span>
            </div>
            <p className="review-body">
                “На этом веб-сайте представлен широкий
                выбор косметических товаров от
                различных компаний, что делает его
                удобным и приятным для клиентов,
                изучающих и покупающих свои любимые товары”
            </p>
            <p className="author font-review">Джессика Саймон</p>
        </article>
    );
}
export default MainReview;