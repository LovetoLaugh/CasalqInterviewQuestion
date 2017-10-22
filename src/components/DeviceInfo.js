import React, { Component } from 'react';

class DeviceInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            deviceState: this.props.device_info.state,
            deviceStateArr:[{
                    "state":  this.props.device_info.type,
                    "timestamp":  this.props.device_info.last_updated_at
            }],
            deviceCurrentState: "Lock"
      }

    }
    lockUnlockDetails() {
        let state;
        if(this.state.deviceCurrentState === "Lock") {
            this.setState({deviceCurrentState: "Unlock", deviceState: "unlocked"});
            state = "Unlocked";
        } else {
            this.setState({deviceCurrentState: "Lock", deviceState: "locked"}); 
            state = "Locked";
        }
        let {deviceStateArr} = this.state, currentTimeStamp = Math.floor(Date.now() / 1000),
        stateObj = {
            "state": state,
            "timestamp": currentTimeStamp
        };
        if(deviceStateArr.length === 10) {
            deviceStateArr.splice(0, 1);
            deviceStateArr.push(stateObj);
        } else {
            deviceStateArr.push(stateObj);
        }
        this.setState({deviceStateArr})
    }
    render() {
        let {device_info} = this.props, device_name = device_info.slug.split("-"),
        firstWord = device_name[0], lastWord = device_name[2],

        firstUpperCaseLetter = firstWord.charAt(0).toUpperCase(), 
        stringWithoutFirstUpperLetter = firstWord.slice(1),

        secondUpperCaseLetter = lastWord.charAt(0).toUpperCase(), 
        stringWithoutLastUpperLetter = lastWord.slice(1),

        deviceName = `${firstUpperCaseLetter}${stringWithoutFirstUpperLetter} ${device_name[1]} ${secondUpperCaseLetter}${stringWithoutLastUpperLetter}`,

        {deviceState} =this.state;

        if(device_info.type === "lock" || device_info.type === "unlock") {
            return (
                <div>
                    <div>Device {deviceName}</div>
                    <div>
                        <button style={{"margin":"10px"}} onClick={this.lockUnlockDetails.bind(this)}>{this.state.deviceCurrentState}</button>
                    </div>

                </div>
        );
        } else {
            return (
                <div>We are not supporting this device at the moment</div>
            );
        }
        
        
    }
}

export default DeviceInfo;
