import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  const { portfolios, tokensMaster} = props;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout
          portfolios={portfolios}  
        >
          <Component 
            portfolios={portfolios}
            tokensMaster={tokensMaster}
            {...props} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithLayout;
