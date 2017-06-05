/* global document */

import React from 'react';
import { render } from 'react-dom';
import Header from './components/Header';
import Dropstrip from './components/dropstrip/Dropstrip';
import Explorer from './components/explorer/Explorer';
import Search from './components/search/Search';
import Errors from './components/errors/Errors';

require('../styles/main.sass');

render(<Header />, document.getElementById('header'));
render(<Dropstrip />, document.getElementById('dropzone'));
render(<Search />, document.getElementById('search'));
render(<Explorer />, document.getElementById('explorer'));
render(<Errors />, document.getElementById('errors'));
