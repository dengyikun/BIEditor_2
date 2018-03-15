import {Icon} from 'antd';
import styles from './LeftAside.less';

export default [  // 基础控件
  {
    item: {
      name: '容器',
      parentId: 'base',
      width: 300,
      height: 300,
      type: 'container',
      style: {background: '#' + (~~(Math.random() * (1 << 24))).toString(16)}
    },
    node: <div className={styles.widget}>
      <Icon className={styles.icon} type="layout"/>
      容器组件
    </div>
  },
]
