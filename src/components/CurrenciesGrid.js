import React, { Component } from 'react';
import SearchField from './SearchField';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class CurrenciesGrid extends Component {

    state = {
        isLoaded: false,
        rows: []
    }

    constructor(props) {
        super(props);

        this.options = {
            defaultSortName: 'name',
            defaultSortOrder: 'asc',
            searchField: (properties) => {
                return (<SearchField {...properties} />)
            },
            onSearchChange: this.onSearchChange
        };
    }

    componentDidMount() {
        fetch("../../common-currencies.json")
            .then(res => res.json())
            .then((result) => {
                let rows = this.createRows(result);
                this.setState({
                    isLoaded: true,
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

    // onSearchChange = (searchText, colInfos, multiColumnSearch) => {
    //     debugger
    //   }
    createRows = (items) => {
        let rows = [];
        for (let key in items) {
            rows.push({
                name: items[key].name,
                code: items[key].code,
                decimal_digits: items[key].decimal_digits,
                symbol: items[key].symbol,
                symbol_native: items[key].symbol_native,
                rounding: items[key].rounding,
                name_plural: items[key].name_plural              
            });
        }

        return rows;
    };

    render() {
        let { rows } = this.state
        return (
                <BootstrapTable data={rows} options={this.options} search hover>
                    <TableHeaderColumn dataField='name' isKey dataSort>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='code' dataSort>Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='decimal_digits' dataSort>Decimal Digits</TableHeaderColumn>
                    <TableHeaderColumn dataField='symbol' dataSort hidden>Symbol</TableHeaderColumn>
                    <TableHeaderColumn dataField='symbol_native' dataSort hidden>Symbol Native</TableHeaderColumn>
                    <TableHeaderColumn dataField='rounding' dataSort hidden>Rounding</TableHeaderColumn>
                    <TableHeaderColumn dataField='name_plural' dataSort hidden>Name Plural</TableHeaderColumn>
                </BootstrapTable>
        );
    }
}

export default CurrenciesGrid;