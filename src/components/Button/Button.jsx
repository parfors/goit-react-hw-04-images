import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} type={'button'} className={css.Button}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
