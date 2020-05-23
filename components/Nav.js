import React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DeckListScreen from '../screens/DeckListScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import DeckDetailScreen from '../screens/DeckDetailScreen';
import AddCardScreen from '../screens/AddCardScreen';
import QuizScreen from '../screens/QuizScreen';
import ScoreScreen from '../screens/ScoreScreen';

const RouteConfigs = {
  DeckList: {
    name: 'DeckList',
    component: DeckListScreen,
    options: {tabBarIcon: ({color}) => <MaterialCommunityIcons name='library-books' size={35} color={color} />, title: 'Deck List'}
  }, 
  NewDeck: {
    name: 'NewDeck',
    component: NewDeckScreen,
    options: {tabBarIcon: ({color}) => <MaterialIcons name='library-add' size={35} color={color} />, title: 'New Deck'}
  }, 
};
  
const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    indicatorStyle: {
      backgroundColor: '#27ff74'
    },
    activeTintColor: '#1eba54',
    style: {
      height: Platform.OS === 'ios'? 70: 65,
      backgroundColor: '#403d3d',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      paddingBottom: Platform.OS === 'ios'? 4 : 'auto',
      paddingTop: Platform.OS === 'ios'? 4 : 'auto',
    },
    labelStyle: {
      fontSize: 20,
    },
  }
};

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator();
  
const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
    <Tab.Screen {...RouteConfigs['DeckList']} />
    <Tab.Screen {...RouteConfigs['NewDeck']} />
  </Tab.Navigator>
);
  
const StackNavigatorConfig = {
  headerMode: 'screen',
};

const StackConfig = {
  TabNav: {
    name: 'Home',
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckDetail: {
    name: 'DeckDetail',
    component: DeckDetailScreen,
    options: {
      headerTintColor: '#1eba54',
      headerStyle:{
        backgroundColor: '#403d3d'
      },
      headerBackTitleVisible: false
    }
  }, 
  AddCard: {
    name: 'AddCard',
    component: AddCardScreen,
    options: {
      headerTintColor: '#1eba54',
      headerStyle:{
        backgroundColor: '#403d3d'
      },
      headerBackTitleVisible: false,
      title: 'Add Card'
    }
  },
  Quiz: {
    name: 'Quiz',
    component: QuizScreen,
    options: {
      headerTintColor: '#1eba54',
      headerStyle:{
        backgroundColor: '#403d3d'
      },
      headerBackTitleVisible: false,
      title: 'Quiz'
    }
  },
  Score: {
    name: 'Score',
    component: ScoreScreen,
    options: {
      headerShown: false
    }
  }
};

const Stack = createStackNavigator();

const MainNav = () => (
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckDetail']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
    <Stack.Screen {...StackConfig['Score']} />
  </Stack.Navigator>
);

export default function Nav() {
  return (
    <NavigationContainer>
      <MainNav />
    </NavigationContainer>
  )
};