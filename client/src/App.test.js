import App from './App';
import { render, screen } from '@testing-library/react';
import store from './store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

test('home link routes to home', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);

	screen.debug();
	const linkElement = screen.getByTestId('header title');
	expect(linkElement.href).toBe('/products');
});

test('renders burgz n shkes tile', () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<App />
			</MemoryRouter>
		</Provider>
	);
	const linkElement = screen.getByText(/burgz n' shakes/i);
	expect(linkElement).toBeInTheDocument();
});
