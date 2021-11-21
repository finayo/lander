import React from 'react';
import Loader  from './Loader';
//function WithLoading(Component) {
const HOC = Component => {
  return function WithLoadingComponent({ isLoading, ...props }) {
	if (!isLoading) return (<Component {...props} />);
    return <Loader />;
  }
}
export default HOC;