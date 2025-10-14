
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Christofel Personalised Private Menu</Text>
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 32,
    color: "#374151",
  },
  button: {
    backgroundColor: "#1f6feb",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
