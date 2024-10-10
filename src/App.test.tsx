import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Questions from './questions';

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
});

describe('App', () => {

  test('renders text, buttons, and data display', () => {
    render(<App />);
    expect(screen.getByText(/Questions for Coding/i)).toBeInTheDocument();
    expect(screen.getByText(/Average Score for All Runs:/i)).toBeInTheDocument();
    expect(screen.getByText(/Developed by Nisarg Dongare/i)).toBeInTheDocument();

  });

  test('saves data to localStorage on submit', () => {
    render(<App />);

    const yesButtons = screen.getAllByText('Yes');
    const noButtons = screen.getAllByText('No');
    
    fireEvent.click(yesButtons[0]); 
    fireEvent.click(yesButtons[1]); 
    fireEvent.click(noButtons[2]);  
    fireEvent.click(noButtons[3]);  
    fireEvent.click(noButtons[4]);  
  
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
  
    const expectedScore = (2 / 5) * 100; 
  
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'scores',
      JSON.stringify([expectedScore])
    );
  });

});
