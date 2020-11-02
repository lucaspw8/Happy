import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import OrfanatosMap         from './pages/OrfanatosMap';
import OrfanatoDetalhes     from './pages/OrfanatoDetalhes';
import SelectMapPosition    from './pages/CreateOrfanato/SelectMapPosition';
import OrphanageData        from './pages/CreateOrfanato/OrphanageData';
import Header from './components/header';

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false, cardStyle:{backgroundColor: "#f2f3f5"}}}>
                <Screen 
                    name="OrfanatosMap" 
                    component={OrfanatosMap} 
                />
                <Screen 
                    name="OrfanatoDetalhes" 
                    component={OrfanatoDetalhes}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato" />
                    }}  
                />
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe os dados" />
                    }} 
                />
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione no mapa" />
                    }} 
                />
            </Navigator>
        </NavigationContainer>
    );
}