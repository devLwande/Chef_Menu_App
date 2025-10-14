// App.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type CourseType = "Starters" | "Mains" | "Desserts" | "Drinks";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
};

const COURSES: CourseType[] = ["Starters", "Mains", "Desserts", "Drinks"];

export default function MainApp() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<CourseType>("Starters");
  const [price, setPrice] = useState("");
  const [menu, setMenu] = useState<MenuItem[]>([]);

  function resetForm() {
    setName("");
    setDescription("");
    setCourse("Starters");
    setPrice("");
  }

  function addMenuItem() {
    // Validate
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter the dish name.");
      return;
    }
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      Alert.alert("Validation", "Please enter a valid price (number).");
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: parsedPrice,
    };

    setMenu((prev) => [newItem, ...prev]);
    resetForm();
  }

  function removeMenuItem(id: string) {
    Alert.alert("Remove", "Remove this menu item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => setMenu((prev) => prev.filter((m) => m.id !== id)),
      },
    ]);
  }

  // Totals and stats (useful later)
  const totalItems = menu.length;

  // (Optional bonus) average price per course (useful for PoE later)
  function getAveragePriceByCourse(): Record<CourseType, number | null> {
    const result: Record<CourseType, number | null> = {
      Starters: null,
      Mains: null,
      Desserts: null,
      Drinks: null,
    };

    COURSES.forEach((c) => {
      const items = menu.filter((m) => m.course === c);
      if (items.length === 0) {
        result[c] = null;
      } else {
        const sum = items.reduce((s, it) => s + it.price, 0);
        result[c] = Math.round((sum / items.length) * 100) / 100; // two decimals
      }
    });

    return result;
  }

  const averages = getAveragePriceByCourse();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding", android: undefined })}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Text style={styles.header}>Christoffel's Menu Manager (Part 2)</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Total items: {totalItems}</Text>
            {/* show a hint for the PoE: averages are computed but not required in Part 2 */}
            <Text style={styles.hintText}>
              (Averages computed for later PoE)
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Add Menu Item</Text>

            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="e.g. Pumpkin Soup"
              style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Short description"
              style={[styles.input, styles.multiline]}
              multiline
            />

            <Text style={styles.label}>Course</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={course}
                onValueChange={(val) => setCourse(val as CourseType)}
                mode="dropdown"
                style={Platform.OS === "ios" ? {} : { height: 44 }}
              >
                {COURSES.map((c) => (
                  <Picker.Item key={c} label={c} value={c} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="e.g. 120.50"
              style={styles.input}
              keyboardType="numeric"
            />

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
                <Text style={styles.addButtonText}>Add to Menu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  resetForm();
                }}
              >
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Menu</Text>

            {totalItems === 0 ? (
              <Text style={styles.emptyText}>No items yet — add one above.</Text>
            ) : (
              <FlatList
                data={menu}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.menuRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.menuName}>
                        {item.name} • R{item.price.toFixed(2)}
                      </Text>
                      <Text style={styles.menuMeta}>
                        {item.course} — {item.description || "No description"}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeMenuItem(item.id)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                scrollEnabled={false}
                // show all items; scroll is on the page itself
              />
            )}
          </View>

          {/* Optional stats display (helpful for PoE) */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Average Price by Course</Text>
            {COURSES.map((c) => {
              const avg = averages[c];
              return (
                <View key={c} style={styles.avgRow}>
                  <Text style={styles.avgCourse}>{c}</Text>
                  <Text style={styles.avgValue}>
                    {avg === null ? "-" : `R${avg.toFixed(2)}`}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  summaryText: { fontSize: 16, fontWeight: "600" },
  hintText: { fontSize: 12, color: "#666" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  label: { fontSize: 13, color: "#333", marginTop: 8, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#E6E9EE",
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  multiline: { minHeight: 60, textAlignVertical: "top" },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E6E9EE",
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonsRow: { flexDirection: "row", marginTop: 12, gap: 8 },
  addButton: {
    flex: 1,
    backgroundColor: "#1f6feb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "700" },
  clearButton: {
    marginLeft: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  clearButtonText: { color: "#333", fontWeight: "600" },

  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  menuName: { fontWeight: "700", fontSize: 15 },
  menuMeta: { color: "#666", fontSize: 13 },
  removeButton: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ff4d4f",
  },
  removeButtonText: { color: "#ff4d4f", fontWeight: "700" },
  separator: { height: 1, backgroundColor: "#F0F2F5", marginVertical: 6 },
  emptyText: { color: "#666", fontStyle: "italic" },
  avgRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  avgCourse: { fontWeight: "600" },
  avgValue: { color: "#333" },
});

