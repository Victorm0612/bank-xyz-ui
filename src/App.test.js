import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import App from './App';

describe.skip('renders learn react link', () => {
  it('Show "App content"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    const linkElement = screen.getByText(/¡Bienvenido a XYZ Bank!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
