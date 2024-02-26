import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Button,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import DisplayPreviousOrders from "./display-previous-orders(child)";
import { ScrollView } from "react-native-gesture-handler";
import ProgressBar from "react-native-progress/Bar";
import { auth } from "../config/firebase";

export default function UserProfile() {
  interface User {
    avatar_url: string;
    name: string;
  }

  const currentUserId = 1;
  const [userList, setUserList] = useState<User[]>([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [progress, setProgress] = useState();

  const newProgress = progress % 8;

  useEffect(() => {
    axios
      .get(`https://javarewards-api.onrender.com/orders?user_id=9`)
      .then((res) => {
        setPreviousOrders(res.data.orders[0].orders);
      });
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      axios
        .post(`https://javarewards-api.onrender.com/users/email`, {
          email: "john@example.com",
        })
        .then((res) => {
          setUserList(res.data.user);
          setProgress(res.data.user[0].coffee_count);
        });
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <Text style={styles.title}>Profile</Text>
      {userList.length > 0 && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userList[0].avatar_url }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{userList[0].name}</Text>
          <Button
            containerStyle={styles.button}
            title="log out"
            titleStyle={{ fontWeight: "bold", fontSize: 13 }}
            buttonStyle={{ backgroundColor: "#bf6240" }}
            onPress={() => {
              auth.signOut();
            }}>
            Sign Out
          </Button>
        </View>
      )}
      <View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View>
            <ProgressBar
              width={200}
              height={20}
              color="#d2691e"
              borderWidth={2}
              newProgress={newProgress}
            />
          </View>
        </View>
        <Text style={styles.coffeeMessage}>
          4 more coffees to go before a free coffee!
        </Text>
      </View>
      <View>
        <Text>Previous Orders</Text>
        {previousOrders.map((item) => (
          <DisplayPreviousOrders key={item._id} items={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  coffeeMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#fff',
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     profileImage: {
//       width: 200,
//       height: 200,
//       borderRadius: 100,
//       marginBottom: 10,
//     },
//     userName: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: 20,
//     },
//     coffeeMessage: {
//       fontSize: 16,
//       marginBottom: 20,
//     },
//   });
