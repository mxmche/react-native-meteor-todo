import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Loading from './components/Loading';
import config from './config';
import TodoList from './layouts/TodoList'

Meteor.connect(config.METEOR_URL);

const RNApp = (props) => {
  const { status } = props;

  if (status.connected === false) {
    return <Loading />;
  } else {
    return <TodoList />;
  }
};

RNApp.propTypes = {
  status: React.PropTypes.object
};

export default createContainer(() => {
  return {
    status: Meteor.status()
  };
}, RNApp);
