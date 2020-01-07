import React, {useContext} from 'react';
import ReactModal from "react-modal";
import MainContext from './../../../context/cart-context';
import Beta from './../../../assets/images/beta-en.jpg';

const BetaModal = () => {
    const context = useContext(MainContext);

    const handleCloseModal = () => {
        let betaModal = false;
        context.handleUpdateMainState({betaModal});
    };
    return (
        <ReactModal
            isOpen={context.betaModal}
            contentLabel="Minimal Modal Example"
            className={'confrimOrderPopup'}
        >
            <div className="frame">
                <div className="baron">
                    <div id="scrollable" className="baron__scroller right add">
                        <div className="modal-header">
                            <button onClick={handleCloseModal}  className="close" type="button"><span className="f white"
                                                                           aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body">
                            <img className={'beta-img'} src={Beta} alt={''}/>
                        </div>
                    </div>
                </div>
            </div>

        </ReactModal>
    );
};
export default BetaModal;
