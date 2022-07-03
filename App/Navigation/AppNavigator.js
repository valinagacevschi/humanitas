import { StackNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import CategoryScreen from '../Containers/CategoryScreen';
import BookScreen from '../Containers/BookScreen';
import CartScreen from '../Containers/CartScreen';
import LoginScreen from '../Containers/LoginScreen';
import RecoverScreen from '../Containers/RecoverScreen';
import RegisterScreen from '../Containers/RegisterScreen';
import PlayerScreen from '../Containers/PlayerScreen';
import PayuScreen from '../Containers/PayuScreen';
import MyBooksScreen from '../Containers/MyBooksScreen';
import ProfileScreen from '../Containers/ProfileScreen';
import WebScreen from '../Containers/WebScreen';
import ReaderScreen from '../Containers/ReaderScreen';

const MainScreenNavigator = StackNavigator({
  home: { screen: LaunchScreen },
  category: { screen: CategoryScreen },
  cart: { screen: CartScreen },
  profile: { screen: ProfileScreen },
  mybooks: { screen: MyBooksScreen },
  book: { screen: BookScreen },
  payu: { screen: PayuScreen },
  terms: { screen: WebScreen },
  reader: { screen: ReaderScreen },
  player: { screen: PlayerScreen },
}, {
  headerMode: 'none',
  contentOptions: {},
  navigationOptions: { },
});

const AppNavigator = StackNavigator({
  // home: { screen: ProfileScreen },
  home: { screen: MainScreenNavigator },
  login: { screen: LoginScreen },
  register: { screen: RegisterScreen },
  recover: { screen: RecoverScreen },
  terms: { screen: WebScreen },
}, {
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: { },
});

export default AppNavigator;
