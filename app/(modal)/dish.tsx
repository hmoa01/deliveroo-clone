import {
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { getDishById } from "@/assets/data/restaurant";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import useBasketStore from "@/store/basketStore";

const dish = () => {
  const { id } = useLocalSearchParams();
  const item = getDishById(+id)!; //+ convert id(number) to string
  const router = useRouter();

  const { addProduct } = useBasketStore();

  const navigation = useNavigation();

  const addToCart = () => {
    addProduct(item);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.Image
          source={item?.img} // Replace with your image source
          style={styles.image}
          entering={FadeIn.duration(400).delay(200)}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <Ionicons name="close-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
        <View style={{ padding: 20 }}>
          <Animated.Text
            style={styles.dishName}
            entering={FadeInLeft.duration(400).delay(200)}
          >
            {item?.name}
          </Animated.Text>
          <Animated.Text
            style={styles.dishInfo}
            entering={FadeInLeft.duration(400).delay(400)}
          >
            {item?.info}
          </Animated.Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
              <Text style={styles.footerText}>Add for ${item?.price}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  closeButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 30 : 40,
    left: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
  },
  dishName: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  dishInfo: { fontSize: 16, color: Colors.mediumDark },
  footer: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  footerText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default dish;
