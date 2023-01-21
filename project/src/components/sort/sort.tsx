import {memo, useRef, useState, useEffect} from 'react';
import cn from 'classnames';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {changeSort} from '../../store/offers-data/offers-data';
import {SortType, SORTS} from '../../constants';

type SortProps = {
  sortType: SortType;
}

function Sort({sortType}: SortProps): JSX.Element {
  const list = useRef<HTMLUListElement | null>(null);
  const [toggleList, setToggleList] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const sortList = list.current;

    const handleSortListToggle = (event: MouseEvent | TouchEvent) => {
      if (sortList?.contains(event.target as HTMLLIElement)) {
        return;
      }

      setToggleList(false);
    };

    let isMounted = true;

    if (isMounted) {
      document.addEventListener('mousedown', handleSortListToggle);
      document.addEventListener('touchstart', handleSortListToggle);
    }

    return () => {
      isMounted = false;
      document.removeEventListener('mousedown', handleSortListToggle);
      document.removeEventListener('touchstart', handleSortListToggle);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" data-testid="sort">
      <span className="places__sorting-caption">Sort by</span>
      {' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          setToggleList((prevState) => !prevState);
        }}
      >
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        ref={list}
        className={cn('places__options places__options--custom', {
          'places__options--opened': toggleList
        })}
      >
        {SORTS.map((sort) => (
          <li
            key={sort}
            className={cn('places__option', {
              'places__option--active': sort === sortType
            })}
            tabIndex={0}
            onClick={() => {
              setToggleList(false);
              dispatch(changeSort(sort));
            }}
            data-testid="sort-item"
          >
            {sort}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(Sort);
