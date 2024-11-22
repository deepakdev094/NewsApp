import React, { useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Animated } from 'react-native';
import Colors from "../utils/colors";
import Assets from "../utils/assets";
import { wp } from "../utils/responsive";

const SplashScreen = ({ navigation }: any) => {

    const opacity = useRef(new Animated.Value(1)).current; // Initial opacity

    useEffect(() => {

        setTimeout(() => {
            navigation.navigate('newsScreen');
        }, 2000);

        const startBlinking = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0, // Fade out
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1, // Fade in
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );

        startBlinking.start();

        return () => startBlinking.stop(); // Cleanup animation
    }, [opacity]);

    return (
        <SafeAreaView
            style={styles.container}
        >
            <Animated.Image
                style={[styles.logoWraaper, { opacity: opacity }]}
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