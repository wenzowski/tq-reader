import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {saveAs} from 'file-saver';
import * as BookmarkActions from '../actions/bookmarks';
import style from './BookmarkApp.css';

@connect(
  state => ({
    bookmarks: state.bookmarks.data // the proxy store is plain js not immutable
  }),
  dispatch => ({
    actions: bindActionCreators(BookmarkActions, dispatch)
  })
)
export default class BookmarkApp extends Component {

  static propTypes = {
    harvester: PropTypes.object.isRequired,
    tab: PropTypes.shape({
      url: PropTypes.string.isRequired
    }).isRequired,
    bookmarks: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const {bookmarks, tab} = this.props;
    const bookmark = bookmarks[tab.url];
    return (
      <div className={style.normal}>
        <h1>{this.renderTitle(bookmark)}</h1>
        <p>{this.renderActions()}</p>
      </div>
    );
  }

  renderTitle(bookmark) {
    const {tab} = this.props;
    if (isValid(tab)) {
      return (bookmark ? 'Saved' : 'Saving...');
    }
    return 'Oops';
  }

  renderActions() {
    const {tab} = this.props;
    if (isValid(tab)) {
      return (
        <span>
          <a href={`/reader.html?url=${encodeURIComponent(tab.url)}`} onClick={this.handleClickRead}>
            read
          </a>&nbsp;
          <a href="#" onClick={this.handleClickDownload}>download</a>
        </span>
      );
    }
    return (<span>Visit a website and click the button again.</span>);
  }

  handleClickRead = event => {
    if (event.target.href !== undefined) {
      if (chrome && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({url: event.target.href});
        event.preventDefault();
      }
    }
  }

  handleClickDownload = async () => {
    const {harvester, tab} = this.props;
    const blob = await harvester.dump(tab);
    saveAs(blob, 'page.mhtml');
  }
  // eventually this is going to be a webtorrent
  // first we need https://github.com/jimmywarting/StreamSaver.js
  // which required Chrome v52 (next major release)
  // handleClick = async () => {
    // const {harvester, tab} = this.props;
    // const blob = await harvester.dump(tab);
    // const blobStream = createBlobReader(blob);
    // const writeStream = createWriteStream('page.mht');
    // blobStream.pipeTo(writeStream);
  // }
}

function isValid(tab) {
  return (tab && tab.url.slice(0, 4) === 'http');
}

function isSaved(bookmark) {
  return Boolean(bookmark);
}
