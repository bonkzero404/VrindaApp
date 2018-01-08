/* @flow */
/* eslint no-confusing-arrow: 0 */
import React, { PureComponent } from 'react';
import type { Element } from 'react';
import { Redirect, Route } from 'react-router-native';
import { connect } from 'react-redux';

type PropTypes = {
  isAuthenticated: Boolean,
  component: Element<*>,
  location: any,
}

class PrivateRouteContainer extends PureComponent<PropTypes> {
  render() {
    const {
      isAuthenticated,
      component: PureComponent,
      location,
      ...props
    } = this.props;

    return (
      <Route
        {...props}
        render={allProps =>
          isAuthenticated
          ? <PureComponent {...allProps} />
          : (
            <Redirect to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}

const PrivateRoute = connect(state => ({
  isAuthenticated: state.userdata.user.valid,
}))(PrivateRouteContainer);

export default PrivateRoute;
