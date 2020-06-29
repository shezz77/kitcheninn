import React  from 'react';

// import Food2YouWhite from './../../assets/images/Food2YouWhite.png';
// import Cart from './../../assets/images/cart.png';
// import HeaderLogo from "../../assets/images/Food2YouWhite.png";
import kiWhiteLogo from './../../assets/images/logo-transparent.png';

// import {navigate} from "../shared/services";
// import CartContext from './../../context/cart-context';
// import {LANGUAGES} from "../../utils/globals";


const TopMenu2 = (props) => {
    // const context = useContext(CartContext);
    // const {layout} = context;

    // const handleCityChange = e => {
    //     let { find } = context;
    //     find.city = e.target.value;
    //
    //     context.handleUpdateMainState({ find });
    // };
    //
    // const handleFindRestaurantBtn = () => {
    //     navigate(props, `/restaurants/${context.find.city}`)
    // };

    return (
        <header id="header">
            <div className="container">
                <div className="logo">
                    <a style={{ width: '100px'}} href="/">
                        <img style={{maxWidth: '80%'}} alt="" src={kiWhiteLogo}/>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default TopMenu2;