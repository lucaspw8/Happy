import React, {useState} from 'react';

import { 
    StyleSheet, 
    Text, 
    View, 
    Dimensions,
  } from 'react-native';
  import MapView, {Marker, Callout,PROVIDER_GOOGLE} from 'react-native-maps';
  
  import {Feather} from '@expo/vector-icons'

import mapMarker from '../images/MapMarker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
  
interface Orfanato {
  id: number,
  name: String,
  latitude: number,
  longitude: number
}

export default function OrfanatosMap(){
    const navigation = useNavigation();
    
    const [orfanatos, setOrfanatos] = useState<Orfanato[]>([]);

    useFocusEffect(()=> {
      api.get('orfanatos').then(response => {
        setOrfanatos(response.data);
      })
    });

    function navegarDetalhes(id: number){
        navigation.navigate('OrfanatoDetalhes', {id});
    }

    function navegarCriarOrfanato(){
      navigation.navigate("SelectMapPosition");
    }

    return(
    <View style={styles.container}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion= {{
          latitude: -6.6084768, 
          longitude: -39.0549031,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
          
        }}
      >
        {orfanatos.map(orfanato => {
          return (
            <Marker key = {orfanato.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.8,
                y: 0.88,
              }}
              coordinate={{
                latitude: orfanato.latitude,
                longitude: orfanato.longitude,
              }}
            >
              <Callout tooltip={true} onPress= {()=> navegarDetalhes(orfanato.id)}>
                <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orfanato.name}</Text>
                </View>
                
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.footer}> 
          <Text style={styles.footerText}>{orfanatos.length} orfanatos encontrados</Text>
          <RectButton style={styles.criarOrfanatoBuuton}
            onPress={navegarCriarOrfanato}>
              <Feather name="plus" size={20} color="#fff"/>
          </RectButton>
      </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText: {
      color: "#0089a5",
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
    footer:{
      position: "absolute",
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: "#fff",
      borderRadius:  20,
      height: 56,
      paddingLeft: 24,
  
      elevation: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerText:{
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
    criarOrfanatoBuuton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  });