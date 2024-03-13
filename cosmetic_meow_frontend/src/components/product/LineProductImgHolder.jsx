import React from "react";

const cream_1 = process.env.PUBLIC_URL + '/img/line-page/cream_1_1.jpg';
const cream_2 = process.env.PUBLIC_URL + '/img/line-page/cream_1_2.jpg';
class LineProductImgHolder extends React.Component {
    onClickImage = (e) => {
        if (e.target.tagName !== 'IMG') return;
        const imageUrl = e.target.src;

        let imgs = document.querySelectorAll('.img-small');
        imgs.forEach(image => {
            image.style.backgroundColor ='#FFF';
            image.style.borderColor ='#5F6886';

        });
        e.currentTarget.style.backgroundColor = '#E47A7C';
        e.currentTarget.style.borderColor = '#E47A7C';
        this.showImage(imageUrl);
    }
    showImage(imageUrl) {
        document.getElementById('mainImage').src = imageUrl;
    }
    componentDidMount() {
        const images = document.querySelectorAll('.img-small');
        console.log(images[0].firstChild.src)
        this.showImage(images[0].firstChild.src);
        images[0].style.backgroundColor = '#E47A7C';
        images[0].style.borderColor = '#E47A7C';
        images.forEach(image => {
            // eslint-disable-next-line no-undef
            image.addEventListener('click', this.onClickImage);
        });
    }

    render() {

        return (
            <section className="img-holder-section">
                <div className="img-holder">
                    {/*Todo брать избражения */}
                    <div className="img-small"><img src={cream_1} alt=""/></div>
                    <div className="img-small"><img src={cream_2} alt=""/></div>
                    <div className="img-small"><img src={cream_1} alt=""/></div>
                    <div className="img-small"><img src={cream_2} alt=""/></div>
                </div>
                <div className="img-main">
                    <img id="mainImage" src={cream_1} alt=""/>
                </div>
            </section>

        );
    }
}
export default LineProductImgHolder;