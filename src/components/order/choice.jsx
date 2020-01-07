import React from 'react';
import SubItem from './subitem';

const ItemModal = props => {
    let { choice } = props;
    let { subitems } = choice;

    return (
        <div className="box-frame">
            <h3>{choice.name_en}</h3>
            <div className="holder">
                <ul className="control-group">
                    {subitems && (
                        subitems.map((subitem, index) => (
                           <SubItem
                            key={index}
                            subitem={subitem}
                            subitemIndex={index}
                            {...props}
                           />
                        ))
                    )}


                </ul>

                <span style={{color: 'red'}}>{choice.message}</span>
            </div>
        </div>
    );
};

export default ItemModal;