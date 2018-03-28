import React from 'react';
import {connect} from 'dva';
import {InputNumber, Switch} from 'antd'
import styles from './Footer.less';

function mapStateToProps(state) {
  const {pageWidth, pageHeight, autoResize,} = state.item;
  return {
    pageWidth,
    pageHeight,
    autoResize,
  };
}

function Footer({dispatch, pageWidth, pageHeight, autoResize,}) {

  const onPageWidthChange = value => {
    dispatch({
      type: 'item/setPageWidth',
      payload: value
    })
  }

  const onPageHeightChange = value => {
    dispatch({
      type: 'item/setPageHeight',
      payload: value
    })
  }

  const onAutoResizeChange = value => {
    dispatch({
      type: 'item/setAutoResize',
      payload: value
    })
  }

  return (
    <div className={styles.body}>
      宽度
      <InputNumber className={styles.number} min={0}
                   value={pageWidth} onChange={onPageWidthChange}/>
      高度
      <InputNumber className={styles.number} min={0}
                   value={pageHeight} onChange={onPageHeightChange}/>
      自适应
      <Switch className={styles.resize}
              checked={autoResize} onChange={onAutoResizeChange}/>
    </div>
  );
}

export default connect(mapStateToProps)(Footer)
