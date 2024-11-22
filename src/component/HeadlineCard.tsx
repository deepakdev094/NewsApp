import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Colors from '../utils/colors';
import Assets from "../utils/assets";
import { wp } from '../utils/responsive';
import { HeadlineProps } from "../utils/interface/index";

const HeadlineCard = ({ headline }: { headline: HeadlineProps }) => {

  const openLink = () => {
    if (headline.url) {
      Linking.openURL(headline.url);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => { openLink() }}>
        <Text numberOfLines={2} style={styles.title}>{headline.title}</Text>
      </TouchableOpacity>
      <View style={styles.rowWrapper}>
        <Text numberOfLines={1} style={styles.subtitle}>
          {headline.source.name} • {new Date(headline.publishedAt).toLocaleString()}
        </Text>
        {
          headline.status &&
          <Image
            source={Assets.pinIcon}
            resizeMode='contain'
            style={styles.pinIconWrapper}
          />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: (wp * 95) / 100,
    height: (wp * 25) / 100,
    borderRadius: wp * 2 / 100,
    marginHorizontal: (wp * 3) / 100,
    marginVertical: (wp * 1) / 100,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.CoralRed,
    backgroundColor: Colors.White
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontSize: 12,
    color: Colors.DimGray,
    marginTop: 4
  },
  pinIconWrapper: {
    width: (wp * 4) / 100,
    height: (wp * 4) / 100,
    marginTop: (wp * 1) / 100,
    alignSelf: 'center',
  }
});

export default HeadlineCard;