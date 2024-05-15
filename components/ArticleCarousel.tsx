import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const ArticleCarousel = ({ articles }) => {
  const renderItem = ({ item }) => {
    const handlePress = () => {
      Linking.openURL(item.url);
    };

    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, margin: 10}}>
          <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Carousel
        data={articles}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        loop={true}
        autoplay={true}
        autoplayInterval={5000} // Change autoplay interval as needed
      />
    </View>
  );
};