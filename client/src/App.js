import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';

function App() {
	return (
		<BrowserRouter>
			<Header />

			<Switch>
				<Route exact path='/' render={() => <Redirect to='/products' />} />
				<Route path='/products' component={ProductsScreen} />
				<Route path='/product/:id' component={ProductScreen} />
				<Route path='/login' component={LoginScreen} />
				<Route path='/register' component={RegisterScreen} />
				<Route path='/cart' component={CartScreen} />
				<Route path='/shipping' component={ShippingScreen} />
				<Route path='/payment' component={PaymentScreen} />
				<Route path='/placeorder' component={PlaceOrderScreen} />
				<Route path='/order/:id' component={OrderScreen} />
				<Route path='/myorders' component={MyOrdersScreen} />
			</Switch>

			<Footer />
		</BrowserRouter>
	);
}

export default App;
