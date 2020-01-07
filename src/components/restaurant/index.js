import React, {useContext} from 'react';
import Restaurant from './show';
import MainContext from './../../context/cart-context';

const RestaurantList = () => {
    const context = useContext(MainContext);
    let {restaurants} = context;

    return (
        <ul className="resturant-list">
           {restaurants && (
               restaurants.map((obj, index) => (
                    <Restaurant 
                        key={index}
                        restaurant={obj} 
                        index={index}
                    />
               ))
           )}
        </ul>
    )
};

export default RestaurantList;