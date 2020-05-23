import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import Constants from 'expo-constants';
import Question from '../components/Question';
import { setLocalNotification, clearLocalNotification } from '../utils/notification';


class QuizScreen extends Component {
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  onPressCorrect = () => {
    this.props.incrementCorrectCards();
    this.toNextScreen();
  }

  toNextScreen = () => {
    const { currentQuestion, deck } = this.props;
    if (deck.questions.length <= currentQuestion + 1) {
      this.props.navigation.navigate('Score', { deckId: deck.title })
    } else {
      this.props.navigation.navigate(
        'Quiz',
        { deckId: deck.title, currentQuestion:  currentQuestion + 1}
      )
    }
  }

  render() {
    const { deck, currentQuestion, totalCards } = this.props; 
    return (
      <View style={styles.container}>
        <View style={{flex: 0.1}}>
          <Text style={{color: '#1eba54', fontSize: 30, marginLeft: 15}}>{currentQuestion + 1}/{totalCards}</Text>
        </View>
        <View style={{flex: 0.4}}>  
          <Question item={deck.questions[currentQuestion]} />
        </View>
        <View style={{flex: 0.55, justifyContent: 'center'}}>
          <Button
            title='Correct'
            type='solid'
            containerStyle={[styles.buttonContainer]}
            buttonStyle={{backgroundColor: '#1eba54', height: 56}}
            titleStyle={{fontSize: 20}}
            onPress={this.onPressCorrect}
          />
          <Button
            title='Incorrect'
            type='solid'
            containerStyle={[styles.buttonContainer]}
            buttonStyle={{backgroundColor: 'red', height: 56}}
            titleStyle={{fontSize: 20}}
            onPress={this.toNextScreen}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch', 
    justifyContent: 'space-between',
    backgroundColor: '#403d3d',
    paddingTop: Constants.statusBarHeight,
  },
  buttonContainer: {
    marginLeft: 100,
    marginRight: 100, 
    borderRadius: 8,
    marginBottom: 30
  },
});

const mapStateToProps = ({ decks, score }, {route}) => {
  const { deckId, currentQuestion } = route.params;
  return {
    deck: decks[deckId],
    currentQuestion: currentQuestion,
    totalCards: score.totalCards
  }
}
  
const mapDispatchToProps = dispatch => {
  return {
    incrementCorrectCards: () => dispatch(actions.incrementCorrectCards()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizScreen);


