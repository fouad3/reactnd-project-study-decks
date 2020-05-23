import { AsyncStorage } from 'react-native';
import { showLoading, hideLoading } from './loading';
import { showMessage } from 'react-native-flash-message';

const DECKS_STORAGE_KEY = 'StudyDecks:decks';

export const SET_DECKS = 'SET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const REMOVE_CARD_FROM_DECK = 'REMOVE_CARD_FROM_DECK';

export function fetchDecks () {
  return (dispatch) => {
    dispatch(showLoading());
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const decks = results? JSON.parse(results) : [];
        dispatch(setDecks(decks));
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(hideLoading());
        showMessage({
          message: 'cannot fetch decks!',
          type: 'danger',
        });
      })
  }
}

export function saveDeck (title) {
  return (dispatch) => {
    const newDeck = {
      title: title,
      questions: []
    }
    dispatch(addDeck(newDeck));
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({[newDeck.title]: newDeck}))
      .catch((err) => {
        dispatch(removeDeck(title));
        showMessage({
          message: `cannot save "${title}" deck!`,
          type: 'danger',
        });
      })
  }
}

export function saveCardToDeck (title, card) {
  return (dispatch) => {
    dispatch(addCardToDeck(title, card));
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results);
        data[title].questions.push(card);
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      })
      .catch((err) => {
        dispatch(removeCardFromDeck(title, card));
        showMessage({
          message: `cannot save the card to ${title}!`,
          type: 'danger',
        });
      })
  }
}

export function deleteDeck (deck) {
  return (dispatch) => {
    dispatch(removeDeck(deck.title))
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then((results) => {
        const data = JSON.parse(results)
        data[deck.title] = undefined
        delete data[deck.title]
        return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
      })
      .catch((err) => {
        addDeck(deck);
        showMessage({
          message: `cannot delete ${deck.title} deck!`,
          type: 'danger',
        });
      })
  }
}

export function setDecks (decks) {
  return {
    type: SET_DECKS,
    decks,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function removeDeck (title) {
  return {
    type: REMOVE_DECK,
    title,
  }
}

export function addCardToDeck (title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  }
}

export function removeCardFromDeck (title, card) {
  return {
    type: REMOVE_CARD_FROM_DECK,
    title,
    card
  }
}
