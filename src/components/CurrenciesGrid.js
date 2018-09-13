import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');

const COLUMN_DEFS = [
  {
    key: 'name',
    name: 'Name',
    sortable: true,
    sort: 'asc',
    filterable: true
  },
  {
    key: 'code',
    name: 'Code',
    sortable: true,
    filterable: true
  },
  {
    key: 'decimal_digits',
    name: 'Decimal Digits',
    sortable: true,
    filterable: true
  }
];

class CurrenciesGrid extends Component {

  state = {
    filters: {},
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

  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({ sortColumn, sortDirection });
  };

  handleFilterChange = (filter) => {
    let { newFilters } = this.state.filters;
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }

    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    this.setState({ filters: {} });
  };

  render() {
    return (
        <ReactDataGrid
          columns={COLUMN_DEFS}
          rowGetter={this.rowGetter}
          enableCellSelect={true}
          rowsCount={this.getSize()}
          minHeight={500}
          toolbar={<Toolbar enableFilter={true} />}
          onGridSort={this.handleGridSort}
          onAddFilter={this.handleFilterChange}
          onClearFilters={this.onClearFilters} />
    );
  }
}

export default CurrenciesGrid;