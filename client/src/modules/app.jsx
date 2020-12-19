import React from 'react';
import $ from 'jquery';
import ImagesSelect from './ImagesSelect';
import ImageViewer from './ImageViewer';

class ProductImagesService extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      productId: match.params.id,
      productImages: [],
      currentImage: null,
      scrollTop: 0,
    };

    this.changeViewer = this.changeViewer.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    const { productId } = this.state;
    $.ajax({
      url: 'http://localhost:3003/api/productImages',
      method: 'GET',
      data: { productId },
      success: (results) => {
        this.setState({
          productImages: results.map((result) => result.s3_url),
          currentImage: results[0].s3_url,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  scroll(direction = 1) {
    const { scrollTop, productImages } = this.state;

    const orientation = typeof direction !== 'number' ? 1 : direction;
    const totalHeight = productImages.length * 72 - 400;

    const newTop = scrollTop - (Math.sign(orientation) * 350);

    if (newTop > 0 && newTop <= totalHeight) {
      this.setState({ scrollTop: newTop }, () => {
        $('#imagesScroll').animate({
          scrollTop: newTop,
        }, 400);
      });
    } else if (newTop <= 0) {
      this.setState({ scrollTop: 0 }, () => {
        $('#imagesScroll').animate({
          scrollTop: 0,
        }, 400);
      });
    } else if (newTop > totalHeight) {
      this.setState({ scrollTop: totalHeight }, () => {
        $('#imagesScroll').animate({
          scrollTop: totalHeight,
        }, 400);
      });
    }
  }

  changeViewer(image) {
    this.setState({ currentImage: image.target.src });
  }

  render() {
    const { productImages, currentImage, scrollTop } = this.state;
    return (
      <div id="productImages">
        <ImagesSelect
          thumbnails={productImages}
          changeViewer={this.changeViewer}
          scroll={this.scroll}
          scrollTop={scrollTop}
        />
        <ImageViewer image={currentImage} />
      </div>
    );
  }
}

export default ProductImagesService;
