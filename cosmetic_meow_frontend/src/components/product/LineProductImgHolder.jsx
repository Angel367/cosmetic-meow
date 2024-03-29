import React from "react";

class LineProductImgHolder extends React.Component {
    state = {
        currentImageIndex: 0
    };
    setCurrentActive(cur) {
        const images = document.querySelectorAll('.img-small');
        images.forEach(image => {
            image.style.backgroundColor = '#FFFFFF';
            image.style.borderColor = '#5F6886'
        });
        cur.style.backgroundColor = '#E47A7C';
        cur.style.borderColor = '#E47A7C';

    }
    onClickImage = (e) => {
        if (e.target.tagName !== 'IMG') return;
        this.setCurrentActive(e.target.parentElement)
        const imageUrl = e.target.src;
        const currentIndex = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
        this.setState({ currentImageIndex: currentIndex });
        this.showImage(imageUrl);
    };

    showImage(imageUrl) {
        document.getElementById('mainImage').src = imageUrl;
    }

    handleNextImage = () => {
        const { imgs } = this.props;
        const nextIndex = (this.state.currentImageIndex + 1) % imgs.length;
        const nextImageUrl = imgs[nextIndex].image || imgs[nextIndex];
        this.setState({ currentImageIndex: nextIndex });
        this.showImage(nextImageUrl);
        const images_div = document.querySelectorAll('.img-small');
        this.setCurrentActive(images_div[nextIndex])
    };

    handlePrevImage = () => {
        const { imgs } = this.props;
        const prevIndex = (this.state.currentImageIndex - 1 + imgs.length) % imgs.length;
        const prevImageUrl = imgs[prevIndex].image || imgs[prevIndex];
        this.setState({ currentImageIndex: prevIndex });
        this.showImage(prevImageUrl);
        const images_div = document.querySelectorAll('.img-small');
        this.setCurrentActive(images_div[prevIndex])
    };

    componentDidMount() {
        const images = document.querySelectorAll('.img-small');
        this.showImage(images[0].firstChild?.src);
        this.setCurrentActive(images[0]);
        images.forEach(image => {
            image.addEventListener('click', this.onClickImage);
        });
    }

    render() {
        const { imgs } = this.props;
        const { currentImageIndex } = this.state;

        return (
            <section className="img-holder-section">
                <div className="img-holder">
                    {imgs.length > 0 ? imgs.map((img, index) => (
                        <div key={index} className="img-small">
                            <img src={img.image || img} alt=""/>
                        </div>
                    )) : (
                        <div className="img-small">
                            <img src={imgs[0]} alt=""/>
                        </div>
                    )}
                </div>
                <div className="img-main">
                    <div className="arrow arrow-left" onClick={this.handlePrevImage}>
                    </div>
                    {imgs.length > 0 ? (
                        <img id="mainImage" src={imgs[currentImageIndex].image || imgs[currentImageIndex]} alt=""/>
                    ) : (
                        <img id="mainImage" src={imgs[currentImageIndex]} alt=""/>
                    )}
                    <div className="arrow arrow-right" onClick={this.handleNextImage}></div>
                </div>
            </section>
        );
    }
}

export default LineProductImgHolder;
