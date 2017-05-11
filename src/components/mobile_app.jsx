import React,{Component} from 'react';
import MobileNewsHeader from './mobile_news_header';
import MobileNewsFooter from './mobile_news_footer';
import '../componentsCss/mobile.css';
class MobileApp extends Component{
    render(){
        return(
          <div>
              <MobileNewsHeader />
              {this.props.children}
              <MobileNewsFooter />
          </div>
        )
    }
}
export default MobileApp;