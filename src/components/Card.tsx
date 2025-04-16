import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface CardProps {
  title: string;
  value: string | number;
  // Optionally, you can pass extra style or animation props
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  // You can add animation logic here if needed
  return (
    <Animated.View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF', // adjust to design color
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // adjust per design
  },
  cardValue: {
    fontSize: 20,
    marginTop: 8,
    color: '#000', // adjust per design
  },
});

export default Card;
