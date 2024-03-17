import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'

import HeaderTitle from './HeaderTitle'
import { AuthContext, COLORS, SIZES, icons } from '../Configs'


const HomeHeader = () => {
    const { user, token, logOut } = useContext( AuthContext );
  return (
    <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
               <HeaderTitle title='Bienbenido de Nuevo' name={user?.infoId.FirstName || ''} bw={0} color={COLORS.primary}/>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.base,
                            borderRadius:8,
                            borderColor:COLORS.secondary,
                            borderWidth:1
                            
                        }}
                    >
                        <Image
                            source={icons.bell}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.primary
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5
                            }}
                        >
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
  )
}

export default HomeHeader