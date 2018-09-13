import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid'

const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

class Table extends Component {
    constructor(props, context) {
        super(props, context);
        this._columns = [
            {
                key: 'name',
                name: 'Name',
                filterable: true
            },
            {
                key: 'code',
                name: 'Code',
                filterable: true
            },
            {
                key: 'decimal_digits',
                name: 'Decimal Digits',
                filterable: true
            }
        ];

        this.state = { filters: {} };
    }

    componentDidMount() {
        fetch("../../common-currencies.json")
            .then(res => res.json())
            .then((result) => {
                let rows = this.createRows(result);
                this.setState({
                    isLoaded: true,
                    items: result,
                    rows: rows
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    createRows = (items) => {
        let rows = [];
        for (let key in items) {
            rows.push({
                name: items[key].name,
                code: items[key].code,
                decimal_digits: items[key].decimal_digits
            });
        }  

        return rows;
    };

    getRows = () => {
        return Selectors.getRows(this.state);
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = (rowIdx) => {
        let rows = this.getRows();
        return rows[rowIdx];
    };

    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        // all filters removed
        this.setState({ filters: {} });
    };

    render() {
        return (
            <ReactDataGrid
                columns={this._columns}
                rowGetter={this.rowGetter}
                enableCellSelect={true}
                rowsCount={this.getSize()}
                minHeight={500}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={this.handleFilterChange}
                onClearFilters={this.onClearFilters} />);
    }
}

export default Table;