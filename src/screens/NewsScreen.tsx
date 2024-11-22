import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../utils/colors";
import Assets from "../utils/assets";
import { hp, wp } from "../utils/responsive";
import { fetchHeadlines } from "../utils/services/newsService";
import { HeadlineProps } from "../utils/interface/index";
import HeadlineCard from "../component/HeadlineCard";
import SwipeButton from "../component/SwipeButton";

const NewsScreen = () => {

    const [loading, setLoading] = useState(false);
    const [headlines, setHeadlines] = useState<any>([]);
    const [pinnedNews, setPinnedNews] = useState([]);

    const timerRef: any = useRef(null);

    useEffect(() => {
        loadHeadlines();
        startTimer();

        const handleBackPress = () => {
            // Show an alert dialog
            Alert.alert(
                'Exit App',
                'Are you sure you want to exit the app?',
                [
                    { text: 'Cancel', style: 'cancel' }, // Do nothing on cancel
                    { text: 'Yes', onPress: () => BackHandler.exitApp() }, // Exit the app
                ],
                { cancelable: true }
            );
            return true; // Prevent default back button behavior
        };

        // Add the back press listener
        BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        // Cleanup the listener on component unmount
        return () => {
            clearInterval(timerRef.current);
            BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
        };
    }, []);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            handleLatestHeadlines();
        }, 10000);
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        startTimer();
    };


    const loadHeadlines = async () => {

        setPinnedNews([]);
        setLoading(true);
        const stored: any = await fetchHeadlines();
        if (stored != null) {
            setLoading(false);
            let filterArray: any = stored;
            let newArray: any = filterArray.filter((item: any, index: number) => index >= 10);
            await AsyncStorage.setItem('latestHeadlines', JSON.stringify(newArray));
            const result: any = stored.slice(0, 10);
            const updatedResult: any = result.map((item: any, index: number) => ({
                ...item,
                status: false
            }));
            setHeadlines(updatedResult);
        }
    }

    const handlePin = (rowMap: any, index: number) => {
        let updatedArray: any = headlines.map((obj: any) => ({ ...obj, status: false }));
        const pinnedElement: any = updatedArray[index];
        setPinnedNews(pinnedElement);
        let result = updatedArray.filter((obj: any, i: number) => i !== index);
        let joinResult: any = [{ ...pinnedElement, status: true }, ...result];
        setHeadlines(joinResult);
        closeRow(rowMap, index);
    }

    const closeRow = (rowMap: any, index: number) => {
        if (rowMap[index]) {
            rowMap[index].closeRow(); // Close the hidden row
        }
    }

    const handleDelete = (rowMap: any, index: number) => {
        let result: HeadlineProps[] = headlines.filter((item: any, i: number) => i != index);
        let object: HeadlineProps = headlines.find((item: any, i: number) => i === index);
        if (object.status == true) {
            setPinnedNews([]);
        }
        setHeadlines(result);
        closeRow(rowMap, index);
    }

    const handleLatestHeadlines = async () => {

        let localHeadlines: HeadlineProps[] = [];
        let pinnedNewsList: HeadlineProps[] = [];

        setHeadlines((prev: any) => {
            localHeadlines = prev;
            return prev;
        });

        const result: any = await AsyncStorage.getItem('latestHeadlines');
        const headlinesList: any = result ? JSON.parse(result) : [];
        let firstFiveList: any = headlinesList.slice(0, 5);

        let afterFive: any = headlinesList.slice(5);

        setPinnedNews((prev: any) => {
            pinnedNewsList = prev;
            return prev;
        });

        const length: number = pinnedNewsList.length;
        if (afterFive.length) {
            await AsyncStorage.setItem('latestHeadlines', JSON.stringify(afterFive));
        } else {
            loadHeadlines();
        }

        if (length != 0) {
            let headlinesList: HeadlineProps[] = localHeadlines.slice(1);
            let length = headlinesList.length;
            const afterFiveList: HeadlineProps[] = headlinesList.slice(0, (length > 5) ? 4 : length - 1);
            const records: HeadlineProps[] = [...firstFiveList, ...afterFiveList]
            const updatedRecords: HeadlineProps[] = records.map((record: any) => ({
                ...record,
                status: false
            }));
            const pinnedArray: any = [{ ...pinnedNewsList, status: true }];
            const result: HeadlineProps[] = [...pinnedArray, ...updatedRecords];
            setHeadlines(result);
        } else {
            let headlinesList: HeadlineProps[] = localHeadlines;
            let length = headlinesList.length;
            const afterFiveList: HeadlineProps[] = headlinesList.slice(0, (length > 5) ? 4 : length - 1);
            const result: HeadlineProps[] = [...firstFiveList, ...afterFiveList];
            setHeadlines(result);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.appBarWrapper}>
                <Text style={styles.headingWrapper}>News Headlines</Text>
                <TouchableOpacity style={styles.topNewsButtonWrapper} onPress={() => {
                    resetTimer()
                    handleLatestHeadlines()
                }}>
                    <Text style={styles.topNewsTextWrapper}>Top News</Text>
                </TouchableOpacity>
            </View>
            {
                loading
                    ?
                    <View style={styles.activityIndicatorMainWrapper}>
                        <ActivityIndicator
                            style={styles.centerWrapper}
                            size="large"
                            color={Colors.CoralRed}
                        />
                    </View>
                    :
                    <>
                        {
                            headlines.length != 0 &&
                            <SwipeListView
                                contentContainerStyle={{ paddingBottom: wp * 4 / 100 }}
                                data={headlines}
                                renderItem={({ item }: { item: HeadlineProps }) => {
                                    return (
                                        <HeadlineCard headline={item} />
                                    );
                                }}
                                renderHiddenItem={(data, rowMap) => (
                                    <View style={styles.rowBack}>
                                        <SwipeButton
                                            iconStyle={styles.pinIconWrapper}
                                            icon={Assets.pinIcon}
                                            handleOnPress={(rowMap, index) => {
                                                handlePin(rowMap, index)
                                            }}
                                            rowMap={rowMap}
                                            index={data.index}
                                        />
                                        <SwipeButton
                                            iconStyle={styles.deleteIconWrapper}
                                            icon={Assets.deleteIcon}
                                            handleOnPress={(rowMap, index) => {
                                                handleDelete(rowMap, index)
                                            }}
                                            rowMap={rowMap}
                                            index={data.index}
                                        />
                                    </View>
                                )}
                                leftOpenValue={75}
                                rightOpenValue={- 75}
                                keyExtractor={(_, index) => index.toString()}
                            />
                        }
                    </>
            }
            {
                (loading == true && headlines.length == 0) &&
                <View style={styles.activityIndicatorMainWrapper}>
                    <Text style={styles.noDataFound}>NO Data Found</Text>
                </View>
            }
        </SafeAreaView >
    )
}

