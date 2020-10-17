import React from 'react';
import PropTypes from 'prop-types';
import ImageSelect from './ImageSelect';
import styled from 'styled-components';

const ISl = styled.div`
  height: auto;
  width: 80px;
  float: left;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
`;

const ISc = styled.div`
  height: 420px;
  width: 80px;
  overflow-y: auto;
`

class ImagesSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
    };
  }

  scroll(direction = 1) {
    const { thumbnails } = this.props;
    const { scrollTop } = this.state;

    const orientation = typeof direction !== 'number' ? 1 : direction;
    const totalHeight = thumbnails.length * 84 - 400;

    const newTop = scrollTop + (Math.sign(orientation) * 350);

    if (newTop >= 0 && newTop <= totalHeight) {
      this.setState({ scrollTop: newTop }, () => {
        document.getElementById('imagesScroll').scrollTo({
          top: scrollTop,
          left: 0,
          behavior: 'smooth',
        });
      });
    } else if (newTop < 0) {
      console.log('cannot scroll before first picture');
    } else if (newTop > totalHeight) {
      console.log('cannot scroll past final picture');
    }
  }

  render() {
    const { thumbnails, changeViewer } = this.props;
    return (
      <ISl id="imagesSelect">
        {/* <button id='thumbnailsScrollUp' onClick={() => this.scroll(-1)}>UP</button> */}
        <ISc id="imagesScroll">
          {thumbnails.map(
            (tn) => <ImageSelect key={tn} img={tn} changeViewer={changeViewer} />,
          )}
        </ISc>
        {/* <button id='thumbnailsScrollDown' onClick={() => this.scroll(1)}>DOWN</button> */}
      </ISl>
    );
  }
}

// ImagesSelect.propTypes = {
//   thumbnails: PropTypes.instanceOf(Array).isRequired,
//   changeViewer: PropTypes.func.isRequired,
// };

export default ImagesSelect;
