import { View, Text, StyleSheet, Switch, Platform } from 'react-native'
import React, { useState } from 'react'
import { useSwichForm } from '../hooks';

interface Props {
    isOn : boolean;
    onChange:(value:boolean) => void
}


export default function SwitchComponent(
    
     {isOn, onChange} : Props
     ) {
    const { isEnabled, toggleSwitch } = useSwichForm( isOn,onChange )
  
    return (
        <View >
            <Switch
                trackColor={{ false: '#828A95', true: '#000080'}}
                thumbColor={(Platform.OS === 'android') ? '#000080' : ''}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    )
}
