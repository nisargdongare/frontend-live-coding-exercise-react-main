import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

describe('App', () => {
  test('renders input, buttons, and data display', () => {
    render(<App />);
    
    expect(screen.getByPlaceholderText(/enter some data/i)).toBeInTheDocument();
    expect(screen.getByText(/Save to LocalStorage/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear LocalStorage/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Data:/i)).toBeInTheDocument();
  });

  test('saves data to localStorage when Save button is clicked', () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/enter some data/i);
    const saveButton = screen.getByText(/Save to LocalStorage/i);
    
    fireEvent.change(inputElement, { target: { value: 'Test Data' } });
    fireEvent.click(saveButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('scores', JSON.stringify([Number('Test Data')]));
  });

  test('clears data from localStorage when Clear button is clicked', () => {
    render(<App />);

    const clearButton = screen.getByText(/Clear LocalStorage/i);
    
    fireEvent.click(clearButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith('scores');
    expect(screen.getByText(/Current Data:/i)).toHaveTextContent('No data');
  });

});
