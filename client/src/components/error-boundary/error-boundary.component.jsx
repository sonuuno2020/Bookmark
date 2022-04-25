import React from 'react';

import ErrorPopup from '../error-popup/error-popup.component';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false
    }
  }
  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasErrored: true };
  }
  componentDidCatch(error, info) {
  }

  render() {
    // const { message } = this.props;
    console.log(this.state)
    if (this.state.hasErrored) {
      window.jQuery("#errorPopup").modal("show");
      return (
        <div>
          <ErrorPopup message='error' />
          {this.props.children}
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;