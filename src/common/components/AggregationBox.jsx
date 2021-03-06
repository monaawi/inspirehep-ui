import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

class AggregationBox extends Component {
  render() {
    const { name, headerAction } = this.props;
    return (
      <div className="w-100 mb4 br1">
        <Row type="flex" justify="space-between">
          <Col>
            <h3 className="pb1">{name}</h3>
          </Col>
          <Col>{headerAction}</Col>
        </Row>
        <Row className="w-100">{this.props.children}</Row>
      </div>
    );
  }
}

AggregationBox.propTypes = {
  headerAction: PropTypes.node,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
};

AggregationBox.defaultProps = {
  headerAction: null,
  children: null,
};

export default AggregationBox;
