import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';

class SearchField extends Component {
    render() {
        let { placeholder, search } = this.props;
        return (
            <DebounceInput
                debounceTimeout={250}
                className={'form-control'}
                type='text'
                placeholder={placeholder}
                onChange={search}
            />
        );
    }
}

export default SearchField;