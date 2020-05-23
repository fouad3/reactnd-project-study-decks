import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';

export default function DeckItem ({item, onPressDeck}) {
  return (
    <ListItem
      Component={TouchableScale}
      friction={90} 
      tension={100} 
      activeScale={0.95}
      linearGradientProps={{
        colors: ['#23ee6c', '#159241'],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      ViewComponent={LinearGradient}
      title={item.title}
      titleStyle={styles.title}
      subtitleStyle={styles.subTitle}
      subtitle={`${item.questions.length} cards`}
      bottomDivider
      topDivider
      containerStyle={styles.container}
      onPress={()=> {onPressDeck(item.title)}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    marginBottom: Constants.statusBarHeight
  },
  title: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 25, 
    textAlign: 'center'
  },
  subTitle: {
    color: 'white', 
    fontSize: 18, 
    textAlign: 'center'
  }
});