import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { StyleSheet, View, ActivityIndicator, FlatList, Text } from 'react-native';
import * as actions from '../actions';
import DeckItem from '../components/DeckItem';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

class DeckListScreen extends Component {
  componentDidMount() {
    this.props.fetchDecks();
  }

  onPressDeck = (deckId) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: deckId }
    )
  }

  render() {
    const { loading, decks } = this.props;
    const decksArr = Object.values(decks).reverse();
    return (
      <View style={{flex: 1, backgroundColor: '#403d3d'}}>
       {
         loading ? (
            <View style={styles.spinner}>
              <ActivityIndicator size='large' color='#1eba54' />
            </View>
          ) : (
            decksArr.length > 0 ? (
              <View style={styles.container}>
                <FlatList
                  data={decksArr}
                  renderItem={({ item }) => <DeckItem item={item} onPressDeck={this.onPressDeck} />}
                  keyExtractor={item => item.title}
                />
              </View>
            ) : (
              <View style={[{flex: 1,}, styles.spinner]}>
                <MaterialCommunityIcons name='gesture-tap' size={50} color='#1eba54' />
                <Text style={styles.noDataText}>No Decks Available</Text>
                <Text style={styles.noDataText}>Tap on "New Deck" tab and add one</Text>
              </View>
            )
          ) 
       }
      </View> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: Constants.statusBarHeight,
    paddingRight: 20,
    paddingLeft: 20
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  noDataText: {
    color: '#1eba54',
    fontSize: 30, 
    textAlign: 'center'
  }
});

const mapStateToProps = ({ decks, loading }) => {
  return {
    decks,
    loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDecks: () => dispatch(actions.fetchDecks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListScreen);
