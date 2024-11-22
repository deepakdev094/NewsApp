import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { wp } from '../utils/responsive';

type SwipeButtonProps = {
    rowMap: any;
    index: number;
    icon: ImageSourcePropType;
    handleOnPress: (rowMap: any, index: number) => void;
    iconStyle: StyleProp<ImageStyle>
};

const SwipeButton = (props: SwipeButtonProps) => {

    const { rowMap, index, icon, handleOnPress, iconStyle } = props;

    return (
        <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleOnPress(rowMap, index)}               >
            <Image source={icon} style={iconStyle} />
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    actionButton: {
        borderRadius: (wp * 2) / 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: (wp * 15) / 100,
        height: (wp * 25) / 100,
    }
});


export default SwipeButton;
