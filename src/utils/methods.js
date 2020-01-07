import {DISCOUNT_TYPES, SESSION_USER} from "./globals";

export const getUniqueObjects = (arr, comp) => {
    return arr
        .map(e => e[comp])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);
};


export const sort = (array) => {
    return array.sort((a,b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0));
    // return array.sort((a,b) => (a.sort > b.sort) ? 1 : ((b.sort > a.sort) ? -1 : 0));
};


export const getUserScript = user => {
    return `${SESSION_USER} = ${JSON.stringify(user)};`;
};

export const getUserSession = () => {
    if (typeof window !== "undefined") {
        const user = window[SESSION_USER] || {};
        return { user };
    }
    return { user: {} };
};

export const loaderDisplay = display => {
    document.getElementById('loader_bg').style.display = display;
};

export const calculateDistance = (lat1, lon1, lat2, lon2, unit) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
        return 0;
    }
    else {
        let radlat1 = Math.PI * lat1/180;
        let radlat2 = Math.PI * lat2/180;
        let theta = lon1-lon2;
        let radtheta = Math.PI * theta/180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit === "K") { dist = dist * 1.609344 }
        if (unit === "N") { dist = dist * 0.8684 }
        return dist;
    }
};

export const calculateDeliveryCost = distance => {
    distance = parseInt(distance);
    let cost = 20;

    if (distance > 8) {
        cost = 35;
    } else {
        if (distance > 2) {
            distance = distance - 2;

            while (distance >= 0.0){
                cost += 5;
                distance = distance - 2;
            }
        }
    }

    return cost;
};

export const calculateDiscount = (total, discount) => {
    let result = 0;

    if (discount && discount.discount) {
        if (discount.discount_type === DISCOUNT_TYPES.PERCENTAGE) {
            result = parseInt(total) * parseInt(discount.discount) / 100;
        } else {
            result = parseInt(discount.discount);
        }

    }

    return result;
};

