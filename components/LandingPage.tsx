import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, ActivityIndicator, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { H1, Separator, Spinner, Text } from 'tamagui'
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ArticleCarousel } from './ArticleCarousel';


export const LandingPage = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [location, setLocation] = useState({ city: '', state: '' });
  const [temperature, setTemperature] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [articles, setArticles] = useState([]);
  const [longitude, setLongitude] = useState({}); 
  const [latitude, setLatitude] = useState({}); 
  const [greeting, setGreeting] = useState<'¡Buenos días' | '¡Buenas tardes' | '¡Buenas noches'>('¡Buenas tardes');
  const [loading, setLoading] = useState(false);
  const [cityAndState, setCityAndState] = useState('');

  const { name } = useLocalSearchParams();

  const healthArticles = [
    {
      title: 'Lluvias agudizan el asma en Puerto Rico',
      url: 'https://www.elnuevodia.com/opinion/punto-de-vista/lluvias-agudizan-el-asma-en-puerto-rico/',
      image: 'https://www.elnuevodia.com/resizer/lZ4uPhtuMpgNCm0CiPpCO_gQOcY=/1438x0/filters:quality(75):format(jpeg):focal(955x610:965x600)/cloudfront-us-east-1.images.arcpublishing.com/gfrmedia/MVZCTHHPYZHKVCV6XFPTZRRYWY.jpg',
    },
    {
      title: 'Weather Triggers Asthma',
      url: 'https://aafa.org/asthma/asthma-triggers-causes/weather-triggers-asthma/',
      image: 'https://aafa.org/wp-content/uploads/2022/07/AAFA-logo.png',
    },
    {
      title: 'Controla tu asma, es posible',
      url: 'https://www.elnuevodia.com/suplementos/puerto-rico-saludable/notas/controla-tu-asma-es-posible/',
      image: 'https://www.elnuevodia.com/resizer/qjUnT-YjLE8nZdl2r4y1-Y8sX4s=/1438x0/filters:quality(75):format(jpeg):focal(448x291:458x281)/cloudfront-us-east-1.images.arcpublishing.com/gfrmedia/PTBMRERIQZGRNAKAFHWF2237TI.jpg',
    },
    {
      title: '¿El tiempo puede afectar a mi asma?',
      url: 'https://kidshealth.org/es/kids/weather-asthma.html#:~:text=El%20aire%20caliente%20y%20h%C3%BAmedo,un%20fuerte%20desencadenante%20del%20asma',
      image: 'data:image/jpeg;base64,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',
    },
    {
      title: 'Explorando el Asma Infantil: Reflexiones de Una Neumóloga Pediatra',
      url: 'https://www.cedars-sinai.org/newsroom/explorando-el-asma-infantil-reflexiones-de-una-neumologa-pediatra/',
      image: 'https://content.presspage.com/uploads/2110/4d0daa90-8d0d-4ce1-9450-bb70321c5f46/800_28688-rst-irinadralyuk-md-2013.jpg?x=1697467418062',
    },
    {
      title: 'Asma infantil',
      url: 'https://www.mayoclinic.org/es/diseases-conditions/childhood-asthma/symptoms-causes/syc-20351507',
      image: 'https://newsnetwork.mayoclinic.org/n7-mcnn/7bcc9724adf7b803/uploads/2022/08/Girl-on-a-swing-in-a-park.jpg',
    },
    {
      title: 'Severe asthma in children: Evaluation and management',
      url: 'https://pubmed.ncbi.nlm.nih.gov/30648539/',
      image: 'https://www.choa.org/-/media/Images/Childrens/global/heros/medical-services/asthma/girl-in-asthma-clinic-breathing-treatment-1440x748.jpg?h=748&la=en&w=1440&hash=7FC562D4850C6E2540ED06F8C1541EC93D91C3ED',
    },
    {
      title: 'Sensitization to airborne ascospores, basidiospores, and fungal fragments in allergic rhinitis and asthmatic subjects in San Juan, Puerto Rico',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21346362/',
      image: 'https://www.ncbi.nlm.nih.gov/pmc/articles/instance/3068563/bin/iaa0155-0322-f02.jpg',
    },
    {
      title: 'Medidas para minimizar los efectos de las esporas de hongos del exterior en la temporada alta de aeroalergenos de Puerto Rico',
      url: 'https://www.galenusrevista.com/medidas-para-minimizar-los-efectos-de-las-esporas-de-hongos-del-exterior-en-la/?id_campagne=1866',
      image: 'https://www.galenusrevista.com//wp-content/uploads/2011/09/2-4-3-3.jpg',
    },
    {
      title: 'Mayo es el mes de la concienciación del asma: ¿qué debo saber y cómo tratarlo?',
      url: 'https://wapa.tv/noticias/salud/mayo-es-el-mes-de-la-concienciaci-n-del-asma-qu-debo-saber-y-c/article_9f76df50-0d66-11ef-97ba-73d509d6c69e.html',
      image: 'https://bloximages.newyork1.vip.townnews.com/wapa.tv/content/tncms/assets/v3/editorial/6/7c/67cec4e8-55ce-5438-a4c0-1484c5ed3306/663bc1c8a20f3.image.jpg?resize=1280%2C720',
    },
    // Add more articles as needed
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
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
      console.log(location);
      setLongitude(location.coords.longitude); 
      setLatitude(location.coords.latitude);
      fetchWeather(location.coords.latitude, location.coords.longitude);
      fetchLocation(location.coords.latitude, location.coords.longitude);
      fetchArticles();
      setLoading(false);
    })();
  }, []);

  const fetchWeather = (latitude: number, longitude: number) => {
    setLoading(true);
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
    setLoading(false);
  };

  const fetchLocation = (latitude: number, longitude: number) => {
    // Fetch location data based on user's coordinates
    // Example: Reverse geocoding API call to fetch location data
    const apiKey = 'AIzaSyAhVuImMmCxc3mpFPDCrmgmFKvZlYFB04E';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
      .then(async (response) => await response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const {formatted_address} = data.results[0];
          setCityAndState(formatted_address);
        }})
      .catch((error) => console.error('Error fetching location:', error));
      }

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

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <H1 style= {{ color: 'black', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center'}}>Loading...</H1>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text color="$black" fontSize={34} style={{ marginTop: 20}}>
            {greeting + ", "}
          <Link href={{ pathname: './profile' }} style={{fontSize: 34, color: "blue", textDecorationLine: "underline"}} asChild>
            <Text>Natalia!</Text>
          </Link>
          </Text>

          <View style={{ flex: 1, height: 1000, paddingTop: 20, maxHeight: 1000, justifyContent: 'center', alignContent: 'center'}}>
            {latitude && longitude ? (
              <WebView
                source={{
                  uri: `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&${latitude}&${longitude}&zoom=10`
                }}
                style={{ flex: 1, width: 1000 }}
              />
            ) : (
              <Text>Cannot load map right now. Please try again later</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: `https://openweathermap.org/img/w/${weatherIcon}.png` }}
              style={{ width: 75, height: 75 }}
            />
            <Text color="$black" fontSize={20} style={{ marginTop: 20 }}>It is currently {temperature} °F at {cityAndState}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ArticleCarousel articles={healthArticles}/>
          </View>
        </View>
      )}
    </>
  );
};