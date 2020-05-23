export const SET_INITIAL_SCORE = 'SET_INITIAL_SCORE';
export const INCREMENT_CORRECT_CARDS = 'INCREMENT_CORRECT_CARDS';

export function setInitialScore (totalCards) {
  return {
    type: SET_INITIAL_SCORE,
    totalCards
  }
}

export function incrementCorrectCards () {
  return {
    type: INCREMENT_CORRECT_CARDS,
  }
}