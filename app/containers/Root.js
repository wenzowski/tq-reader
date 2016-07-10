import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import BookmarkApp from './BookmarkApp';
import ReaderApp from './ReaderApp';
import * as pages from '../constants/Pages';

export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    page: PropTypes.string.isRequired
  };

  render() {
    const {store, page} = this.props;
    return (
      <Provider store={store}>
        {this.renderPage(page)}
      </Provider>
    );
  }

  renderPage(page) {
    switch (page) {
      case pages.BOOKMARK_PAGE: return this.renderBookmarkApp();
      case pages.READER_PAGE: return this.renderReaderApp();
      default: throw new Error('missing page declaration');
    }
  }

  renderBookmarkApp() {
    return (
      <BookmarkApp {...this.props}/>
    );
  }

  renderReaderApp() {
    return (
      <ReaderApp {...this.props}/>
    );
  }
}
