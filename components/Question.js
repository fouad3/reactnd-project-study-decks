import React, { Component } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import FlipCard from 'react-native-flip-card';

const window = Dimensions.get('window');

export default class Question extends Component {
  state = {
    flip: false,
    faceSide: true  
  }

  onFlip = () => {
    this.setState((prevState) => ({flip: !prevState.flip, faceSide: !prevState.faceSide}));
  }

  render () {
    const { item } = this.props;
    return (
      <View style={styles.container}>
        <FlipCard
          flipHorizontal
          flipVertical={false}
          style={{borderWidth: 0, marginBottom: 0}}
          clickable={false}
          flip={this.state.flip}
        >
          {/* Face Side */}
          <ListItem
            friction={90} 
            tension={100} 
            activeScale={0.95}
            linearGradientProps={{
            colors: ['#23ee6c', '#159241'],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
            }}
            ViewComponent={LinearGradient}
            title={item.question}
            titleStyle={styles.faceTitle}
            containerStyle={styles.listItemContainer}
          />
          {/* Back Side */}
          <ListItem
            friction={90} 
            tension={100} 
            activeScale={0.95}
            linearGradientProps={{
            colors: ['#23ee6c', '#159241'],
            start: { x: 1, y: 0 },
            end: { x: 0.2, y: 0 },
            }}
            ViewComponent={LinearGradient}
            title={item.answer}
            titleStyle={styles.backTitle}
            containerStyle={styles.listItemContainer}
          />
        </FlipCard>
        <Button
          title={this.state.faceSide ? 'Answer' : 'Question'}
          type='clear'
          buttonStyle={{ height: 45}}
          titleStyle={{fontSize: 20, color: 'red'}}
          onPress={this.onFlip}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'flex-start'
  },
  listItemContainer: {
    borderRadius: 8,
    width: window.width - 70,
    height: window.height/4.5
  },
  faceTitle: {
    color: 'white',
    fontWeight: 'bold', 
    fontSize: 25, 
    textAlign: 'center'
  },
  backTitle: {
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 25, 
    textAlign: 'center'
  }
});