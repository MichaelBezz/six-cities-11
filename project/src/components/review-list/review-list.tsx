import ReviewItem from '../review-item/review-item';
import ReviewForm from '../review-form/review-form';
import {Reviews} from '../../types/review';

type ReviewListProps = {
  reviews: Reviews;
};

export default function ReviewList({reviews}: ReviewListProps): JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews && reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </ul>

      <ReviewForm />
    </section>
  );
}
