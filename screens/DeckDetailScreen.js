import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import * as actions from '../actions';

const window = Dimensions.get('window');

class DeckDetailScreen extends Component {
  state ={
    visible: false,
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: `${this.props.deck.title}`
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.deck? true : false;
  }

  onDeleteDeck = () => {
    this.props.deleteDeck(this.props.deck);
    this.props.navigation.navigate('DeckList');
  }

  onStartQuiz = () => {
    const totalCards = this.props.deck.questions.length;
    if (totalCards === 0) {
      this.setState({
        visible: true,
      })
    } else {
      this.props.setInitialScore(totalCards);
      this.props.navigation.navigate(
        'Quiz',
        { deckId: this.props.deck.title, currentQuestion: 0 }
      )
    }
  }
  
  toAddCard = () => {
    this.closeOverlay();
    this.props.navigation.navigate('AddCard', { deckId: this.props.deck.title });
  }

  closeOverlay = () => {
    this.setState({
      visible: false,
    })
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={{flex:1, backgroundColor: '#403d3d'}}>
        <Overlay 
          isVisible={this.state.visible} 
          onBackdropPress={this.toggleOverlay}
          overlayStyle={styles.overlayStyle}
        >
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Text style={styles.overlayText}>
                Sorry, you can't take a quiz because there are no cards in the deck
              </Text>
            </View>
            <View style={styles.buttonGroupOverlayContainer}>
              <Button
                title='Add Card'
                type='solid'
                buttonStyle={{backgroundColor: '#1eba54', height: 56}}
                containerStyle={{marginBottom: 20}}
                titleStyle={{fontSize: 20}}
                onPress={this.toAddCard}
              />
              <Button
                title='cancel'
                type='outline'
                containerStyle={{borderColor: '#1eba54', borderWidth: 3}}
                buttonStyle={{ height: 56}}
                titleStyle={{fontSize: 20, color: '#1eba54'}}
                onPress={this.closeOverlay}
              />
            </View>
          </View>
        </Overlay>
        <View style={styles.subContainer}>
          <View style={{flex: 0.30,  justifyContent: 'center'}}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.subTitle}>{`${deck.questions.length} cards`}</Text>
          </View>
          <View style={{flex: 0.70, justifyContent: 'center', alignSelf: 'stretch'}}>
            <Button
              title='Add Card'
              type='outline'
              containerStyle={[styles.buttonContainer, {borderColor: '#1eba54', borderWidth: 3}]}
              buttonStyle={{ height: 56}}
              titleStyle={{fontSize: 20, color: '#1eba54'}}
              onPress={()=> { this.props.navigation.navigate('AddCard', { deckId: deck.title })}}
            />
            <Button
              title='Start Quiz'
              type='solid'
              containerStyle={styles.buttonContainer}
              buttonStyle={{backgroundColor: '#1eba54', height: 56}}
              titleStyle={{fontSize: 20}}
              onPress={(this.onStartQuiz)}
            />
            <Button
              title='Delete Deck'
              type='clear'
              containerStyle={styles.buttonContainer}
              buttonStyle={{ height: 56}}
              titleStyle={{fontSize: 20, color: 'red'}}
              onPress={this.onDeleteDeck}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 0.88,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 40, 
    color: '#1eba54', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20, 
    color: 'grey', 
    textAlign: 'center', 
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginLeft: 100,
    marginRight: 100, 
    borderRadius: 8,
    marginBottom: 30
  },
  overlayStyle: {
    width: (window.width - 50), 
    height: (window.height/2), 
    backgroundColor: '#403d3d'
  },
  buttonGroupOverlayContainer: {
    flex: 0.5, 
    justifyContent: 'flex-start', 
    alignSelf: 'stretch', 
    padding: 40
  },
  overlayText: {
    fontSize: 25, 
    color: '#1eba54', 
    textAlign: 'center'
  }
});

const mapStateToProps = ({ decks }, {route}) => {
  const { deckId } = route.params;
  return {
    deck: decks[deckId]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: (deck) => dispatch(actions.deleteDeck(deck)),
    setInitialScore: (totalCards) => dispatch(actions.setInitialScore(totalCards)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetailScreen);
