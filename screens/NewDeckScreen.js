import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as actions from '../actions';
import Constants from 'expo-constants';

class NewDeckScreen extends Component {
  state = {
    value: '',
    errorMessage: ''
  }

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    // reset the screen to initial state after leaving it
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      this.setState({
        value: '',
        errorMessage: ''
      })
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onChangeText = (text) => {
    if (text) {
      this.setState({
        value: text,
        errorMessage: ''
      })
    } else {
      this.setState({
        value: '',
        errorMessage: 'please enter a title for your deck!'
      })
    }
  }

  onPress = () => {
    Keyboard.dismiss();
    if(this.state.value === '') {
      this.setState({
        errorMessage: 'please enter a title for your deck!'
      }, () => {
        this.inputRef.current.shake();
      })
    } else {
      this.props.saveDeck(this.state.value);
      this.props.navigation.navigate(
        'DeckDetail',
        { deckId: this.state.value }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
          <Input 
            placeholder='Deck Title'
            ref={this.inputRef}
            inputContainerStyle={{ marginLeft: 15, marginRight: 15}}
            onChangeText={this.onChangeText}
            defaultValue={this.state.value}
            errorMessage={this.state.errorMessage}
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
    backgroundColor: '#403d3d'
  },
  subContainer: {
    flex: 0.80,
    alignSelf: 'stretch', 
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 40, 
    color: '#1eba54', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginLeft: 25,
    marginRight: 25, 
    borderRadius: 8, 
  }
});

const mapDispatchToProps = dispatch => {
  return {
    saveDeck: (title) => dispatch(actions.saveDeck(title)),
  }
}

export default connect(null, mapDispatchToProps)(NewDeckScreen);


