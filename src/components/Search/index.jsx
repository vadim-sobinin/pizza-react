import React from 'react';

import styles from './Search.module.scss';
import closeIcon from '../../assets/img/close.svg';

import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue, setSearchInputValue } from '../../redux/slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const { searchInputValue } = useSelector((state) => state.filterSlice);
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    dispatch(setSearchInputValue(''));
    inputRef.current.focus();
  };

  const onChangeInput = (event) => {
    dispatch(setSearchInputValue(event.target.value));
    updateSearchValue(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        ref={inputRef}
        value={searchInputValue}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        type="text"
        placeholder="Pizza search..."
      />
      {searchInputValue && (
        <img onClick={onClickClear} className={styles.clearIcon} src={closeIcon} alt="clear" />
      )}
    </div>
  );
};
export default Search;
