import React from 'react';

const Loader = () => {
    return (
        <div id="loader_bg" style={{display: 'none'}}>
            <div className="box_layer yellow"></div>
            <div className="box_layer yellowDark"></div>
            <div className="box_layer orange"></div>
            <div className="box_layer orangeDark"></div>
        </div>
    );
};

export default Loader;