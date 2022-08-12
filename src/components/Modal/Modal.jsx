import css from './Modal.module.css';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ modalImg, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  });

  const keyDownHandler = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <div onClick={onClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={modalImg} alt="" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  modalImg: PropTypes.string,
};
