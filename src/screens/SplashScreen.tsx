import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Animated } from 'react-native';
import Colors from "../utils/colors";
import Assets from "../utils/assets";
import { wp } from "../utils/responsive";

const SplashScreen = ({ navigation }: any) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('newsScreen');
        }, 2000);
    });

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Animated.Image
                style={styles.logoWraaper}
                source={Assets.logo}
                resizeMode="contain"
            />
        </SafeAreaView>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWraaper: {
        width: (wp * 40) / 100,
        height: (wp * 40) / 100,
    }
});