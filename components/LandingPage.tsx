import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { Text } from 'tamagui'
import { useLocalSearchParams } from 'expo-router';

export const LandingPage = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [location, setLocation] = useState({ city: '', state: '' });
  const [temperature, setTemperature] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [articles, setArticles] = useState([]);
  const [longitude, setLongitude] = useState({}); 
  const [latitude, setLatitude] = useState({}); 
  const [greeting, setGreeting] = useState<'¡Buenos días' | '¡Buenas tardes' | '¡Buenas noches'>('¡Buenas tardes');

  const { name } = useLocalSearchParams();


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const date = new Date();
      const showTime = date.getHours() 
      
      if (showTime > 5 && showTime < 12) {
        setGreeting('¡Buenos días');
      } else if (showTime > 12 && showTime < 17 ){
        setGreeting('¡Buenas tardes');
      } else {
        setGreeting('¡Buenas noches');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude); 
      setLatitude(location.coords.latitude);
      fetchWeather(location.coords.latitude, location.coords.longitude);
      fetchLocation(location.coords.latitude, location.coords.longitude);
      fetchArticles();
    })();
  }, []);

  const fetchWeather = (latitude: number, longitude: number) => {
    // Fetch weather data based on user's location
    // Example: API call to fetch weather data
    const apiKey = 'ba2953be5827fca67dbfff027e76b469';
    const url = `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data.main.temp);
        setWeatherIcon(data.weather[0].icon);
        console.log(data.weather[0])
      })
      .catch((error) => console.error(error));
  };

  const fetchLocation = (latitude: number, longitude: number) => {
    // Fetch location data based on user's coordinates
    // Example: Reverse geocoding API call to fetch location data
    const apiKey = 'AIzaSyAhVuImMmCxc3mpFPDCrmgmFKvZlYFB04E';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find((component: { types: string | string[]; }) =>
          component.types.includes('locality')
        ).long_name;
        const state = addressComponents.find((component: { types: string | string[]; }) =>
          component.types.includes('administrative_area_level_1')
        ).long_name;
        setLocation({ city, state });
      })
      .catch((error) => console.error(error));
  };

  const fetchArticles = () => {
    // Fetch articles data from API
    // Example: API call to fetch articles data
    const apiKey = 'f4edcb94c24345608112af5cbd3458d8'
    const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-05-13&sortBy=popularity&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => console.error(error));
  };

  const renderArticle = () => {
    return (
      <View >
        <Text>{articles.values.name}</Text>
        <Text>{articles.values.name}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text color="$white" fontSize={34} style={{ marginTop: 20}}>
        {greeting}, Natalia!
      </Text>
      <View style={{ flex: 1 }}>
      {latitude && longitude ? (
        <WebView
          source={{
            uri: `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=precipitation&lat=${latitude}&lon=${longitude}&zoom=10`
          }}
          style={{ flex: 1 }}
        />
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
      <Text style={{ marginTop: 20 }}>
        {location.city}, {location.state}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: `https://openweathermap.org/img/w/${weatherIcon}.png` }}
          style={{ width: 50, height: 50 }}
        />
        <Text>{temperature} °F</Text>
      </View>
    </View>
  );
};