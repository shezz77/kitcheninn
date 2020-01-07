import React, {useContext} from 'react';
import TopMenu from './../components/layout/TopMenu';
import TopMenu2 from './../components/layout/TopMenu2';
import Footer from './../components/layout/Footer';
import AppContext from './../context/cart-context';
import {LANGUAGES} from "../utils/globals";
import Login from "../components/shared/login";
// import { withStyles } from '@material-ui/core/styles';
import SweetAlert from 'sweetalert-react';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

// const styles = theme => ({
//     close: {
//         padding: theme.spacing.unit / 2,
//     },
// });


const Layout = props => {
    const context = useContext(AppContext);
    const {layout, showLoginModal, messages, handleUpdateMainState} = context;
    // const { classes } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        messages.status = false;
        messages.text = '';

        handleUpdateMainState({ messages });
    };

    return (
        <div className={layout.language === LANGUAGES.HEBREW ? 'hebrew' : ''}>

            {props.homeHeader ? (
                <TopMenu/>
            ) : (
                <TopMenu2/>
            )}

            {props.children}

            <Footer/>

            {showLoginModal && (
                <Login/>
            )}

            <SweetAlert
                show={messages.status}
                title={messages.type === 'error' ? 'Something wrong!!!' : 'Congrats!!!'}
                type={messages.type}
                text={messages.text}
                onConfirm={handleClose}
            />


            {/*<Snackbar*/}
            {/*anchorOrigin={{*/}
            {/*vertical: 'bottom',*/}
            {/*horizontal: 'left',*/}
            {/*}}*/}
            {/*open={messages.status}*/}
            {/*autoHideDuration={6000}*/}
            {/*onClose={handleClose}*/}
            {/*ContentProps={{*/}
            {/*'aria-describedby': 'message-id',*/}
            {/*}}*/}
            {/*message={<span id="message-id">{}</span>}*/}
            {/*action={[*/}
            {/*<Button key="undo" color="secondary" size="small" onClick={handleClose}>*/}
            {/*UNDO*/}
            {/*</Button>,*/}
            {/*<IconButton*/}
            {/*key="close"*/}
            {/*aria-label="Close"*/}
            {/*color="inherit"*/}
            {/*className={classes.close}*/}
            {/*onClick={handleClose}*/}
            {/*>*/}
            {/*<CloseIcon />*/}
            {/*</IconButton>,*/}
            {/*]}*/}
            {/*/>*/}
        </div>
    );
};

export default Layout;
