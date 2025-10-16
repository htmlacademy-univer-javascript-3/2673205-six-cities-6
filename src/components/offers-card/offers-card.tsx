import {OfferCard} from '../../types/offerCard.ts';
import {Link} from 'react-router-dom';

type OfferCardProps = {
  offerCard : OfferCard;
  onHover: (id: string) => void;
  onLeave: () => void;
  isFavoritePage: boolean;
}

function OffersCard({offerCard, onHover, onLeave, isFavoritePage}: OfferCardProps) : JSX.Element {
  const percent = Math.min(100, Math.max(0, (offerCard.rating / 5) * 100));
  const cardPage = isFavoritePage ? 'favorites' : 'cities';
  const imageSize = isFavoritePage ? {width: 150, height: 110} : {width: 260, height: 200};
  return (
    <article className={`${cardPage}__card place-card`}
      onMouseEnter={() => onHover(offerCard.id)}
      onMouseLeave={() => onLeave()}
    >
      {offerCard.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardPage}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${offerCard.id}`}>
          <img
            className="place-card__image"
            src={offerCard.previewImage}
            {...imageSize}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offerCard.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offerCard.isBookmark ? 'place-card__bookmark-button--active' : null} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{offerCard.isBookmark ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${percent}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offerCard.id}`}>
            {offerCard.title}
          </Link>
        </h2>
        <p className="place-card__type">{offerCard.type}</p>
      </div>
    </article>
  );
}

export default OffersCard;
