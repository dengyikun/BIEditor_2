import React from 'react'
import styles from './SQLText.less'
import * as pageService from "../../../services/page";

class SQLText extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: '',
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
        this.setState({text: JSON.stringify(data.data.data[0][valueList[0].name])})
      })
      .catch(e => {
        console.log(e)
      })
  }

  onEvent = e => {
    this.props.onEvent(e, {
      text: this.state.text
    })
  }

  render() {
    return <div className={styles.body} onClick={this.onEvent} onDoubleClick={this.onEvent}>
      {this.state.text}
    </div>
  }
}

export default SQLText
