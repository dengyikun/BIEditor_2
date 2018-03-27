import dva, {connect} from 'dva';
import React from 'react';
import {LocaleProvider} from 'antd';
import createHistory from 'history/createBrowserHistory';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import styles from './render.less';
import ItemList from './components/ItemList/ItemList';
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
  <div className={styles.listContainer} id="listContainer">
    <ItemList isEdit={false}/>
  </div>
</LocaleProvider>);

// 5. Start
app.start('#root');
