import dva, { connect } from 'dva';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import styles from './index.css';

let IndexPage = connect()(function() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
});

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// // 4. Router
app.router(() => <IndexPage />);

// 5. Start
app.start('#root');
