import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CustomProgressCircle = ({ progress = 0.76, size = 80, strokeWidth = 8, color = '#44d6a8' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text style={styles.label}>{Math.round(progress * 100)}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#44d6a8',
  },
});

export default CustomProgressCircle;
