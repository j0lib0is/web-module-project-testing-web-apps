import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
	render(<ContactForm />);

	// Identify form header and check if it exists, is truthy and says 'Contact Form'
    const header = screen.queryByText(/contact form/i);
	expect(header).toBeInTheDocument();
	expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render(<ContactForm />);
	
	// Identify firstName input field and type 'Joe'
	const firstName = screen.queryByLabelText(/first name/i)
	userEvent.type(firstName, 'Joe');

	// Identify error message and check if it exists
	const output = screen.queryByText(/Error: firstName must have at least 5 characters./i);
	expect(output).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
	
	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Identify error messages and check if the array of errors is equal to 3
	const output = screen.queryAllByText(/Error/i);
	expect(output.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

	// Identify firstName input field and type 'Joseph'
	const firstName = screen.queryByLabelText(/first name/i);
	userEvent.type(firstName, 'Joseph');
	
	// Identify lastName input field and type 'Dirt'
	const lastName = screen.queryByLabelText(/last name/i);
	userEvent.type(firstName, 'Dirt');
	
	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Identify error message and check if it exists
	const output = screen.queryByText(/Error: email must be a valid email address./i);
	expect(output).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);

    // Identify email input field and type 'joeiscool.com'
	const email = screen.queryByLabelText(/email/i);
	userEvent.type(email, 'joeiscool.com');

	// Identify error message and check if it exists
	const output = screen.queryByText(/email must be a valid email address./i);
	expect(output).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    // Identify firstName input field and type 'Joseph'
	const firstName = screen.queryByLabelText(/first name/i);
	userEvent.type(firstName, 'Joseph');

	// Identify email input field and type 'joe@email.com'
	const email = screen.queryByLabelText(/email/i);
	userEvent.type(email, 'joe@email.com');

	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Identify error message and check if it exists
	const output = screen.queryByText(/lastName is a required field/i);
	expect(output).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
});