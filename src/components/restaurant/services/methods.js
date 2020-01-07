import moment from 'moment-timezone';
import {RESTAURANT_AVAILIBILITY, RESTAURANT_STATUSES} from "../../../utils/globals";
moment.tz.setDefault("asia/jerusalem");

export const processHoursOfRestaurant = weekly_availabilities => {
    if (!weekly_availabilities) {
        return false;
    }

    let today = moment(new Date());

    let today_en = today.format('dddd');

    return weekly_availabilities.find(day => day.week_en.toUpperCase() === today_en.toUpperCase());
};

export const processRestaurantActiveStatus = restaurant => {
    let {weekly_availabilities} = restaurant;
    let status = RESTAURANT_AVAILIBILITY.COMING_SOON;
    let format = 'HHmm';

    if(restaurant.restaurant_status.name_en === RESTAURANT_STATUSES.COMING_SOON || restaurant.restaurant_status.name_en === RESTAURANT_STATUSES.CLOSED) {
        status = restaurant.restaurant_status.name_en;
        return status;
    }

    let availability = processHoursOfRestaurant(weekly_availabilities);

    if (availability) {
        let beforeTime = moment(availability.opening_time, format);
        let afterTime = moment(availability.closing_time, format);
        // let afterTime = moment('12:00');

        let today = moment(new Date());
        let current_time = today.format(format);
        let now = moment(current_time, format);

        if (now > beforeTime && now < afterTime) {
            status = RESTAURANT_AVAILIBILITY.OPEN;
        } else {
            status = `${RESTAURANT_AVAILIBILITY.CLOSED} ${availability.opening_time}`;

        }

        // // console.log(today, availability, status, beforeTime);
        // console.log(beforeTime);
        // console.log(now);
        // console.log(afterTime);
    }

    return status;
};
