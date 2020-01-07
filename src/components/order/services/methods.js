export const calculateItemPrice = item => {
    let price = parseFloat(item.price);
    let {choices} = item;

    choices.forEach(choice => {
        choice.subitems.forEach(subitem => {
            if (subitem.selected) {
                price += parseFloat(subitem.price);
            }
        })

    });

    if (item.quantity) {
        price = price * parseFloat(item.quantity);
    }

    return price;
};


export const calculateItemsGrandTotalPrice = items => {
    let price = 0;

    items.forEach(item => {
       price += calculateItemPrice(item);
    });

    return price;
};



export const addToCartItemProcess = item => {
    item.quantity = 1;
    return item;
};

export const subitemNames = item => {
    let subitems = "";
    let {choices} = item;

    choices.forEach(choice => {
        choice.subitems.forEach(subitem => {
            if (subitem.selected) {
                subitems = `${subitems} ${subitem.name_en} ,`;
            }
        })

    });

    return subitems;
};