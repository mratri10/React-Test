import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './component/Welcome';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { setBaseURL } from './apis/default';
import { API_URL } from './apis/constants';
import KontakKita from './component/KontakKita';
import InputKontak from './component/KontakKita/input';

const Stack = createStackNavigator();

class SQLITE extends Component {
    constructor(props) {
        super(props);
        setBaseURL(API_URL)
        this.state = {}
    }
    render() {
        return (
            <AppNavigator />
            // <NavigationContainer>
            //     <Stack.Navigator initialRouteName="Welcome">
            //         <Stack.Screen
            //             name="Welcome"
            //             component={Welcome}
            //             options={{
            //                 headerShown:false
            //             }}
            //         />
                    
            //     </Stack.Navigator>
            // </NavigationContainer>

        );
    }
}
const AppSwitch  = createSwitchNavigator({
    welcome:{screen:Welcome},
    kontak:{screen:KontakKita},
    inputKontak:{screen:InputKontak}
})
const AppNavigator= createAppContainer(AppSwitch)

export default SQLITE;