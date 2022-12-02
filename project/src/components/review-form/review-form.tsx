import {Fragment, useState, FormEvent, ChangeEvent} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useAppSelector} from '../../hooks/useAppSelector';
import {sendReviewAction} from '../../store/offer-property-data/api-actions';
import {getReviewFormBlockedStatus} from '../../store/offer-property-data/selectors';
import {OfferId} from '../../types/offer';

type FormData = {
  rating: string;
  review: string;
};

type ReviewFormProps = {
  offerId: OfferId;
};

const GRADES = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

const REVIEW_LENGTH = {
  min: 50,
  max: 300
};

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReviewFormBlocked = useAppSelector(getReviewFormBlockedStatus);

  const [formData, setFormData] = useState<FormData>({
    rating: '',
    review: ''
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(sendReviewAction({
      id: offerId,
      rating: +formData.rating,
      comment: formData.review,
    }));

    setFormData({
      rating: '',
      review: ''
    });
  };

  const isButtonBlocked = !formData.rating
  || formData.review.length < REVIEW_LENGTH.min
  || formData.review.length > REVIEW_LENGTH.max
  || isReviewFormBlocked;

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {GRADES.map((grade, index) => {
          const gradeValue: number = GRADES.length - index;

          return(
            <Fragment key={grade}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={gradeValue}
                id={`${gradeValue}-stars`}
                type="radio"
                checked={Number(formData.rating) === gradeValue}
                onChange={handleFieldChange}
                disabled={isReviewFormBlocked}
              />
              <label
                className="reviews__rating-label form__rating-label"
                htmlFor={`${gradeValue}-stars`}
                title={grade}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleFieldChange}
        disabled={isReviewFormBlocked}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">{REVIEW_LENGTH.min} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonBlocked}
        >
          {!isReviewFormBlocked ? 'Submit' : 'Sending...'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
