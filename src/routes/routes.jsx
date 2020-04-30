import Home from '../containers/home';
import Home2 from '../containers/home2';
import Restaurant from '../containers/restaurant';
import Order from '../containers/order';
import ConfirmOrder from '../containers/confirm-order';
import OrderCompletion from '../components/pages/order-completion';
// import Privacy from '../containers/privacy';
import ThankYou from '../containers/thankYou';
import ThankYouW from '../containers/thankYou-working';
import Auth from './../hoc/Auth';
import Closed from "../containers/closed";
import DynamicPrivacy from './../containers/dynamic-privacy';

const appRoutes = [
    {
        path: "/",
        title: "Home",
        component: Auth(Home2)
    },
    {
        path: "/home2",
        title: "Home2",
        component: Auth(Home)
    },
    {
        path: "/restaurants/order/:restaurant_id",
        title: "Order",
        component: Auth(Order)
    },
    {
        path: "/restaurants/:day/:lat/:lon",
        title: "Restaurant",
        component: Auth(Restaurant)
    },
    {
        path: "/confirm-order",
        title: "ConfirmOrder",
        component: Auth(ConfirmOrder)
    },
    {
        path: "/confirm-order/completion",
        title: "OrderCompletion",
        component: Auth(OrderCompletion)
    },
    {
        path: "/privacy/:appName",
        title: "Dynamic privacy",
        component: DynamicPrivacy
    },
    {
        path: "/thankyou",
        title: "Thank You",
        component: Auth(ThankYou)
    },
    {
        path: "/thankyou",
        title: "Thank You",
        component: Auth(ThankYouW)
    },
    {
        path: "/closed",
        title: "Closed",
        component: Auth(Closed)
    },
    {
        redirect: true,
        path: "*",
        to: "/",
        component: Auth(Home)
    }
];

export default appRoutes
