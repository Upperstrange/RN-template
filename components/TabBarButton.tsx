import NavIcon from '@/components/NavIcon'
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

export default function TabBarButton({
    routeName,
    label,
    onPress,
    onLongPress,
    isFocused,
    options,
    activeColor,
    inactiveColor,
}: {
    routeName: string,
    label: any,
    onPress: () => void,
    onLongPress: () => void,
    isFocused: boolean,
    options: BottomTabNavigationOptions,
    activeColor?: string,
    inactiveColor?: string,
}) {

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0]);
        return {
            opacity
        }
    });

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
        const top = interpolate(scale.value, [0, 1], [0, 9]);
        return {
            transform: [{
                scale: scaleValue
            }],
            top: top
        }
    });

    const styles = StyleSheet.create({
        tabbarItem: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
        },
        iconText: {
            color: isFocused ? activeColor : inactiveColor,
            fontSize: 12,
        }
    });

    return (
        <Pressable
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            style={styles.tabbarItem}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <Animated.View style={animatedIconStyle}>
                <NavIcon isFocused={isFocused} routeName={routeName} activeColor={activeColor} inactiveColor={inactiveColor}/>
            </Animated.View>
            <Animated.Text style={[styles.iconText, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    )

}

