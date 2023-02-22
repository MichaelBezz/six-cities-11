import {useAppSelector} from '../../hooks/use-app-selector';
import {getIsAuthorized} from '../../store/user-data/selectors';
import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import {Reviews} from '../../types/review';
import {OfferId} from '../../types/offer';

type ReviewListProps = {
  reviews: Reviews | null;
  offerId: OfferId;
};

function ReviewList({reviews, offerId}: ReviewListProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    <section className="property__reviews reviews" data-testid="review-list">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews?.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews && reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </ul>

      {isAuthorized && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default ReviewList;
