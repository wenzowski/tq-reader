import React from 'react';
import {render} from 'react-dom';
import {Store} from 'react-chrome-redux';
import Root from '../../app/containers/Root';
import * as pages from '../../app/constants/Pages';
import {TQ_READER_REDUX_STORE} from '../../app/constants/Ports';
import './reader.css';

const store = new Store({portName: TQ_READER_REDUX_STORE});
const params = new URLSearchParams(location.search.slice(1));
const url = decodeURIComponent(params.get('url'));

document.addEventListener('DOMContentLoaded', () => {
  const unsubscribe = store.subscribe(() => {
    unsubscribe();
    render(
      <Root store={store} page={pages.READER_PAGE} url={url}/>,
      document.querySelector('#root')
    );
  });
});

// https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en
// let params = new URLSearchParams(location.search.slice(1));
// params.has('tab') // => true
// params.set('bookmark', 'uuid-324')
// window.history.replaceState({}, '', `${location.pathname}?${params}`);
