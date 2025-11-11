import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewPost from '../screens/NewPost';
import Perfil from '../screens/Pefil';
import ScreenAnidada from './ScreenAnidada';

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="ScreenAnidada" component={ScreenAnidada} options={{headerShown: false}}/>
            <Tab.Screen name='NewPost' component={NewPost} options={{headerShown: false}}/>
            <Tab.Screen name="Perfil" component={Perfil} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default HomeMenu