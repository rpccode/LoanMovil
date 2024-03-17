import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons } from '../Configs';

interface Feature {
    id: number;
    icon: string;
    color: string;
    backgroundColor: string;
    description: string;
}

const Features = () => {
    const featuresData: Feature[] = [
        {
            id: 1,
            icon: icons.calculate,
            color: COLORS.purple,
            backgroundColor: COLORS.lightPurple,
            description: "Calculate"
        },
        {
            id: 2,
            icon: icons.send,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightYellow,
            description: "Transfer"
        },
        {
            id: 3,
            icon: icons.internet,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Internet"
        },
        {
            id: 4,
            icon: icons.wallet,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Wallet"
        },
        {
            id: 5,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightYellow,
            description: "Bill"
        },
        {
            id: 6,
            icon: icons.game,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Games"
        },
        {
            id: 7,
            icon: icons.phone,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Mobile Prepaid"
        },
        {
            id: 8,
            icon: icons.more,
            color: COLORS.purple,
            backgroundColor: COLORS.lightPurple,
            description: "More"
        },
    ]


    const navigate = useNavigation()
    const [features, setFeatures] = React.useState(featuresData)


    const Header = () => (
        <View style={{ marginBottom: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h3, color:COLORS.primary }}>Características</Text>
        </View>
    )

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
            onPress={() => navigate.navigate(item.description as never)}
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    marginBottom: 5,
                    borderRadius: 20,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: item.color
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body5,color:COLORS.secondary }}>{item.description}</Text>
        </TouchableOpacity>
    )

    return (
        <FlatList
            ListHeaderComponent={Header}
            data={features}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            style={{ marginTop: SIZES.padding * 2 }}
        />
    )
}

export default Features