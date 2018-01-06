import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm} from 'antd';
import styles from './Users.less';

function Users({dispatch, loading, list: dataSource, total, page: current}) {

  const deleteHandler = (id) => {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  const pageChangeHandler = (page) => {
    dispatch({type: 'users/fetch', payload: {page}})
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, {id}) => (
        <span className={styles.operation}>
           <a>Edit</a>
           <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
             <a>Delete</a>
           </Popconfirm>
         </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={5}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const {list, total, page} = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
