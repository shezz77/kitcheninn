import React, {useContext} from 'react';
import MainContext from './../../../context/cart-context';
import Show from "./show";

const Index = () => {
    const context = useContext(MainContext);
    let {tags} = context;

    return (
        <div className={'item-box'}>
            <h4 className="title"> Cusine</h4>
            <div className="list-item">
                <ul id="tag">
                    {tags && (
                        tags.map((tag, index) => (
                            <Show key={index} tag={tag}/>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Index;