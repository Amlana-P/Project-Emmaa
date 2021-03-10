import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Dashboard from '../screens/Dasboard';
import Preference from '../screens/Preference';

const stackNavigatorOptions = {
    headerShown: false
}
const AppNavigator = createStackNavigator({
    Login: {screen: Login},
    Register: {screen: Register},
    Dashboard: {screen: Dashboard},
    Preference: {screen: Preference}
},
{
    defaultNavigationOptions: stackNavigatorOptions
});

export default createAppContainer(AppNavigator);
