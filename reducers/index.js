import { combineReducers } from 'redux';
import decks from './decks'
import loading from './loading';
import score from './score';

export default combineReducers({
  decks,
  loading,
  score
});