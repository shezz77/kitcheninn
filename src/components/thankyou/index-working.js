import React from 'react';
// import moment from 'moment';
// import MainContext from './../../context/cart-context';

const ThankyouIndex = () => {
    // const context = useContext(MainContext);
    // let {restaurant, orderConfirmInfo, cart} = context;
    // let {items} = cart;

    return (
        <div className={'container'}>
            {/*<div className={'container'}>*/}
                {/*<div className="text-holder" style={{paddingTop: '25px'}}>*/}
                    {/*<h3>Thank you for ordering from Kitcheninns.</h3>*/}
                    {/*<h3>The order details have been sent to your email address.</h3>*/}
                    {/*<h3>For any questions we would like you to contact us on the site. Or customer service. 02-5006076.*/}
                    {/*</h3><h3>With appetite!</h3>*/}
                {/*</div>*/}
            {/*</div>*/}


                <div className="text-holder" style={{ paddingTop: '25px' }}>
                    <div className="row">
                        <div className="col-xs-6">
                            <div className="single-service text-left">
                                <h4 className="title">תודה!</h4>
                                <p>ההזמנה שלך התקבלה.</p>
                                <p>רוכב של המסעדה יהיה במקום שלך בסביבה.</p>
                                <h4 className="green-heading">test</h4>
                            </div>

                            <div className="single-service text-left">
                                <h4 className="title">צריך תמיכה</h4>
                                <p>ההזמנה שלך מ <br/><strong>test</strong></p>
                                <a href={'#sa'}><i className={'fa fa-phone'}/>  +972 58-760-6220</a>
                            </div>
                        </div>
                        <div className="col-xs-6">
                            <div className="single-service text-left">
                                <h4 className="title">פרטי הזמנה</h4>
                                <ol className="rectangle-list">
                                    <li className={'active'}><a href="#sa">State One</a></li>
                                    <li><a href="#sa">State Two</a></li>
                                    <li><a href="#sa">State Three</a></li>
                                    <li><a href="#sa">State Four</a></li>
                                </ol>
                            </div>
                        </div>
                    </div>
            </div>

        </div>
    );
};

export default ThankyouIndex;
