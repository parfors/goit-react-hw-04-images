import css from './ImageGallery.module.css';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  getImg,
  GalleryItem,
  SearchBar,
  Button,
  Loader,
  Modal,
} from 'components';

export const Gallery = () => {
  const modalEl = document.querySelector('#modal-root');
  const supRef = useRef(true);

  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalImg, setModalImg] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (supRef.current === true) {
      supRef.current = false;
      return;
    }

    setStatus('loading');
    getImg(searchQuery, page)
      .then(data => {
        if (data.totalHits === 0) {
          setStatus('noImg');
          return;
        }
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error.message);
        setStatus('error');
      });
  }, [searchQuery, page]);

  const onSubmit = data => {
    if (data === '') {
      setStatus('emptySearch');
      setImages([]);

      return;
    } else {
      setSearchQuery(data);
      setImages([]);
      setPage(1);
      setError(false);
      setTotalHits(0);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const clickImgHandler = data => {
    setModalImg(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  let showBtn = !(images.length === totalHits);
  let paragraph;

  if (status === 'idle') {
    paragraph = (
      <p className={css.galleryText}>Hello try to find some images</p>
    );
  } else if (status === 'loading') {
    paragraph = (
      <span className={css.galleryText}>
        <Loader />
      </span>
    );
  } else if (status === 'noImg') {
    paragraph = (
      <p className={css.galleryText}>There is no images for this query</p>
    );
  } else if (status === 'error') {
    paragraph = (
      <p className={css.galleryText}>
        Something went wrong. Please try again later. Error description:
        {error}
      </p>
    );
  } else if (status === 'emptySearch') {
    paragraph = <p className={css.galleryText}>Please enter your query.</p>;
  }

  return (
    <>
      <SearchBar onSubmit={onSubmit} />

      <ul className={css.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <GalleryItem
            key={id}
            webUrl={webformatURL}
            largeImageURL={largeImageURL}
            onClick={clickImgHandler}
          />
        ))}
      </ul>
      {paragraph}
      {showBtn && status === 'resolved' && (
        <span className={css.galleryText}>
          <Button disabled={status === 'loading'} onClick={loadMore} />
        </span>
      )}

      {createPortal(
        isOpen && <Modal modalImg={modalImg} onClose={closeModal} />,
        modalEl
      )}
    </>
  );
};
