import React from "react";

class LineProductImgHolder extends React.Component {
    state = {
        currentImageIndex: 0
    };

    onClickImage = (e) => {
        if (e.target.tagName !== 'IMG') return;
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
    };

    handlePrevImage = () => {
        const { imgs } = this.props;
        const prevIndex = (this.state.currentImageIndex - 1 + imgs.length) % imgs.length;
        const prevImageUrl = imgs[prevIndex].image || imgs[prevIndex];
        this.setState({ currentImageIndex: prevIndex });
        this.showImage(prevImageUrl);
    };

    componentDidMount() {
        const images = document.querySelectorAll('.img-small');
        this.showImage(images[0].firstChild.src);
        images[0].style.backgroundColor = '#E47A7C';
        images[0].style.borderColor = '#E47A7C';
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
