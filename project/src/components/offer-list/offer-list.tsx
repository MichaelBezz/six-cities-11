import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offer';

type OfferListProps = {
  offers: Offers;
  onListItemHover: (id: number | null) => void;
};

export default function OfferList({offers, onListItemHover}: OfferListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers && offers.map((offer) => (
        <OfferCard
          key={offer.id.toString()}
          offer={offer}
          onListItemHover={onListItemHover}
        />
      ))}
    </div>
  );
}
