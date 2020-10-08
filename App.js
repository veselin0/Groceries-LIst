import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ShoppingList from './src/screens/ShoppingList';
import AddProduct from './src/screens/AddProduct';
import {StackActions} from 'react-navigation';

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>Shopping List</Text>
//     </View>
//   );
// };

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Shopping List" component={ShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
