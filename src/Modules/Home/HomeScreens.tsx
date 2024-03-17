import { View, Text } from 'react-native'
import React from 'react'
import Features from '../../Components/Features'
import CreditCard from '../../Components/CreditCard'
import HomeHeader from '../../Components/HomeHeader'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS, ThemeStyles } from '../../Configs/constants/theme'

const HomeScreens = () => {
    return (
        <View style={{ ...ThemeStyles.container, backgroundColor: COLORS.base }}>
            <LinearGradient
                colors={[COLORS.base, COLORS.base1]}  // Colores para el fondo degradado
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}

            >
                <View style={{ paddingHorizontal: 10 * 3 }} >
                    <HomeHeader />

                </View>
            </LinearGradient>
            <View style={{ paddingHorizontal: 10 * 3, paddingTop: 8, }}>
                <CreditCard />
                {/* // <Banner /> */}
                <Features />
                {/* <CircularBarList /> */}

            </View>
        </View>
    )
}

export default HomeScreens