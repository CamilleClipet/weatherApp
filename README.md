# weatherApp
A simple weather app using ReactNative and public weather APIs.

The goal was to make an app that could display the current weather and the forecast (every 3 hours for the present day + the average weather of the next 5 days), to be able to use the display for a smart mirror for example.
I made it for an iPhone SE.
So far the location is hard-coded ; to get the GPS data from the device should be possible.

The APIs are https://darksky.net/dev and https://openweathermap.org/api
The API keys have to be defined in the config.js file
Be careful when testing, the free subscription to these APIs only allow a limited amount of calls per minute or per day!
