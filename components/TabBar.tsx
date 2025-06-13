import { Colors } from '@/constants/Colors';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import TabBarButton from './TabBarButton';

export default function TabBar({
    state,
    descriptors,
    navigation,
    activeColor,
    inactiveColor
}: {
    state: TabNavigationState<ParamListBase>,
    descriptors: any,
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
    activeColor: string,
    inactiveColor: string
}) {
    /* Initializing the state for the tabbar dimensions */
    const [dimensions, setDimentions] = useState({ height: 20, width: 100 });
    /* Tabbar button width */
    const buttonWidth = dimensions.width / state.routes.length;
    /* Setting the tabbar dimensions from the onLayout event of the view rendering the elements */
    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimentions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        })
    }
    /* Initializing the shared value for the tabbar position */
    const tabPositionX = useSharedValue(0);
    /* Translate animation for the tabbar highlight  based on the tabPositionX  value*/
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: tabPositionX.value
            }]
        }
    })
    /* Setting the tabbar position to the index of the focused route with a spring animation */
    useEffect(() => {
        tabPositionX.value = withSpring(buttonWidth * state.index, { duration: 1500 })
    }, [state.index, buttonWidth, tabPositionX])


    /* Tabbar styles */
    const styles = StyleSheet.create({
        tabbar: {
            position: 'absolute',
            bottom: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 35,
            marginHorizontal: 70,
            paddingVertical: 15,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
        },
        highlight: {
            position: 'absolute',
            backgroundColor: Colors.highlight,
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25
        }
    })

    return (
        <SafeAreaView>
            <View onLayout={onTabbarLayout} style={styles.tabbar}>
                {/* Animated hightlight translates with the tabPositionX value */}
                <Animated.View style={[styles.highlight, animatedStyle]} />
                {/* Genrating tabbar buttons by mapping the routes */}
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    /* Navigates to the page and changes the focused state */
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };
                    /* No functionality provided till now for onLongPress */
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TabBarButton
                            key={route.name}
                            routeName={route.name}
                            activeColor={activeColor}
                            inactiveColor={inactiveColor}
                            label={label}
                            isFocused={isFocused}
                            options={options}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        />
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

