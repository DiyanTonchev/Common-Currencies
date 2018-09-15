import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DebounceInput } from 'react-debounce-input';

class SearchField extends Component {
    getValue() {
        let value = ReactDOM.findDOMNode(this).value;
        return value;
    }

    setValue(value) {
        ReactDOM.findDOMNode(this).value = value;
    }

    render() {
        return (
            <DebounceInput
                debounceTimeout={250}
                className={`form-control`}
                type='text'
                placeholder={this.props.placeholder}
                onChange={this.props.search} />
        );
    }
}

export default SearchField;