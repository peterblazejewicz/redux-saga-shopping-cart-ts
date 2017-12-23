import App from './App';
import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom';
import './index.css';

render(<App />, document.getElementById('root'));
registerServiceWorker();
