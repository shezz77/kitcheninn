import React from 'react';
import Item from './item';

const Category = props => {
    let { items } = props;
    return (
        <>
            {items && (
                items.map((item, index) => (
                    <Item
                        key={index}
                        item={item}
                    />
                ))

            )}
        </>

    );
};

export default Category;