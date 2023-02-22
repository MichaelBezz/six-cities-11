export enum AppRoute {
  Login = '/login',
  Main = '/',
  Offer = '/offer',
  Favorite = '/favorites',
  NotFound = '*'
}

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/hotels',
  Favorite = '/favorite',
  Reviews = '/comments'
}

export enum AuthorizationStatus {
  Authorized = 'AUTHORIZED',
  NoAuthorized = 'NO_AUTHORIZED',
  Unknown = 'UNKNOWN'
}

export enum Reducer {
  User = 'USER',
  Offers = 'OFFERS',
  FavoriteOffers = 'FAVORITE_OFFERS',
  OfferProperty = 'OFFER_PROPERTY'
}

export enum Location {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortType {
  Popular = 'Popular',
  PriceToHigh = 'Price: low to high',
  PriceToLow = 'Price: high to low',
  RatingToLow = 'Top rated first'
}

export const LOCATIONS: Location[] = Object.values(Location);
export const SORTS: SortType[] = Object.values(SortType);
