import React, {useContext} from 'react';
import AppContext from './../../context/cart-context';

const Search = props => {
    const context = useContext(AppContext);
    const {find} = context;

    const handleSubmit = e => {
        e.preventDefault();
        props.fetchRestaurants()
    };

    const handleChange = e => {
        find.searchKey = e.target.value;
        context.handleUpdateMainState({find});
    };

    return (
        <form onSubmit={handleSubmit} className={'search-form'}>
            <input type={'search'} name={'searchKey'} onChange={handleChange} value={find.searchKey} className={'form-control'}/>
            <button className={'btn-search button hoverable'} type={'submit'}>
                <div className={'anim'}/>
                <i className={'fa fa-search'}/>
            </button>
        </form>
    );
};

export default Search;