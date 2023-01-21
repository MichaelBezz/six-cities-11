import {useRef, useEffect} from 'react';
import Sort from '../../components/sort/sort';
import OfferList from '../../components/offer-list/offer-list';
import {Offers} from '../../types/offer';
import {Location, SortType} from '../../constants';

type OfferSectionProps = {
  location: Location;
  sortType: SortType;
  offers: Offers;
}

function OfferSection({location, sortType, offers}: OfferSectionProps): JSX.Element {
  const places = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      places.current?.scrollTo(0, 0);
    }

    return () => {
      isMounted = false;
    };
  }, [location]);

  return (
    <section ref={places} className="cities__places places" data-testid="offer-section">
      <h2 className="visually-hidden">Places</h2>

      <b className="places__found">
        {offers.length} places to stay in {location}
      </b>

      <Sort sortType={sortType} />
      <OfferList offers={offers} isMainOffer />
    </section>
  );
}

export default OfferSection;
