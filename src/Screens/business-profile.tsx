
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import { Card, Button } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';
import profile from '../Images/JavaRewardsLogo.png';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';
import { getShopData } from '../../utils/api';

export default function BusinessProfile() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [avatar, setAvatar] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getShopData("mancunianbrew@example.com").then((shopData) => {
      setName(shopData.name)
      setDescription(shopData.description)
      setAvatar(shopData.avatar_url)
      setIsLoading(false)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

    return isLoading ? (<ActivityIndicator />) : (
        <ScrollView automaticallyAdjustKeyboardInsets={true} style={styles.container} contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
            <View style={styles.profile}>
                    <Card containerStyle={{borderRadius: 8}}>
                      <Card.Title>{name}</Card.Title>
                      <Card.Image source={{uri: `${avatar ? avatar : profile}`}} height={100}></Card.Image>
                    </Card>
                    <Card containerStyle={{borderRadius: 8}}>
                        <Card.Title><Text>Your Bio</Text></Card.Title>
                        <Text>{description}</Text>
                    <Button title="Update bio" containerStyle={styles.button} 
                    titleStyle={{fontWeight: "bold", fontSize: 13}}
                    buttonStyle={{backgroundColor: "#bf6240"}}
                    />
                    </Card>
               
            </View>
            

            <View style={styles.graph}>
            <Card containerStyle={{borderRadius: 8}}>
              <Card.Title style={styles.title}>Stats</Card.Title>
              <Text>Number of JavaRewards Customers:</Text>
              <LineChart
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
                  datasets: [
                    {
                      data: [ 10, 20, 30, 40, 10, 33
                      ]
                    }
                  ]
                }}
                width={Dimensions.get("window").width * 0.8} // from react-native
                height={180}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </Card>
            <Button onPress={() => {auth.signOut()}}>Sign Out</Button>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    profile: {
     width: "100%",
    },
    button: {
      width: "30%",
      alignSelf: "center",
      marginTop: 5
    },
    title: {
      textAlign: "center",
      fontWeight: "700",
    },
    avatar: {
        margin: 0,
        height: 60,
        width: 60,
        resizeMode: "contain",
    },
    graph: {
        marginBottom: 70,
        width: "100%"
    },
    businessName: {
      fontWeight: "700"
    }
})