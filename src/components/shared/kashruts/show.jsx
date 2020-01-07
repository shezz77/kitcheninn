import React, {useContext} from 'react';
import MainContext from './../../../context/cart-context';
import {getUniqueObjects} from "../../../utils/methods";

const Show = props => {
    const context = useContext(MainContext);
    let {tag} = props;

    const isTagChecked = () => {
        let {selectedKashruts} = context;
        let tagFound = selectedKashruts.find(selectedTag => selectedTag === tag.id);
        return tagFound !== undefined;
    };

    const handleTagChange = e => {
        let {selectedKashruts} = context;
        if (!e.target.checked) {
            selectedKashruts.splice(selectedKashruts.indexOf(tag.id),1);
        } else {
            selectedKashruts.push(tag.id);
        }

        handleRestaurantFilter();

        context.handleUpdateMainState({selectedKashruts});
    };

    const handleRestaurantFilter = () => {
        let {kashruts} = context;
        let allRestaurants = [];
        let {selectedKashruts} = context;

        if (selectedKashruts.length <= 0) {
            kashruts.forEach(tag => {
                tag.restaurants.forEach(restaurant => {
                    allRestaurants.push(restaurant)
                });
            })
        } else {
            kashruts.forEach(tag => {
                let tagFound = selectedKashruts.find(selectedTag => selectedTag === tag.id);

                if (tagFound !== undefined){
                    tag.restaurants.forEach(restaurant => {
                        allRestaurants.push(restaurant)
                    });
                }

            })
        }

        let restaurants = getUniqueObjects(allRestaurants, 'id');

        context.handleUpdateMainState({restaurants});
    };


    return (
        <li>
            <label className="control control--checkbox">
                <input type="checkbox" name="tag" onChange={handleTagChange} checked={isTagChecked()}/>
                <div className="control__indicator"/>
                <span id="cb-tags-title0">{tag.name_en} [{tag.restaurants.length}]</span>
            </label>
        </li>
    );
};

export default Show;