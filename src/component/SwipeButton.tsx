import React from 'react';
import {
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { wp } from '../utils/responsive';
import Assets from '../utils/assets';

type SwipeButtonProps = {
    rowMap: any;
    index: number;
    handleOnPress: (rowMap: any, index: number) => void;
};

const SwipeButton = (props: SwipeButtonProps) => {

    const { rowMap, index, handleOnPress } = props;

    return (
        <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleOnPress(rowMap, index)}               >
            <Image source={Assets.pinIcon} style={styles.pinIconWrapper} />
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
    },
    pinIconWrapper: {
        width: (wp * 7) / 100,
        height: (wp * 7) / 100,
    },
    deleteIconWrapper: {
        width: (wp * 8) / 100,
        height: (wp * 8) / 100,
    },
});


export default SwipeButton;
