import React from 'react';
import Category from './category';
import 'react-accessible-accordion/dist/fancy-example.css';

const CategoryList = props => {
    let {categories} = props.restaurant;

    return (
        <div className="col-xs-8">
            <div id="contant">
                <ul className="accordion multilevel-accordion">
                    {categories && categories.length > 0 && (
                        categories.map((category, index) => (
                            <Category
                                key={index}
                                category={category}
                                {...props}
                            />
                        ))
                    )}
                </ul>
            </div>
        </div>
    
    );
};

export default CategoryList;