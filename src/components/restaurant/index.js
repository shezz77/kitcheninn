import React, {useContext} from 'react';
import Restaurant from './show';
import MainContext from './../../context/cart-context';

const RestaurantList = () => {
    const context = useContext(MainContext);
    let {restaurants} = context;

    return (
        <ul className="resturant-list">
           {(restaurants && restaurants.length) ? (
               restaurants.reduce((restaurants, obj, index) => {
                //    if (obj.distance <= 10)
                // console.log("Restaturant Dis: "+obj.distance);
                       restaurants.push(<Restaurant
                           key={index}
                           restaurant={obj}
                           index={index}
                       />)
                   return restaurants;
               }, [])
           ): (<h1>No restaurant found for you at this time</h1>)}
        </ul>
    )
};

export default RestaurantList;