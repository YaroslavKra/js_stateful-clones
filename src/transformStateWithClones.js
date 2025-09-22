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

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = Object.assign({}, currentState, action.extraData);
        break;

      case 'removeProperties':
        newState = Object.assign({}, currentState);

        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        newState = Object.assign({}, currentState);
    }
    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
