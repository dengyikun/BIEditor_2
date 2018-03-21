import React from 'react';
import {connect} from 'dva';
import {message, Icon} from 'antd'
import styles from './Header.less';

function mapStateToProps(state) {
  const {list} = state.item;
  return {
    list
  };
}

function Header({dispatch, list}) {

  const upload = () => {
    dispatch({
      type: 'item/savePage',
      payload: {
        list
      },
      callback: (data) => {
        if (data.code === 200) {
          message.success(data.data)
        } else {
          message.error(data.data)
        }
      }
    })
  }

  return (
    <div className={styles.body}>
      <div className={styles.logo}>
      </div>
      <Icon type="upload" className={styles.upload} onClick={upload}/>
    </div>
  );
}

export default connect(mapStateToProps)(Header)
