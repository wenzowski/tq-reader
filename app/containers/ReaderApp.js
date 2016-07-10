import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import sanitizeHtml from '../utils/sanitize-html';
import * as BookmarkActions from '../actions/bookmarks';
import style from './ReaderApp.css';

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
    bookmarks: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const {bookmarks, url} = this.props;
    const bookmark = bookmarks[url];
    return (
      <div className={style.reader}>
        <h1>{bookmark.title}</h1>
        <ul className={style.subtitle}>
          <li className={style.original}>
            <a href={bookmark.uri.spec} target="_blank">View Original</a>
          </li>
          <li className={style.byline}>
            {bookmark.byline ? <span>By <strong>{bookmark.byline}</strong>, </span> : <span/>}
            {bookmark.uri.host}
          </li>
          <li className={style.timing}>
            {minutes(bookmark.length)}
          </li>
        </ul>
        <div className={style.article} dangerouslySetInnerHTML={sanitize(bookmark.content)}/>
      </div>
    );
  }
}

function sanitize(html) {
  return {
    __html: html
    // __html: sanitizeHtml(html)
  };
}

function minutes(length) {
  const cpm = 863; // see dx.doi.org/10.1167/iovs.11-8284
  const minutes = Math.round(length / cpm);
  if (minutes < 2) return '< 2 minute read';
  if (minutes < 60) return `~ ${minutes} minute read`;
  return `~ ${Math.round(minutes / 60)} hour read`;
}

// <p>{bookmark.excerpt}</p>
// <div>{bookmark.textContent}</div>
