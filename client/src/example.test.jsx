
import MyNavBar from './components/PageElements/Navbar';
import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/PageElements/Footer';
import Main from './components/PageElements/Main';
import Profile from './pages/profile';
import LoginButton from './components/Auth0/LoginButton';

// test if navbar renders correctly

test('Navbar renders correctly', () => {
  const { getByTestId } = render(
  <Router>
  <MyNavBar />
  </Router>);
  const navbarElement = getByTestId('navbar');
  expect(navbarElement).toBeDefined();
});


// test if footer renders correctly

test('Footer renders correctly', () => {
  const { getByTestId } = render(
  <Router>
  <Footer />
  </Router>);
  const footerElement = getByTestId('footer');
  expect(footerElement).toBeDefined();
});

// test if main renders correctly

test('Main renders correctly', () => {
  const { getByTestId } = render(
  <Router>
  <Main />
  </Router>);
  const mainElement = getByTestId('main');
  expect(mainElement).toBeDefined();
});

// test if Login Button renders correctly

test('Login Button renders correctly', () => {
  const { getByTestId } = render(
  <Router>
  <LoginButton/>
  </Router>);
  const loginButtonElement = getByTestId('loginButton');
  expect(loginButtonElement).toBeDefined();
});
