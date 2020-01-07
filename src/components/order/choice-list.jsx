import React from 'react';
import Choice from './choice';

const ChoiceList = props => {
    let { choices } = props;

    return (
        <>
            {choices && (
                choices.map((choice , index) => (
                    <Choice
                        key={index}
                        choiceIndex={index}
                        choice={choice}
                    />
                ))
            )}
        </>
    );
};

export default ChoiceList;