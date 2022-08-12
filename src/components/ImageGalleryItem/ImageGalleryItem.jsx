import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const GalleryItem = ({ largeImageURL, webUrl, onClick }) => {
  const clickHandler = () => {
    onClick(largeImageURL);
  };

  return (
    <>
      <li className={css.ImageGalleryItem}>
        <img
          onClick={clickHandler}
          className={css.ImageGalleryItemImage}
          src={webUrl}
          alt=""
        />
      </li>
    </>
  );
};

GalleryItem.propTypes = {
  onClick: PropTypes.func,
  largeImageURL: PropTypes.string,
  webUrl: PropTypes.string,
};
