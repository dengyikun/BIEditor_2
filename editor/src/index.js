import dva, {connect} from 'dva';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import styles from './index.less';
import Items from './components/Items/Items';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));
// app.model(require("./models/users"));
app.model(require("./models/items"));

// // 4. Router
app.router(() => <div className={styles.body}>
  <header>
  </header>
  <aside className={styles.left}>
  </aside>
  <main>
    <Items/>
    <footer>
    </footer>
  </main>
  <aside className={styles.right}>
  </aside>
</div>);

// 5. Start
app.start('#root');
