import React from 'react'
import {Table} from 'antd'
import styles from './SQLTable.less'
import * as pageService from "../../../services/page";

class SQLTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      columns: [],
      loading: false,
    }
  }//初始化 state

  componentDidMount() {
    this.refresh()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.refreshAt !== this.props.item.refreshAt) {
      this.refresh()
    }
  }

  refresh = () => {
    this.setState({loading: true})
    const {sourceId, sql, conditionList, dimensionList, valueList} = this.props.item
    pageService.getChartData(sourceId, sql, conditionList)
      .then(data => {
        this.setState({
          dataSource: data.data.data,
          columns: [{
            title: dimensionList[0].displayName,
            dataIndex: dimensionList[0].name,
          }, {
            title: valueList[0].displayName,
            dataIndex: valueList[0].name,
          }],
          loading: false
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  onEvent = e => {
  }

  render() {
    const {dataSource, columns, loading} = this.state
    return <div className={styles.body} onClick={this.onEvent} onDoubleClick={this.onEvent}>
      <Table className={styles.table} size={'small'} bordered={true}
             pagination={false} rowKey={(record, index) => index}
             dataSource={dataSource} columns={columns} loading={loading}/>
    </div>
  }
}

export default SQLTable
