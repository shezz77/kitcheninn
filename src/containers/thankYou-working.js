import React from 'react';
import Layout from "../hoc/Layout";
import ThankyouIndex from "../components/thankyou/index-working";

class ThankYou extends React.Component {


    render() {
        return (
            <Layout homeHeader={false}>
                <ThankyouIndex/>
            </Layout>
        );
    }
}


export default ThankYou;
