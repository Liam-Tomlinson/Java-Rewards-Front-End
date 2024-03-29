import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import axios, { Axios } from "axios";
import { useIsFocused } from "@react-navigation/native";

export default function QrcodeScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const isFocused = useIsFocused()
  
  useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
  }, [isFocused]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    console.log(data, "Scanned data");
    Alert.alert(
      "Scanned successfully!",
      ``,
      [{ text: "OK", onPress: () => setScanned(false) }],
      { cancelable: false }
    );
    axios
      .patch("https://javarewards-api.onrender.com/users/coffee", {
        email: `${data}`,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    
    <View style={styles.container}>
      {isFocused &&
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

      }

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
});
