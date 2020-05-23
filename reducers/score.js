import { SET_INITIAL_SCORE, INCREMENT_CORRECT_CARDS } from '../actions/score';

export default function score (state = {}, action) {
  switch (action.type) {
    case SET_INITIAL_SCORE :
      return {
        ...state,
        correctCards: 0,
        totalCards: action.totalCards,
      }
    case INCREMENT_CORRECT_CARDS :
      return {
        ...state,
        correctCards: state.correctCards + 1
      }
    default :
      return state
  }
}