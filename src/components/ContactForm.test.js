import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

const fnInput = 'Joseph';
const lnInput = 'Dirt';
const eInput = 'joe@email.com';
const mInput = 'Hello world!';
const errorInput = 'x';

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
	
	// Identify firstName input field and type an invalid first name
	const firstName = screen.queryByLabelText(/first name/i)
	userEvent.type(firstName, errorInput);

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
	userEvent.type(firstName, fnInput);
	
	// Identify lastName input field and type 'Dirt'
	const lastName = screen.queryByLabelText(/last name/i);
	userEvent.type(firstName, lnInput);
	
	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Identify error message and check if it exists
	const output = screen.queryByText(/Error: email must be a valid email address./i);
	expect(output).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);

    // Identify email input field and type an invalid email address
	const email = screen.queryByLabelText(/email/i);
	userEvent.type(email, errorInput);

	// Identify error message and check if it exists
	const output = screen.queryByText(/email must be a valid email address./i);
	expect(output).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    // Identify firstName input field and type 'Joseph'
	const firstName = screen.queryByLabelText(/first name/i);
	userEvent.type(firstName, fnInput);

	// Identify email input field and type 'joe@email.com'
	const email = screen.queryByLabelText(/email/i);
	userEvent.type(email, lnInput);

	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Identify error message and check if it exists
	const output = screen.queryByText(/lastName is a required field/i);
	expect(output).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
	render(<ContactForm />);

    // Identify firstName input field and type 'Joseph'
	const firstName = screen.queryByLabelText(/first name/i);
	userEvent.type(firstName, fnInput);

	// Identify lastName input field and type 'Dirt'
	const lastName = screen.queryByLabelText(/last name/i);
	userEvent.type(firstName, lnInput);

	// Identify email input field and type 'joe@email.com'
	const email = screen.queryByLabelText(/email/i);
	userEvent.type(email, eInput);

	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Wait for form submission to finish, identify first name and check if it exists
	waitFor(async ()=> {
        // const outputFirstName = screen.queryByText('Joseph');
        const outputFirstName = screen.queryByTestId('firstnameDisplay');
        expect(outputFirstName).toBeInTheDocument();
    });

	// Wait for form submission to finish, identify last name and check if it exists
	waitFor(async ()=> {
        const outputLastName = screen.queryByTestId('lastnameDisplay');
        expect(outputLastName).toBeInTheDocument();
    });

	// Wait for form submission to finish, identify email and check if it exists
	waitFor(async ()=> {
        const outputEmail = screen.queryByTestId('emailDisplay');
        expect(outputEmail).toBeInTheDocument();
    });

	// Wait for form submission to finish, identify message and check if it DOES NOT exist
	waitFor(async ()=> {
        const outputMessage = screen.queryByTestId('messageDisplay');
        expect(outputMessage).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
	render(<ContactForm />);

    // Identify firstName input field and type 'Joseph'
	const firstName = screen.queryByLabelText(/first name/i);
	userEvent.type(firstName, fnInput);

	// Identify lastName input field and type 'Dirt'
	const lastName = screen.queryByLabelText(/last name/i);
	userEvent.type(firstName, lnInput);

	// Identify email input field and type 'joe@email.com'
	const email = screen.queryByLabelText(/email/i);
	userEvent.type(email, eInput);
	
	// Identify message input field and type 'Hello world!'
	const message = screen.queryByLabelText(/message/i);
	userEvent.type(message, mInput);

	// Identify submit button and click it
	const button = screen.getByRole('button');
	userEvent.click(button);

	// Wait for form submission to finish, identify first name and check if it exists
	waitFor(async ()=> {
        // const outputFirstName = screen.queryByText('Joseph');
        const outputFirstName = screen.queryByTestId('firstnameDisplay');
        expect(outputFirstName).toBeInTheDocument();
    });

	// Wait for form submission to finish, identify last name and check if it exists
	waitFor(async ()=> {
        const outputLastName = screen.queryByTestId('lastnameDisplay');
        expect(outputLastName).toBeInTheDocument();
    });

	// Wait for form submission to finish, identify email and check if it exists
	waitFor(async ()=> {
        const outputEmail = screen.queryByTestId('emailDisplay');
        expect(outputEmail).toBeInTheDocument();
    });

	// Wait for form submission to finish, identify message and check if it exists
	waitFor(async ()=> {
        const outputMessage = screen.queryByTestId('messageDisplay');
        expect(outputMessage).toBeInTheDocument();
    });
});