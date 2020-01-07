import React, {useContext} from 'react';
import AppContext from './../context/cart-context';

import Layout from "../hoc/Layout";

const Closed = () => {
    const context = useContext(AppContext);

    return (
        <Layout>
            <h3 style={{padding: '30px 52px'}}>
                Thank You visiting,  <br/>
                {context.websiteClosedText}<br/><br/>

                Kitcheninns<br/><br/>
            </h3>
        </Layout>
    );
};

export default Closed;
