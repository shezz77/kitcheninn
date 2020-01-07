import React, { useContext } from 'react';

// import Food2YouWhite from './../../assets/images/Food2YouWhite.png';
// import Cart from './../../assets/images/cart.png';
import HeaderLogo from "../../assets/images/Food2YouWhite.png";
import {navigate} from "../shared/services";
import CartContext from './../../context/cart-context';
import {LANGUAGES} from "../../utils/globals";


const TopMenu2 = (props) => {
    const context = useContext(CartContext);
    const {layout} = context;

    const handleCityChange = e => {
        let { find } = context;
        find.city = e.target.value;

        context.handleUpdateMainState({ find });
    };

    const handleFindRestaurantBtn = () => {
        navigate(props, `/restaurants/${context.find.city}`)
    };

    if(layout.language === LANGUAGES.ENGLISH){
        return (
            <header id="header">
                <div className="container">
                    <div className="logo">
                        <a href="/">
                            <img alt="" src={HeaderLogo}/>
                        </a>
                    </div>
                    {/*<form id="mc-form" className="subscrie-form green formHeader pull-right">*/}
                        {/*<div className="select">*/}
                            {/*<select name="city" onChange={handleCityChange} value={context.find.city} id="slct">*/}
                                {/*<option>Select City</option>*/}
                                {/*{context.find.cities && (*/}
                                    {/*context.find.cities.map((obj, index) => (*/}
                                        {/*<option key={index} value={obj.id}>{obj.name_en}</option>*/}
                                    {/*))*/}
                                {/*)}*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        {/*<button type="submit" onClick={handleFindRestaurantBtn} className="submit button hoverable"><div className={'anim'}/>FIND RESTAURANT</button>*/}
                    {/*</form>*/}
                    {/*<ul className="button-holder">*/}
                    {/*<li><a href="#sa">Log in</a></li>*/}
                    {/*<li><a href="#sa"><button type="button" className="btn btn-success">Create an account</button></a></li>*/}
                    {/*</ul>*/}
                </div>
            </header>
        );
    }
    else {
        return (
            <header id="header">
                <div className="container">

                    <form id="mc-form" className="subscrie-form green formHeader pull-left">
                        <button type="submit" onClick={handleFindRestaurantBtn} className="submit button hoverable"><div className={'anim'}/>מצא מסעדה</button>

                        <div className="select">
                            <select name="city" onChange={handleCityChange} value={context.find.city} id="slct">
                                <option>בחר עיר</option>
                                {context.find.cities && (
                                    context.find.cities.map((obj, index) => (
                                        <option key={index} value={obj.id}>{obj.name_he}</option>
                                    ))
                                )}
                            </select>
                        </div>
                    </form>
                    <div className="logo">
                        <a href="/">
                            <img alt="" src={HeaderLogo}/>
                        </a>
                    </div>
                    {/*<ul className="button-holder">*/}
                    {/*<li><a href="#sa">Log in</a></li>*/}
                    {/*<li><a href="#sa"><button type="button" className="btn btn-success">Create an account</button></a></li>*/}
                    {/*</ul>*/}
                </div>
            </header>
        );
    }


};

export default TopMenu2;