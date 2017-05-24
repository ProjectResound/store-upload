/* global document */

import React from 'react';
import { render } from 'react-dom';

require('../styles/main.sass');

const Header = require('./components/Header.jsx');
const Dropstrip = require('./components/dropstrip/Dropstrip.jsx');
const Explorer = require('./components/explorer/Explorer.jsx');
const Search = require('./components/search/Search.jsx');

render(<Header />, document.getElementById('header'));
render(<Dropstrip />, document.getElementById('dropzone'));
render(<Search />, document.getElementById('search'));
render(<Explorer />, document.getElementById('explorer'));
