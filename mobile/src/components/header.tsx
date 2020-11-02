import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: String,
    showCancel?: boolean
}

export default function Header({title, showCancel = true}: HeaderProps){
    const navigation = useNavigation()

    function BackHomePage(){
        navigation.navigate('OrfanatosMap')
    }
    return (
        <View style={styles.container}>
            <BorderlessButton onPress= {navigation.goBack}>
                <Feather  name="arrow-left" color='#15b6d6' size={24}/>
            </BorderlessButton>
            <Text style={styles.TitleText}>{title}</Text>

            
            {showCancel ? (
                <BorderlessButton onPress= {BackHomePage}>
                    <Feather  name="x" color='#ff669d' size={24}/>
                </BorderlessButton>
            ): (
                <View/> 
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TitleText:{
        fontFamily: 'Nunito_600SemiBold',
        color: '#8fa7b3',
        fontSize: 16
    }
})