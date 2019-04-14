import React, { Component } from 'react';
import {Alert, Button, Text, View, StyleSheet,} from 'react-native';

class Title extends Component {

	constructor(props) {
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['February','March','April','May','June','July','August','September','October','November','December','January'];
		super(props);
		this.state = {
			time: new Date().toLocaleTimeString(),
			today: days[new Date().getDay()] + ' ' + new Date().getDate() + ' ' + months[new Date().getMonth()],
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000
			);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	tick() {
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var date = new Date();
    if (date.getMinutes() < 10) {
      minutes = "0"+ date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }
		this.setState({
			time: date.getHours()+ ":" + minutes,
			today: days[new Date().getDay()] + ' ' + new Date().getDate() + ' ' + months[new Date().getMonth()],
		});
	}


	render() {
		return (
			<View>
  			<Text style={styleTitle.date}>{this.state.today} </Text>
  			<Text style={styleTitle.hour}>{this.state.time}</Text>
			</View>
			);
	}

}

const styleTitle = StyleSheet.create({
  date: {
    color: '#ffffff',
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  },
  hour: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default Title;
