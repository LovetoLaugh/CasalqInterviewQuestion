import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 
import About from './components/About';
import DeviceInfo from './components/DeviceInfo';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
        super();
       this.state = { 
        device_info: {
                      "type": "lock",
                      "state": "locked",
                      "last_updated_at": 1508386138,
                      "slug": "apt-143-lock"
                    }

      }

  }
  render() {
    let {device_info} = this.state,
    deviceInfo = () => (
      <DeviceInfo device_info={device_info}/>
    );
    return (
        <div className="App">
          <BrowserRouter>
            <div>
              <div className="weather-alert-header">
                <span className="about-tab"><Link to={"/about-us"}>About Us</Link></span>
                <span className="device-info-tab"><Link to={`/device/${device_info.slug}`}>Device Info</Link></span>
              </div>
              <div>
                <Route path={"/about-us"} component={About}/>
                <Route path={`/device/${device_info.slug}`} component={deviceInfo}/>
              </div>
            </div>
          </BrowserRouter>
        </div>
    );
  }
}

export default App;
