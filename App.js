import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingList from './src/screens/ShoppingList';
import AddProduct from './src/screens/AddProduct';

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
        <Stack.Screen
          name="Shopping List"
          options={ShoppingList.options}
          component={ShoppingList}
        />
        <Stack.Screen
          name="Add Product"
          options={AddProduct.options}
          component={AddProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
