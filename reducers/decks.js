import { 
  SET_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD_TO_DECK,
  REMOVE_CARD_FROM_DECK
} from '../actions/desks';

export default function decks (state = {}, action) {
  switch (action.type) {
    case SET_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case REMOVE_DECK :
      let decks = {...state};
      decks[action.title] = undefined;
      delete decks[action.title];
      return {
        ...decks
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat([action.card])
        }
      }
    case REMOVE_CARD_FROM_DECK :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.filter(card => card.question === action.card.question && card.answer === action.card.answer)
        }
      }
    default :
      return state
  }
}