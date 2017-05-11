/**
 * Created by Administrator on 2017/5/8 0008.
 */
import React from 'react';
import NewsHeader from './news_header'
import NewsFooter from './news_footer'
import '../componentsCss/pc.css'
class App extends React.Component {
  render(){
      return (
          <div>
          <NewsHeader></NewsHeader>
          {this.props.children}
          <NewsFooter></NewsFooter>
          </div>
      )
  }
}
export default App;