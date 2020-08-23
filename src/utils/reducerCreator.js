export default function reducerCreator(name, actions) {
  return (state, {type, payload}) => {
    if (state === undefined || state === null) {
      throw new Error(`state object must be defined for the store ${name}`);
    }

    if (type === undefined || type === null || typeof type !== 'string') {
      throw new Error('Your type of action must be defined in string');
    }

    const action = actions[type];

    if (action === undefined) {
      throw new Error(`Invalid action type ${type}`);
    }

    return action(payload)(state);
  };
}