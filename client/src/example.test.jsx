
import MyNavBar from './components/PageElements/Navbar';
import {expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/PageElements/Footer';


test('Navbar renders correctly', () => {
  const { getByTestId } = render(
  <Router>
  <MyNavBar />
  </Router>);
  const navbarElement = getByTestId('navbar');
  expect(navbarElement).toBeDefined();
});

test('Footer renders correctly', () => {
  const { getByTestId } = render(
  <Router>
  <Footer />
  </Router>);
  const footerElement = getByTestId('footer');
  expect(footerElement).toBeDefined();
});

