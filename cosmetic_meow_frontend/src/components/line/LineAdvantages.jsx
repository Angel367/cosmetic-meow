import React from "react";





function LineAdvantages({advantages, line_id}) {

    if (!advantages || !line_id)
        return
    if (line_id === 12){
        advantages = [{
                description: 'Создание полимерной системы для повышенной доступности компонентов в эпидермис',
                image: process.env.PUBLIC_URL + '/img/advantages/1.png'
                },
                {
                    description: 'Отсутствие в составе силиконов, отдушек, микропластика',
                    image: process.env.PUBLIC_URL + '/img/advantages/3.png',
                },
                {
                    description: 'Клиническая апробация в условиях стационара под контролем врачей-дерматологов',
                    image: process.env.PUBLIC_URL + '/img/advantages/2.png',
                }
        ]

    } else if (line_id === 11){
        advantages = [{
            description: 'Высокая концентрация низкомолекулярной гиалуроновой кислоты',
            image: process.env.PUBLIC_URL + '/img/advantages/4.png'
        },
            {
                description: 'Активные компоненты с доказанной эффективностью',
                image: process.env.PUBLIC_URL + '/img/advantages/5.png',
            },
            {
                description: 'Зеленые увлажнители',
                image: process.env.PUBLIC_URL + '/img/advantages/6.png',
            }
        ]
    } else if (line_id === 13){
        advantages = [{
                description: 'Полный спектр физико-химических исследований',
                image: process.env.PUBLIC_URL + '/img/advantages/5.png'
                },
                {
                    description: 'Мягкая система консервантов',
                    image: process.env.PUBLIC_URL + '/img/advantages/3.png',
                },
                {
                    description: 'Пролонгируемый эффект',
                    image: process.env.PUBLIC_URL + '/img/advantages/2.png',
                }
        ]

    }
        return (
            <section className="advantages" id="advantages-line">
                <h2 className="not-main-h2">Ключевые преимущества</h2>
                <p className="not-main-p">Почему стоит выбрать нашу продукцию</p>
                <div className="advantages-holder">
                    {advantages.map((advantage, index) => (
                        <div className="advantage" key={index}>
                            <img alt="1" src={advantage.image}/>
                            {/*<h3>{advantage.name}</h3>*/}
                            <p className={'not-main-p'}
                            >{advantage.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        );

}

export default LineAdvantages;