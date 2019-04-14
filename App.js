/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AppRegistry, Platform, ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import Title from './components/title.js';
import Constants from './config.js'


type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      city: 'alfortville',
      country: 'france',
      lat: '48.8149',
      long: '2.4150',
      currentTemp: '',
      currentWeather: 'None',
      forecast: '',
      nextDays: '',

      time0:'',
      time1:'',
      time2:'',
      time3:'',
      time4:'',

      temp:[],

      weath0:'',
      weath1:'',
      weath2:'',
      weath3:'',
      weath4:'',

      day0: '',
      day1: '',
      day2: '',
      day3: '',
      day4: '',

      high0: '',
      high1: '',
      high2: '',
      high3: '',
      high4: '',

      low0: '',
      low1: '',
      low2: '',
      low3: '',
      low4: '',

      next0: '',
      next1: '',
      next2: '',
      next3: '',
      next4: '',

    };
  }

  componentDidMount() {
    this.getWeather();
    this.intervalID = setInterval(
      () => this.getWeather(),
      36000
      );
    this.getForecast();
    this.intervalID = setInterval(
      () => this.getForecast(),
      36000
      );
    this.getNextDays();
    this.intervalID = setInterval(
      () => this.getNextDays(),
      36000
      );

  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getWeather = async () => {
    try {
      const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.state.city+','+this.state.country+'&appid='+Constants.API_OPENWEATHER);
      const response = await api_call.json();
      this.setState({...this.state,
        currentTemp: (Math.round((response.main.temp - 273.15) * 10) / 10).toString() + '°C ' ,
        currentWeather: response.weather[0].main
      });
    } catch (error) {
      console.error(error);
    }
  };

  mytime(time) {
    return (Number(time.substring(11, 13))+2).toString() + 'h';
  }

  myDay(time) {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[new Date(time*1000).getDay()];
  }

  absToCelsius(temp) {
    return (Math.round((temp - 273.15) * 10) / 10).toString() + '°C';
  }

  farToCelsius(temp) {
    return (Math.round((temp - 32)/1.8 * 10) / 10).toString() + '°C';
  }

  getForecast = async () => {
    try {
      const api_call = await fetch('http://api.openweathermap.org/data/2.5/forecast?q='+this.state.city+','+this.state.country+'&appid='+Constants.API_OPENWEATHER);
      const response = await api_call.json();
      console.log(response);
      this.setState({...this.state,
        forecast: response,

        time0: this.mytime(response.list[0].dt_txt),
        time1: this.mytime(response.list[1].dt_txt),
        time2: this.mytime(response.list[2].dt_txt),
        time3: this.mytime(response.list[3].dt_txt),
        time4: this.mytime(response.list[4].dt_txt),

        temp0: this.absToCelsius(response.list[0].main.temp),
        temp1: this.absToCelsius(response.list[1].main.temp),
        temp2: this.absToCelsius(response.list[2].main.temp),
        temp3: this.absToCelsius(response.list[3].main.temp),
        temp4: this.absToCelsius(response.list[4].main.temp),

        weath0: response.list[0].weather[0].main,
        weath1: response.list[1].weather[0].main,
        weath2: response.list[2].weather[0].main,
        weath3: response.list[3].weather[0].main,
        weath4: response.list[4].weather[0].main,
      });
    } catch (error) {
      console.error(error);
    }
  };

  getNextDays = async () => {
    try {
      const api_call = await fetch('https://api.darksky.net/forecast/'+ Constants.API_DARKSKY+'/'+this.state.lat+','+this.state.long);
      const response2 = await api_call.json();
      console.log(response2);
      this.setState({...this.state,
        forecast: response2,

        day0: this.myDay(response2.daily.data[2].time),
        day1: this.myDay(response2.daily.data[3].time),
        day2: this.myDay(response2.daily.data[4].time),
        day3: this.myDay(response2.daily.data[5].time),
        day4: this.myDay(response2.daily.data[6].time),

        high0: this.farToCelsius(response2.daily.data[2].temperatureHigh),
        high1: this.farToCelsius(response2.daily.data[3].temperatureHigh),
        high2: this.farToCelsius(response2.daily.data[4].temperatureHigh),
        high3: this.farToCelsius(response2.daily.data[5].temperatureHigh),
        high4: this.farToCelsius(response2.daily.data[6].temperatureHigh),

        low0: this.farToCelsius(response2.daily.data[2].temperatureLow),
        low1: this.farToCelsius(response2.daily.data[3].temperatureLow),
        low2: this.farToCelsius(response2.daily.data[4].temperatureLow),
        low3: this.farToCelsius(response2.daily.data[5].temperatureLow),
        low4: this.farToCelsius(response2.daily.data[6].temperatureLow),

        next0: response2.daily.data[2].icon,
        next1: response2.daily.data[3].icon,
        next2: response2.daily.data[4].icon,
        next3: response2.daily.data[5].icon,
        next4: response2.daily.data[6].icon,
      });
    } catch (error) {
      console.error(error);
    }
  };


  render() {
    const icons = {Clear: require("./public/white/sun.png"), Clouds: require("./public/white/clouds.png"), Rain: require("./public/white/rain.png"), None: require("./public/black.png")};
    const icons2 = {"clear-day": require("./public/white/sun.png"), "clear-night": require("./public/white/moon.png"), "rain": require("./public/white/rain.png"), "snow": require("./public/white/snow.png"), "sleet": require("./public/white/sleet.png"), "wind": require("./public/white/wind.png"), "fog": require("./public/white/fog.png"), "cloudy": require("./public/white/clouds.png"), "partly-cloudy-day": require("./public/white/partly-cloudy-day.png"), "partly-cloudy-night": require("./public/white/partly-cloudy-night.png")};
    return (
      <View style={styles.container}>
      <Title/>
      <Image style={styles.today_image} source={icons[this.state.currentWeather]}/>
        <Text style={styles.welcome}>{this.state.currentTemp} </Text>
        <Text style={styles.welcome}> </Text>
        <View style={styles.first_row}>
          <View style={styles.rows}>
            <Image style={styles.row1_img} source={icons[this.state.weath0]} />
            <Image style={styles.row1_img} source={icons[this.state.weath1]} />
            <Image style={styles.row1_img} source={icons[this.state.weath2]} />
            <Image style={styles.row1_img} source={icons[this.state.weath3]} />
            <Image style={styles.row1_img} source={icons[this.state.weath4]} />
          </View>
          <View style={styles.rows}>
            <Text style={styles.rowToday}> {this.state.time0} </Text>
            <Text style={styles.rowToday}> {this.state.time1} </Text>
            <Text style={styles.rowToday}> {this.state.time2} </Text>
            <Text style={styles.rowToday}> {this.state.time3} </Text>
            <Text style={styles.rowToday}> {this.state.time4} </Text>
          </View>
          <View style={styles.rows}>
            <Text style={styles.rowToday}> {this.state.temp0} </Text>
            <Text style={styles.rowToday}> {this.state.temp1} </Text>
            <Text style={styles.rowToday}> {this.state.temp2} </Text>
            <Text style={styles.rowToday}> {this.state.temp3} </Text>
            <Text style={styles.rowToday}> {this.state.temp4} </Text>
          </View>
        </View>
        <Text style={styles.welcome}> </Text>
        <View style={styles.second_row}>
          <View style={styles.rows}>
            <Image style={styles.row2_img} source={icons2[this.state.next0]}/>
            <Image style={styles.row2_img} source={icons2[this.state.next1]}/>
            <Image style={styles.row2_img} source={icons2[this.state.next2]}/>
            <Image style={styles.row2_img} source={icons2[this.state.next3]}/>
          </View>
          <View style={styles.rows}>
            <Text style={styles.days}> {this.state.day0} </Text>
            <Text style={styles.days}> {this.state.day1} </Text>
            <Text style={styles.days}> {this.state.day2} </Text>
            <Text style={styles.days}> {this.state.day3} </Text>
          </View>
          <View style={styles.rows}>
            <Text style={styles.rowNext}> {this.state.high0} </Text>
            <Text style={styles.rowNext}> {this.state.high1} </Text>
            <Text style={styles.rowNext}> {this.state.high2} </Text>
            <Text style={styles.rowNext}> {this.state.high3} </Text>
          </View>
          <View style={styles.rows}>
            <Text style={styles.rowNext}> {this.state.low0} </Text>
            <Text style={styles.rowNext}> {this.state.low1} </Text>
            <Text style={styles.rowNext}> {this.state.low2} </Text>
            <Text style={styles.rowNext}> {this.state.low3} </Text>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  today_image: {
    height: 100,
    resizeMode: 'contain',
  },
  welcome: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  first_row: {
    width: 310,
  },
  rows: {
    color: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  second_row: {
    width: 300,
  },
  rowToday: {
    color: '#ffffff',
    flex: 1,
    fontSize: 14,
    height: 20,
    textAlign:'center',
  },
  row1_img: {
    flex: 1,
    height: 50,
    alignSelf: 'stretch',
    resizeMode: 'contain',
    width: 50,
  },
  row2_img: {
    flex: 1,
    height: 60,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
  days: {
    color: '#ffffff',
    flex: 1,
    fontSize: 13,
    height: 20,
    textAlign:'center',
  },
  rowNext: {
    color: '#ffffff',
    flex: 1,
    fontSize: 14,
    height: 20,
    textAlign:'center',
  },
});
