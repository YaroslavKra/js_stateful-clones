'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    let newState = { ...currentState };

    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      newState = Object.assign({}, currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      newState = Object.assign({}, currentState);

      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else {
      newState = Object.assign({}, currentState);
    }
    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
