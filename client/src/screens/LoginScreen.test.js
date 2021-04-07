import { render, screen } from '@testing-library/react';
import LoginScreen from './LoginScreen';
import store from '../store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

test.skip('renders login screen', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginScreen />
			</MemoryRouter>
		</Provider>
	);

	screen.debug();

	// const loginForm = screen.getByTestId('login-form');
	// expect(loginForm).toBeInTheDocument();
});
