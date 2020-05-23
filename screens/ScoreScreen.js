import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import Constants from 'expo-constants';

class ScoreScreen extends Component {
  onRestartQuiz = () => {
    this.props.setInitialScore(this.props.score.totalCards);
    this.props.navigation.navigate(
      'Quiz',
      { deckId: this.props.deckId, currentQuestion: 0 }
    )
  }

  render() {
    const {  score, pct, deckId } = this.props; 
    return (
      <View style={styles.container}>
        <View style={{flex: 0.2}}>
          <Text style={{color: '#1eba54', fontSize: 25, textAlign: 'center'}}>Quiz Complete!</Text>
          <Text style={{color: 'red', fontSize: 40, textAlign: 'center'}}>{`${score.correctCards} / ${score.totalCards} correct`}</Text>
        </View>
        <View style={{flex: 0.2}}>
          <Text style={{color: '#1eba54', fontSize: 25, textAlign: 'center'}}>Precentage Correct</Text>
          <Text style={{color: 'red', fontSize: 40, textAlign: 'center'}}>{`${pct}%`}</Text>
        </View>
        <View style={{flex: 0.5, alignSelf: 'stretch', justifyContent: 'center'}}>
          <Button
            title='Restart Quiz'
            type='solid'
            containerStyle={[styles.buttonContainer]}
            buttonStyle={{backgroundColor: '#1eba54', height: 56}}
            titleStyle={{fontSize: 20}}
            onPress={this.onRestartQuiz}
          />
          <Button
            title='Back to Deck'
            type='outline'
            containerStyle={[styles.buttonContainer, {borderColor: '#1eba54', borderWidth: 3}]}
            buttonStyle={{height: 56}}
            titleStyle={{fontSize: 20, color: '#1eba54'}}
            onPress={()=> { this.props.navigation.navigate('DeckDetail', { deckId: deckId })}}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#403d3d',
    paddingTop: Constants.statusBarHeight,
  },
  buttonContainer: {
    marginLeft: 50,
    marginRight: 50, 
    borderRadius: 8,
    marginBottom: 30
  },
});

const mapStateToProps = ({ score }, {route}) => {
  const { deckId } = route.params;
  return {
    score: score,
    deckId: deckId,
    pct: Math.round((score.correctCards / score.totalCards) * 100)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInitialScore: (totalCards) => dispatch(actions.setInitialScore(totalCards)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreScreen);


