import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
            <input
                className={`form-control`}
                type='text'
                defaultValue={this.props.defaultValue}
                placeholder={this.props.placeholder}
                onKeyUp={this.props.search} />
        );
    }
}

export default SearchField;