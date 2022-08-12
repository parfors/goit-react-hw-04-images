import css from './ImageGallery.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';

import {
  ApiService,
  GalleryItem,
  SearchBar,
  Button,
  Loader,
  Modal,
} from 'components';
export class Gallery extends Component {
  api = new ApiService();
  modalEl = document.querySelector('#modal-root');

  state = {
    images: [],
    searchQuery: '',
    page: 1,
    // loading: false,
    showBtn: true,
    modalImg: '',
    isOpen: false,
    // noImgError: false,
    error: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page, images } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'loading' });
      this.api
        .getImg(searchQuery, page)
        .then(data => {
          if (data.totalHits === 0) {
            this.setState({ status: 'noImg' });
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            showBtn: !(data.totalHits === images.length),
            status: 'resolved',
          }));
        })
        .catch(error =>
          this.setState({
            error: error.message,
            status: 'error',
          })
        );
    }
  }

  onSubmit = data => {
    if (data === '') {
      this.setState({ status: 'emptySearch' });
      return;
    }
    this.setState({
      searchQuery: data,
      // loading: true,
      images: [],
      page: 1,
      // noImgError: false,
      error: false,
      showBtn: true,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  clickImgHandler = data => {
    this.setState({
      modalImg: data,
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const {
      images,
      // loading,
      isOpen,
      modalImg,
      // noImgError,
      error,
      showBtn,
      status,
    } = this.state;

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
        <SearchBar onSubmit={this.onSubmit} />
        {paragraph}

        {/* {!noImgError && !loading && images.length === 0 && (
          <p className={css.galleryText}>Hello try to find some images</p>
        )}
        {noImgError && (
          <p className={css.galleryText}>There is no images for this query</p>
        )}
        {error && (
          <p className={css.galleryText}>
            Something went wrong. Please try again later {error}
          </p>
        )}
        {loading && (
          <span className={css.galleryText}>
            <Loader visible={loading} />
          </span>
        )} */}
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <GalleryItem
              key={id}
              webUrl={webformatURL}
              largeImageURL={largeImageURL}
              onClick={this.clickImgHandler}
            />
          ))}
        </ul>
        {showBtn && status === 'resolved' && (
          <span className={css.galleryText}>
            <Button disabled={status === 'loading'} onClick={this.loadMore} />
          </span>
        )}

        {createPortal(
          isOpen && <Modal modalImg={modalImg} onClose={this.closeModal} />,
          this.modalEl
        )}
      </>
    );
  }
}
