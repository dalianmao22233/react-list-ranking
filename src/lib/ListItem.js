import React, { Component, PropTypes } from 'react'
// import React, { Component} from 'react'

export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.string.isRequired
  }

  render () {
    var { item } = this.props
    return (
        <div>
         <span className="expandable-listview_listItems">{item}<br /></span>
            
        </div>
    )
  }
}
