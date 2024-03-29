import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import background from "../../images/login_background.jpg";
import { useNavigation } from "@react-navigation/native";
import { useAccountContext } from "../contexts/AccountContext";
import { storeUserEmail, storeUserType } from "../../utils/rememberUserType";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");

  const { accountType } = useAccountContext();

  const navigation = useNavigation<any>();

  const signIn = async () => {
    setLoading(true);

    try {
      await storeUserType(accountType);
      await storeUserEmail(email);
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err);
      Alert.alert("Sign in failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={background}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Welcome to Java Rewards!</Text>
          {error && (
            <View>
              <Text style={styles.error}>{error}</Text>
            </View>
          )}

          {loginError && (
            <View>
              <Text style={styles.error}>{loginError}</Text>
            </View>
          )}

          <Input
            value={email}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => {
              setEmail(text);
            }}
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "white",
            }}
          />

          <Input
            value={password}
            style={styles.input}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => {
              setPassword(text);
            }}
            leftIcon={{ type: "font-awesome", name: "key", color: "white" }}
          ></Input>
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="0000ff" />
          ) : (
            <>
              <TouchableOpacity
                onPress={() => {
                  if (!email || !password) {
                    setLoginError("Email and password are required");
                    return;
                  } else {
                    setLoginError("");
                    signIn();
                  }
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>Or</Text>
              <TouchableOpacity
                onPress={() => {
                  if (accountType === "Customer") {
                    navigation.navigate("CreateAccCustomer");
                  } else {
                    navigation.navigate("CreateAccBusiness");
                  }
                }}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 60,
    color: "white",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ECE1DD",
    borderRadius: 10,
    marginTop: 5,
    width: 300,
    borderColor: "#BF6240",
    borderWidth: 1,
    fontSize: 14,
  },
  inputContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#bf6240",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#bf6240",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#bf6240",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "white",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontWeight: 'bold'
  },
  orText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    padding: 10,
  },
});
