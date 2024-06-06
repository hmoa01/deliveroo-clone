import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      {restaurants.map((restaurant, index) => (
        <View key={index} style={styles.restaurantCard}>
          <Link href={"/details"} key={index} asChild>
            <TouchableOpacity>
              <View style={styles.restaurantCard}>
                <Image source={restaurant.img} style={styles.image} />
                <View style={styles.categoryBox}>
                  <Text style={styles.categoryText}>{restaurant.name}</Text>
                  <Text style={{ color: Colors.green }}>
                    {restaurant.rating} {restaurant.ratings}
                  </Text>
                  <Text style={{ color: Colors.medium }}>
                    {restaurant.distance}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  restaurantCard: {
    width: 350,
    height: 250,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  restaurantText: {
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  image: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
  imageContainer: {},
  categoryBox: {
    flex: 2,
    padding: 10,
  },
  categoryText: {
    paddingVertical: 5,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Restaurants;
