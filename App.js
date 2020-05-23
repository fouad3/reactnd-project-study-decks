import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import middleware from './middleware';
import reducer from './reducers';
import Nav from './components/Nav';
import { setLocalNotification } from './utils/notification';
import AppStatusBar from './components/AppStatusBar';
import FlashMessage from 'react-native-flash-message';

const store = createStore(
  reducer,
  middleware,
)

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor='#403d3d' barStyle='light-content' />
          <SafeAreaView style={{flex: 1}}>
            <Nav />
          </SafeAreaView>
          {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
          <FlashMessage position="bottom" />
        </View>
      </Provider>
    )
  }
}





