import { Button, Colors, View, Text, Image } from "react-native-ui-lib"
import { StyleSheet, ImageBackground } from "react-native"
import background from "../Images/coffee-background.jpeg"
import { useNavigation } from "@react-navigation/native"

export default function Homepage() {
  const navigation = useNavigation<any>()
  return (
    <View style={styles.root}>
      <ImageBackground source={background} style={styles.container} imageStyle={styles.image}>
      <Text text30BO color={'#bf6240'}>Java Rewards</Text>
      {/* <Image source={''}/> */}
      <Button label={'Customer'} size={Button.sizes.large} backgroundColor={'#bf6240'} text60BO onPress={() => navigation.navigate("Login")}/>
      <Button label={'Business'} size={Button.sizes.large} backgroundColor={'#bf6240'} text60BO onPress={() => navigation.navigate("Login")}/>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, width: '100%'},
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    opacity: .2
  }
})
