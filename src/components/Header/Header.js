import React from 'react';
import {connect} from 'dva';
import {message, Icon, Popover, Menu, Button} from 'antd'
import {Chrome} from 'react-color'
import styles from './Header.less';

function mapStateToProps(state) {
  const {list, pageWidth, pageHeight, autoResize, style,} = state.page;
  return {
    list,
    pageWidth,
    pageHeight,
    autoResize,
    style,
  };
}

function Header({dispatch, list, pageWidth, pageHeight, autoResize, style,}) {

  const settingContent = <Menu className={styles.settingMenu}>
    <Menu.Item>
      页面参数
      <Button className={styles.paramSetting} size={'small'} type={'primary'}>设置</Button>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      背景颜色
      <div className={styles.bgColorSetting} style={{backgroundColor: style.backgroundColor}}>
      </div>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      刷新频率
    </Menu.Item>
  </Menu>

  const upload = () => {
    dispatch({
      type: 'page/savePage',
      payload: {
        list,
        pageWidth,
        pageHeight,
        autoResize,
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
      <Popover placement="bottom" content={settingContent} overlayClassName={styles.settingPopover}>
        <Icon type="setting" className={styles.setting}/>
      </Popover>
      <Icon type="upload" className={styles.upload} onClick={upload}/>
    </div>
  );
}

export default connect(mapStateToProps)(Header)
