import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    this.focusInputIfPropFocusedSet = this.focusInputIfPropFocusedSet.bind(
      this
    );
  }

  focusInputIfPropFocusedSet(input) {
    if (input != null && this.props.focused) {
      input.focus();
    }
  }

  render() {
    const { placeholder, onSearch } = this.props;
    return (
      <div>
        <Input.Search
          ref={inputRef => {
            this.focusInputIfPropFocusedSet(inputRef);
          }}
          placeholder={placeholder}
          onSearch={onSearch}
          enterButton
        />
      </div>
    );
  }
}

FilterDropdown.propTypes = {
  placeholder: PropTypes.string,
  focused: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

FilterDropdown.defaultProps = {
  placeholder: null,
  focused: false,
};

export default FilterDropdown;
