import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import CodeTranslator from './CodeTranslator';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <CodeTranslator />
  </Router>
);
