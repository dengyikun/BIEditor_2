import React from 'react';
import {connect} from 'dva';
import {Modal} from 'antd';
import styles from './DataSetModal.less';

function DataSetModal({dataSetModalVisible}) {
  return (
    <Modal className={styles.normal} visible={dataSetModalVisible}>
      Component: DataSetModal
    </Modal>
  );
}

function mapStateToProps(state) {
  const {dataSetModalVisible, activeItem} = state.item;
  return {
    dataSetModalVisible, activeItem,
  };
}

export default connect(mapStateToProps)(DataSetModal)
