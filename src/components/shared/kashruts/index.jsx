import React, {useContext} from 'react';
import MainContext from './../../../context/cart-context';
import Show from "./show";

const Index = () => {
    const context = useContext(MainContext);
    let {kashruts} = context;

    return (
        <div className={'item-box'}>
            <h4 className="title"> Hachshar</h4>
            <div className="list-item">
                <ul id="tag">
                    {kashruts && (
                        kashruts.map((tag, index) => (
                            <Show key={index} tag={tag}/>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Index;