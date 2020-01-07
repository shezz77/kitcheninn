import React from 'react';

import Layout from "../hoc/Layout";
import About from './../components/home/About'
import HowItWorks from './../components/home/HowItWorks'
import Header from "../components/home/Header";
import AppContext from './../context/cart-context';
import BetaModal from "../components/home/popups/beta";


class HomeContainer extends React.Component {
    static contextType = AppContext;

    componentDidMount() {
        this.getLocation()
    }

    getLocation = () => {
        let {find} = this.context;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            find.location.message = "Geolocation is not supported by this browser.";
        }

        this.setState({find})
    };

    showPosition = (position) =>  {
        let {find} = this.context;
        find.location.latitude = position.coords.latitude;
        find.location.longitude = position.coords.longitude;
        this.setState({find});
    };


    render() {
        return (
            <Layout homeHeader={true}>
                <Header/>
                <HowItWorks/>
                <About/>
                <BetaModal />
            </Layout>
        );
    }
}


export default HomeContainer;