import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import NewPost from '../screens/NewPost';

const Tab = createBottomTabNavigator();

const HomeMenu = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
            <Tab.Screen name='NewPost' component={NewPost} options={{headerShown: false}}/>
        </Tab.Navigator>
    )
}

export default HomeMenu