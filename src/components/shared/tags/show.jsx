import React, {useContext} from 'react';
import MainContext from './../../../context/cart-context';
import {getUniqueObjects} from "../../../utils/methods";

const Show = props => {
    const context = useContext(MainContext);
    let {tag} = props;

    const isTagChecked = () => {
        let {selectedTags} = context;
        let tagFound = selectedTags.find(selectedTag => selectedTag === tag.id);
        return tagFound !== undefined;
    };

    const handleTagChange = e => {
        let {selectedTags} = context;
        if (!e.target.checked) {
            selectedTags.splice(selectedTags.indexOf(tag.id),1);
        } else {
            selectedTags.push(tag.id);
        }

        handleRestaurantFilter();

        context.handleUpdateMainState({selectedTags});
    };

    const handleRestaurantFilter = () => {
        let {tags} = context;
        let allRestaurants = [];
        let {selectedTags} = context;

        if (selectedTags.length <= 0) {
            tags.forEach(tag => {
                tag.restaurants.forEach(restaurant => {
                    allRestaurants.push(restaurant)
                });
            })
        } else {
            tags.forEach(tag => {
                let tagFound = selectedTags.find(selectedTag => selectedTag === tag.id);

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