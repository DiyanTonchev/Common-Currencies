import React, {Component} from 'react';

import Title from './Title.js';

class Header extends Component {
    handleChange(ev) {
        const title = ev.target.value;
        this.props.changeTitle(title);
    }

    render() {
        return (
            <header>
                <Title title={this.props.title} />
                <input value={this.props.title} onChange={this.handleChange.bind(this) } />
            </header>
        );
    }
}

export default Header;