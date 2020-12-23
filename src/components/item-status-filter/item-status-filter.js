import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {

  state = {
    sortProp: 'all'
  };

  onSorted = (e) => {
    const sortProp = e.target.value;
    this.setState({
      sortProp
    });
    this.props.onSorted(sortProp);
  };

  render() {

    let classNames = ["btn btn-info", "btn btn-outline-secondary", "btn btn-outline-secondary"];

    if (this.state.sortProp === 'done') {
      classNames = ["btn btn-outline-secondary", "btn btn-outline-secondary", "btn btn-info"];
    }
    else if (this.state.sortProp === 'active') {
      classNames = ["btn btn-outline-secondary", "btn btn-info", "btn btn-outline-secondary"];
    }
    else {
      classNames = ["btn btn-info", "btn btn-outline-secondary", "btn btn-outline-secondary"];
    }

    return (
      <div className="btn-group">
        <button type="button"
                className={classNames[0]}
                value='all'
                onClick={this.onSorted} >
          All</button>
        <button type="button"
                className={classNames[1]}
                value="active"
                onClick={this.onSorted} >
          Active</button>
        <button type="button"
                className={classNames[2]}
                value="done"
                onClick={this.onSorted} >
          Done</button>
      </div>
    );
  }
}
