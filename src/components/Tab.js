import React from 'react';
import PropTypes from 'prop-types';

export class Tab extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(event) {
    event.preventDefault();
    this.props.onClick(this.props.tabIndex);
  }

  render() {
    return (
      <li className="tab">
        <a className={`tab-link ${this.props.linkClassName} ${this.props.isActive ? 'active' : ''}`}
           onClick={this.handleTabClick}>
          <i className={`tab-icon ${this.props.iconClassName}`}/>
        </a>
      </li>
    );
  }
}

Tab.propTypes = {
  onClick      : PropTypes.func,
  tabIndex     : PropTypes.number,
  isActive     : PropTypes.bool,
  iconClassName: PropTypes.string.isRequired,
  linkClassName: PropTypes.string.isRequired
};

