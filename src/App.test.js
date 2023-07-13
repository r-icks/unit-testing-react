import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event'
import App from './App';
import UserForm from './UserForm';

test('can receive a mew user and show it on the list', async ()=>{
    render(<App />);
    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })
    const emailInput = screen.getByRole('textbox',{
        name: /email/i
    })  
    const button = screen.getByRole('button');
    console.log(button)

    user.click(nameInput)
    user.keyboard('testuser');
    user.click(emailInput)
    user.keyboard('testuser@mail.com')

    await user.click(button)

    const name = screen.getByRole('cell',{
        name: 'testuser'
    })

    const email = screen.getByRole('cell', {
        name: 'testuser@mail.com'
    })

    expect(name).toBeInTheDocument()
    expect(email).toBeInTheDocument()
})