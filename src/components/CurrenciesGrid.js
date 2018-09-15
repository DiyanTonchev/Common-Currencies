import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import SearchField from './SearchField';

import './currencies-gird.css'

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
            searchField: () => {
                return (<SearchField search={this.onSearch} placeholder={'Search'} />)
            }
        };
    }

    componentDidMount() {
        fetch('data/common-currencies.json')
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
                        isLoaded: false,
                        error
                    });
                }
            )
    }

    createRows(items) {
        let rows = [];
        for (let key in items) {
            rows.push({
                name: items[key].name,
                code: items[key].code,
                decimal_digits: items[key].decimal_digits,
                symbol: items[key].symbol,
                name_plural: items[key].name_plural,
                searchMatch: false
            });
        }

        return rows;
    }

    onSearch = (e) => {
        let searchText = e.target.value;
        let { rows } = this.state;

        let newRows = rows.map((row) => {
            for (let col in row) {
                let hasMatched = false;
                if (isNaN(row[col]) && isNaN(searchText)) {
                    let cellValue = row[col].toLowerCase();
                    hasMatched = cellValue.includes(searchText.toLowerCase());
                } else if (searchText && !isNaN(searchText)) {
                    hasMatched = row[col] === Number(searchText)
                }

                if (hasMatched) {
                    row.searchMatch = true;
                    break;
                } else {
                    row.searchMatch = false;
                }
            }

            return row;
        });

        this.setState({ rows: newRows });
    }

    trClassFormat(row) {
        return row.searchMatch ? 'search-matched' : '';
    }

    render() {
        let { rows } = this.state;

        return (
            <BootstrapTable data={rows} options={this.options} trClassName={this.trClassFormat} search hover>
                <TableHeaderColumn dataField='name' isKey dataSort>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='code' dataSort>Code</TableHeaderColumn>
                <TableHeaderColumn dataField='decimal_digits' dataSort>Decimal Digits</TableHeaderColumn>
                <TableHeaderColumn dataField='symbol' hidden>Symbol</TableHeaderColumn>
                <TableHeaderColumn dataField='name_plural' hidden>Name Plural</TableHeaderColumn>
                <TableHeaderColumn dataField='searchMatch' hidden searchable={false}></TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default CurrenciesGrid;