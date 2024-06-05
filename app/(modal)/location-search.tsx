import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 44.0189105,
    longitude: 18.182084,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search or move the map"
        onPress={(data, details) => {
          const point = details?.geometry.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View style={styles.boxIcon}>
            <Ionicons name="search-outline" size={28} color={Colors.grey} />
          </View>
        )}
        styles={{
          container: { flex: 0 },
          textInput: {
            backgroundColor: Colors.lightGrey,
            paddingLeft: 35,
            borderRadius: 10,
          },
          textInputContainer: {
            backgroundColor: "#fff",
            padding: 8,
          },
        }}
      />
      <MapView showsUserLocation style={styles.map} region={location} />
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    width: "100%",
    bottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  boxIcon: {
    position: "absolute",
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default LocationSearch;
