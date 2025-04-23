import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export type TabButtonType = {
  title: string;
};
type TabButtonsProps = {
  buttons: TabButtonType[];
  selectedType: number;
  setSelectedTab: (val: number) => void;
};
const TabButton = ({buttons, selectedTab, setSelectedTab}: TabButtonsProps) => {
  const [dimension, setDimension] = useState({height: 20, width: 100});
  const buttonWidth = dimension.width / buttons.length;
  return (
    <View>
      <Text>TabButtons</Text>
    </View>
  );
};

export default TabButton;
