import React from 'react';
import {connect} from 'dva';
import {message, Icon, Popover, Menu, Button, Input, Switch} from 'antd'
import {ChromePicker} from 'react-color'
import styles from './Header.less';

function mapStateToProps(state) {
  const {list, pageWidth, pageHeight, autoResize, style, refresh,} = state.page;
  return {
    list,
    pageWidth,
    pageHeight,
    autoResize,
    style,
    refresh,
  };
}

function Header({dispatch, list, pageWidth, pageHeight, autoResize, style, refresh}) {

  const onChangeComplete = color => {
    const rgba = color.rgb
    dispatch({
      type: 'page/setStyle',
      payload: {
        backgroundColor: `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`,
      }
    })
  }

  const onRefreshChange = e => {
    let value = e.target.value
    value = parseInt(value) > 0 ? parseInt(value) : 0
    dispatch({
      type: 'page/set',
      payload: {
        refresh: value,
      }
    })
  }

  const onAutoResizeChange = value => {
    dispatch({
      type: 'page/setAutoResize',
      payload: value
    })
  }

  const settingContent = <Menu className={styles.settingMenu}>
    <Menu.Item>
      页面参数
      <Button className={styles.paramSetting} size={'small'} type={'primary'}>设置</Button>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      背景颜色
      <Popover placement="leftTop" overlayClassName={styles.settingPopover} trigger={'click'}
               content={<ChromePicker color={style.backgroundColor} onChangeComplete={onChangeComplete}/>}>
        <div className={styles.bgColorSetting} style={{backgroundColor: style.backgroundColor}}>
        </div>
      </Popover>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      刷新频率
      <div className={styles.refreshSetting}>
        <Input size={'small'} addonAfter={'秒'}
               value={refresh} onChange={onRefreshChange}/>
      </div>
    </Menu.Item>
    <Menu.Divider/>
    <Menu.Item>
      适应分辨率
      <Switch className={styles.resizeSetting} size="small"
              checked={autoResize} onChange={onAutoResizeChange}/>
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
        style,
        refresh,
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
      <Popover placement="bottom" content={settingContent} trigger={'click'}
               overlayClassName={styles.settingPopover}>
        <Icon type="setting" className={styles.setting}/>
      </Popover>
      <Icon type="upload" className={styles.upload} onClick={upload}/>
    </div>
  );
}

export default connect(mapStateToProps)(Header)
