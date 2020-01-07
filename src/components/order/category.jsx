import React from 'react';
import Items from './items';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem, AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

const Category = props => {
    let {items} = props.category;
    return (
        <li>
            <Accordion allowZeroExpanded={true} allowMultipleExpanded={false}>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            {props.category.name_en}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <Items
                            items={items}
                        />
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </li>
    );
};

export default Category;