export default NewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    appBarWrapper: {
        width: (wp * 90) / 100,
        height: (wp * 15) / 100,
        paddingVertical: (wp * 3.5) / 100,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    activityIndicatorMainWrapper: {
        width: wp * 100 / 100,
        height: hp * 80 / 100,
        justifyContent: 'center'
    },
    centerWrapper: {
        alignSelf: 'center'
    },
    headingWrapper: {
        fontSize: (wp * 5) / 100,
        color: Colors.CoralRed,
        fontWeight: '500',
    },
    noDataFound: {
        alignSelf: 'center',
        fontSize: (wp * 5) / 100,
        color: Colors.CoralRed,
        fontWeight: '500',
    },
    topNewsButtonWrapper: {
        width: (wp * 20) / 100,
        height: (wp * 8) / 100,
        justifyContent: 'center',
        backgroundColor: Colors.CoralRed,
        borderRadius: (wp * 1) / 100,
    },
    topNewsTextWrapper: {
        color: Colors.White,
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: '500'
    },
    pinIconWrapper: {
        width: (wp * 7) / 100,
        height: (wp * 7) / 100,
    },
    deleteIconWrapper: {
        width: (wp * 8) / 100,
        height: (wp * 8) / 100,
    },
    rowBack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: (wp * 95) / 100,
        height: (wp * 25) / 100,
        borderRadius: wp * 2 / 100,
        marginHorizontal: (wp * 3) / 100,
        marginVertical: (wp * 1) / 100,
    }
});