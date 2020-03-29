import React, {useContext} from 'react';
import CartContext from "../../context/cart-context";

const SubItem = props => {
    let context = useContext(CartContext);
    let { item } = context;
    let { subitem, choiceIndex, subitemIndex } = props;

    const handleSubitemSelect = () => {
        if (subitem.selected) {
            subitem.selected = false;
        } else {
            if (validateSubitemLimit(item['choices'][choiceIndex])) {
                subitem.selected = true;
            } else {
                item['choices'][choiceIndex].message = `Maximum limit is ${item['choices'][choiceIndex].limit}`;

                setTimeout(() => {
                    item['choices'][choiceIndex].message = '';
                }, 2000);

                // messages.status = true;
                // messages.text =  `Maximum limit is ${item['choices'][choiceIndex].limit}`;
            }
        }

        item['choices'][choiceIndex]['subitems'][subitemIndex] = subitem;

        context.handleUpdateMainState({item})
    };

    const validateSubitemLimit = choice => {
        if (parseInt(choice.limit) === 0){
            return true;
        }

        const totalSelected = choice.subitems.reduce((total, subitem) => {
            return total + (subitem.selected ? 1 : 0)
        }, 0);
        return totalSelected < choice.limit;
    };

    return (
        <li>
            <label className="control control--radio">
                <div className="chek-box-holder">
                    <input type="checkbox" checked={!!subitem.selected} onChange={handleSubitemSelect} name={subitem.name_en}/>
                    <div className="control__indicator"/>
                </div>
                <p>{subitem.name_en}{subitem.price && parseInt(subitem.price) !== 0 ? ` ${subitem.price}$` : ''}</p>
            </label>
            <span className="error" style={{display: 'none'}}>*Required field</span>
        </li>

    );
};

export default SubItem;