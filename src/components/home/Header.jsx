import React, {useContext} from 'react';
import Find from './find';
import AppContext from './../../context/cart-context';

const Header = props => {
    let context = useContext(AppContext);

    const handleTerm = () => {
        let term = !context.term;
        context.handleUpdateMainState({term});
    };

    return (
        <header className="header-area text-white xs-center v4" id="home-page">
            <div className="table-cell">
                <div className="container">
                    <div className="row middle-row">
                        <div className="col-sm-6">
                            <h2 className="heading-1 text-black wow fadeInUp">Quick, Easy, Smart</h2>
                            <label className="control control--checkbox">
                                <input type="checkbox" name="tag" onChange={handleTerm} checked={context.term}/>
                                <div className="control__indicator"/>
                                <span id="cb-tags-title0">I agree to the Terms of Use</span>
                            </label>
                            <Find {...props}/>
                        </div>
                        <div className="col-sm-6"/>
                    </div>
                </div>
            </div>
        </header>
    )

};

export default Header;
