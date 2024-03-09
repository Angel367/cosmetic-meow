import React from "react";
import LineProductCard from "../baseComponents/LineProductCard";
import {useParams} from "react-router-dom";


function LineAssortment ()  {
    let {products} = useParams();
    if (!products)
        products = [{
        name: 'product1.name1',
        product_line: {
            name: 'product1.product_line1.name1',
            img: 'product1.product_line1.img1'
        },
        price: 'product1.price1',
        description: 'product1.description1',
        short_description: 'product1.short_description1',
        purpose: 'product1.purpose1',
        application_method: 'product1.application_method1',
        composition: '1product.compositio1',
        active_substances: [
            {
                name: 's1ubstance1.name1',
                description: 'substa1nce.descriptio1n'
            }
        ],
        advantages: [ {
            name: 'advantag1e.na1me',
            description: 'adva1ntages.descr1iption'
        }
        ]},
            {
                name: 'product2.name2',
                product_line: {
                    name: 'product2.product_line2.name2',
                    img: 'product2.product_line2.img2'
                },
                price: 'product2.price2',
                description: 'product2.description2',
                short_description: 'product2.short_description2',
                purpose: 'product2.purpose2',
                application_method: 'product2.application_method2',
                composition: 'product2.composition2',
                active_substances: [
                    {
                        name: 'substance2.name2',
                        description: 'substance2.description2'
                    }
                ],
                advantages: [ {
                    name: 'advantage2.name2',
                    description: 'advantages2.description2'
                }
                ]
            },
            {
                name: 'product3.name3',
                product_line: {
                    name: 'product3.product_line3.name3',
                    img: 'product3.product_line3.img3'
                },
                price: 'product3.price3',
                description: 'product3.description3',
                short_description: 'product3.short_description3',
                purpose: 'product3.purpose3',

                application_method: 'product3.application_method3',
                composition: 'product3.composition3',
                active_substances: [
                    {
                        name: 'substance3.name3',
                        description: 'substance3.description3'
                    }
                ],
                advantages: [ {
                    name: 'advantage3.name3',
                    description: 'advantages3.description3'
                }
                ]

            },
            {
                name: 'product4.name4',
                product_line: {
                    name: 'product4.product_line4.name4',
                    img: 'product4.product_line4.img4'
                },
                price: 'product4.price4',
                description: 'product4.description4',
                short_description: 'product4.short_description4',
                purpose: 'product4.purpose4',
                application_method: 'product4.application_method4',
                composition: 'product4.composition4',
                active_substances: [
                    {
                        name: 'substance4.name4',
                        description: 'substance4.description4'
                    }
                ],
                advantages: [ {
                    name: 'advantage4.name4',
                    description: 'advantages4.description4'
                }
                ]
            }

    ];

        return (
            <section className="production" id="production">
                <h2>Продукция</h2>
                <p>Lorem ipsum dolor sit amet consectetur.
                    Leo nulla imperdiet quam tellus fringilla viverra eleifend tempor quis</p>
                <div className="production-holder">
                    {products.map(product => (
                        <LineProductCard product={product} key={product.id}/>
                    ))}
                </div>
            </section>
        );

}
export default LineAssortment;