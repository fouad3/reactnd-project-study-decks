import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as actions from '../actions';
import Constants from 'expo-constants';
import { CommonActions } from '@react-navigation/native';

class AddCardScreen extends Component {
  state = {
    question: '',
    answer: '',
    errorMessage: {
      question: '',
      answer: ''
    }
  }

  constructor(props) {
    super(props);
    this.questionInputRef = React.createRef();
    this.answerInputRef = React.createRef();
  }

  componentDidMount() {
    // reset the screen to initial state after leaving it
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setState({
        question: '',
        answer: '',
        errorMessage: {
          question: '',
          answer: ''
        }
      })
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onChangeQuestionText = (text) => {
    if (text) {
      this.setState((prevState) => ({
        ...prevState,
        question: text,
        errorMessage: {
          ...prevState.errorMessage,
          question: ''
        } 
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        question: '',
        errorMessage: {
          ...prevState.errorMessage,
          question: 'please enter a question for your card!'
        } 
      }))
    }
  }

  onChangeAnswerText = (text) => {
    if (text) {
      this.setState((prevState) => ({
        ...prevState,
        answer: text,
        errorMessage: {
          ...prevState.errorMessage,
          answer: ''
        } 
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        answer: '',
        errorMessage: {
        ...prevState.errorMessage,
        answer: 'please enter an answer for your question!'
        } 
      }))
    }
  }

  onPress = () => {
    Keyboard.dismiss();
    if(this.state.question === '' || this.state.answer === '') {
      if (this.state.question === '') {
        this.setState((prevState) => ({
          ...prevState,
          errorMessage: {
          ...prevState.errorMessage,
          question: 'please enter a question for your card!'
          } 
        }), () => {
          this.questionInputRef.current.shake();
        })
      }
      if (this.state.answer === '') {
        this.setState((prevState) => ({
          ...prevState,
          errorMessage: {
          ...prevState.errorMessage,
          answer: 'please enter an answer for your question!'
          } 
        }), () => {
          this.answerInputRef.current.shake();
        })
      }
    } else {
      this.props.saveCardToDeck(this.props.route.params.deckId, {
        question: this.state.question,
        answer: this.state.answer
      });
      this.props.navigation.dispatch(
        CommonActions.goBack({
        key: 'AddCard',
      }))
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Input 
            placeholder='Question'
            ref={this.questionInputRef}
            inputContainerStyle={{ marginLeft: 15, marginRight: 15}}
            containerStyle={{borderRadius: 3, borderColor: '#1eba54' }}
            onChangeText={this.onChangeQuestionText}
            defaultValue={this.state.question}
            errorMessage={this.state.errorMessage.question}
            errorStyle={{marginLeft: 20, fontSize: 20}}
            inputStyle={{color: 'white'}}
            placeholderTextColor= 'white'
          />
          <Input 
            placeholder='Answer'
            ref={this.answerInputRef}
            inputContainerStyle={{ marginLeft: 15, marginRight: 15}}
            containerStyle={{borderRadius: 3, borderColor: '#1eba54' }}
            onChangeText={this.onChangeAnswerText}
            defaultValue={this.state.answer}
            errorMessage={this.state.errorMessage.answer}
            errorStyle={{marginLeft: 20, fontSize: 20}}
            inputStyle={{color: 'white'}}
            placeholderTextColor= 'white'
          />
          <Button
            title='Submit'
            type='solid'
            containerStyle={styles.buttonContainer}
            buttonStyle={{backgroundColor: '#1eba54', height: 56}}
            titleStyle={{fontSize: 20}}
            onPress={this.onPress}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#403d3d',
  },
  subContainer: {
    flex: 0.4,
    alignSelf: 'stretch', 
    justifyContent: 'space-between'
  },
  buttonContainer: {
    marginLeft: 25,
    marginRight: 25, 
    borderRadius: 8, 
  }
});

const mapDispatchToProps = dispatch => {
  return {
    saveCardToDeck: (title, card) => dispatch(actions.saveCardToDeck(title, card)),
  }
}

export default connect(null, mapDispatchToProps)(AddCardScreen);


