import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/login";
import Homepage from "../Screens/home-page";
import CreateAccount from "../Screens/create-account";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Homepage} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="CreateAcc" component={CreateAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
