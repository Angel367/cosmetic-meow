import React from "react";


let img_src = process.env.PUBLIC_URL + '/img/line-page/no_photo.jpg';



function LineActiveSubstanceCard({active_substance}) {
     if (!active_substance )
         return <div>Загрузка...</div>
    if (active_substance.image)
     img_src = active_substance.image

        return (
            <div className="small-product-box line-page active-sub">
                <div className="small-product-img-box-subst">
                    <img alt={""} src={img_src}/>
                </div>

                <div className="small-product-info-box">
                    <div className="small-product-name">{active_substance.name}</div>
                    <div className="small-product-description">{active_substance.description}</div>
                </div>

            </div>
        );

}
export default LineActiveSubstanceCard;