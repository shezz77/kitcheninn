export const BASE_API_URL = `${window.location.protocol}//api.kitcheninn.com/api`;
// export const BASE_API_URL = `${window.location.protocol}//localhost:8000/api`;

export const LANGUAGES = {
  ENGLISH: 'HE',
  HEBREW: 'EN'
};

export const SESSION_USER = "__USER__";

export const FIELD_TYPES = {
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password',
    NUMBER: 'number',
    URL: 'url',
    File: 'file'
};

export const DELIVERY_TYPES = {
    CASH: 'cash',
    DELIVERY: 'delivery',
    PICKUP_FROM_RESTAURANT: 'pickup from restaurant'
};

export const RESTAURANT_AVAILIBILITY = {
    OPEN: 'Open now',
    CLOSED: 'Opens at: ',
    COMING_SOON: 'Coming Soon',
    PERMANENT_CLOSED: 'Closed'

};

export const RESTAURANT_STATUSES = {
    OPEN: 'Open',
    CLOSED: 'Closed',
    COMING_SOON: 'Coming Soon'
};

export const DISCOUNT_TYPES = {
  PERCENTAGE: 'percentage',
  AMOUNT: 'amount'
};

export const PICKUP_TIME_TYPE = {
    ASAP: 'מיידי',
    CUSTOM: 'custom'
};

