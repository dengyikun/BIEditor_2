import React from 'react'
import styles from './SQLText.less'
import * as pageService from "../../../services/page";
import {TOOL} from "../../../utils";

class SQLText extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
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
    const {sourceId, sql, conditionList, valueList} = this.props.item
    pageService.getChartData(sourceId, sql, conditionList)
      .then(data => {
        const {onChange} = this.props
        const item = TOOL.deepCopy(this.props.item)
        let text = JSON.stringify(data.data.data[0][valueList[0].name])
        item.option.text = text
        onChange(item)
      })
      .catch(e => {
        console.log(e)
      })
  }

  onEvent = e => {
    const option = this.props.item.option
    this.props.onEvent(e, {
      text: option.text
    })
  }

  render() {
    const {option} = this.props.item
    return <div className={styles.body} onClick={this.onEvent} onDoubleClick={this.onEvent}>
      {option.text}
    </div>
  }
}

export default SQLText
