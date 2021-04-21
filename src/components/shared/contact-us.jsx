import React, {useContext} from 'react';
import ReactModal from 'react-modal';
import AppContext from './../../context/cart-context';
import {api} from "../../utils/request";

ReactModal.setAppElement('#root');

const ContactUs = () => {
    const context = useContext(AppContext);
    let {contactUs, messages} = context;

    const handleSubmit = e => {
        e.preventDefault();
        api('contact-us', 'post', {...contactUs})
            .then(res => {
                console.log(res);
                contactUs.show = false;
                messages.status = true;
                messages.type = 'success';
                messages.text = "Contact form submitted";

                context.handleUpdateMainState({messages, contactUs});
            }).catch(error=>{
                console.log(error)
        })

    };

    const handleFieldsChange = e => {
        contactUs[e.target.name] = e.target.value;
        context.handleUpdateMainState({contactUs});
    };

    const closeContactUsModal = e => {
        e.preventDefault();
        contactUs.show = false;
        context.handleUpdateMainState({contactUs});
    };

    return (
        <ReactModal
            isOpen={contactUs.show}
        >
            <button className="close" onClick={closeContactUsModal} type="button"><span className="f white" aria-hidden="true">×</span></button>
            <form onSubmit={handleSubmit} className="smart-form popup">
                <div className="row">
                    <div className="col-sm-6">
                        <label className="input">
                            <i className="icon-prepend fa fa-user"/>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                onChange={handleFieldsChange}
                            />
                        </label>
                    </div>
                    <div className="col-sm-6">
                        <label className="input">
                            <i className="icon-prepend fa fa-envelope-o"/>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter E-mail"
                                onChange={handleFieldsChange}
                            />
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <label className="input">
                            <i className="icon-prepend fa fa-comments"/>
                            <textarea
                                className={'massage-box'}
                                name="text"
                                placeholder="Enter text"
                                onChange={handleFieldsChange}
                            />
                        </label>
                    </div>
                </div>
                    <button type="submit" className="btn-submit button hoverable">
                        <div className={'anim'}/>
                        Submit
                    </button>
            </form>
        </ReactModal>
    )
};

export default ContactUs;