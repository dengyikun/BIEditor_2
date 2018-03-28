import dva, {connect} from 'dva';
import React from 'react';
import {LocaleProvider} from 'antd';
import createHistory from 'history/createBrowserHistory';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from './editor.less';
import Header from './components/Header/Header';
import LeftAside from './components/LeftAside/LeftAside';
import ItemList from './components/ItemList/ItemList';
import RightAside from './components/RightAside/RightAside';
import Footer from './components/Footer/Footer';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
const models = require.context('./models', true, /^\.\/.*\.js$/);
models.keys().map((key) => { app.model(models(key)) });

// // 4. Router
app.router(() => <LocaleProvider locale={zhCN}>
  <div className={styles.body}>
    <header>
      <Header/>
    </header>
    <aside className={styles.left}>
      <LeftAside/>
    </aside>
    <main>
        <ItemList isEdit={true}/>
      <footer>
        <Footer/>
      </footer>
    </main>
    <aside className={styles.right}>
      <RightAside/>
    </aside>
  </div>
</LocaleProvider>);

// 5. Start
app.start('#root');
