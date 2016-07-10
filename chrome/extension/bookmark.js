import React from 'react';
import {render} from 'react-dom';
import {Store} from 'react-chrome-redux';
import Root from '../../app/containers/Root';
import * as pages from '../../app/constants/Pages';
import {TQ_READER_REDUX_STORE} from '../../app/constants/Ports';
import Harvester from './bookmark/Harvester';
import './bookmark.css';

const store = new Store({portName: TQ_READER_REDUX_STORE});
const harvester = new Harvester(store);

document.addEventListener('DOMContentLoaded', async () => {
  const tab = await harvester.getCurrentTab();
  const unsubscribe = store.subscribe(() => {
    unsubscribe();
    render(
      <Root store={store} page={pages.BOOKMARK_PAGE} harvester={harvester} tab={tab}/>,
      document.querySelector('#root')
    );
  });
  await harvester.bookmark(tab).catch(error => console.log(error));
});
