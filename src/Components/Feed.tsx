import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { formatDate, getOffers } from "../../utils/feedapi";
import { SafeAreaView } from "react-native-safe-area-context";

interface Offer {
  img?: string;
  description: string;
  date?: string;
  name?: string;
}

export default function Feed() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    getOffers().then((data) => {
      setOffers(data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Offers</Text>
        </View>
        {offers.map((offer) => {
          const formattedDate = formatDate(offer.date);
          return (
            <View key={offer.name} style={styles.card}>
              <Image source={{ uri: offer.img }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.shopName}>{offer.name}</Text>
                <Text style={styles.description}>{offer.description}</Text>
                <Text style={styles.date}>Offer ends {formattedDate}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    backgroundColor: "#f5ece4",
  },
  headingContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: width * 0.02,
    overflow: "hidden",
    // marginBottom: width * 0.02,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: "cover",
  },
  cardContent: {
    padding: width * 0.04,
    flexShrink: 1,
  },
  shopName: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  description: {
    fontSize: width * 0.035,
    color: "#666",
    marginVertical: width * 0.005,

    // flex: 1,
    // flexWrap: "wrap",
  },
  date: {
    fontSize: width * 0.03,
    color: "#999",
  },
});
