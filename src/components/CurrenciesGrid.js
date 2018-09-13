import React, { Component } from 'react';
import { DataTable } from 'react-data-components';
import 'react-data-components/css/table-twbs.css';

const COLUMN_DEFS = [
  { title: 'Name', prop: 'name' },
  { title: 'Code', prop: 'code' },
  { title: 'Decimal Digits', prop: 'decimal_digits' }
];

class CurrenciesGrid extends Component {

  state = {
    isLoaded: false,
    rows: []
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

  render() {
    let { rows } = this.state
    return (
        <DataTable
          className="table table-bordered"
          keys="name"
          columns={COLUMN_DEFS}
          initialPageLength={20}
          pageLengthOptions={[ 5, 20, 50 ]}
          initialData={rows}
          initialSortBy={{ prop: 'name', order: 'ascending' }}
        />
    );
  }
}

export default CurrenciesGrid;