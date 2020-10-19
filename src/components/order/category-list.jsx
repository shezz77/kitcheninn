import React from 'react';
import Category from './category';
import 'react-accessible-accordion/dist/fancy-example.css';

const CategoryList = props => {
    let {categories} = props.restaurant;

    return (
        
        <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12">
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