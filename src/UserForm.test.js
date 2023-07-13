import {render, screen} from '@testing-library/react'
import user from "@testing-library/user-event"
import UserForm from './UserForm'

test('it shows two inputs and one button',()=>{
    render(<UserForm/>);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');


    expect(inputs).toHaveLength(2)
    expect(button).toBeInTheDocument()
});


test('it calls onUserAdd when the form is submitted',async ()=>{

    const mock = jest.fn();

    render(<UserForm  onUserAdd={mock}/>)

    const nameInput = screen.getByRole('textbox', {
        name: /name/i
    })
    const emailInput = screen.getByRole('textbox', {
        name: /email/i
    })
    user.click(nameInput)
    user.keyboard('buddy');

    user.click(emailInput)
    user.keyboard('buddy@mail.com')

    const button = screen.getByRole('button');
    user.click(button)

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith({name:'buddy', email:'buddy@mail.com'})
})

test('empties the inputs when the form is submitted',async ()=>{
    render(<UserForm onUserAdd={()=>{}} />)

    const nameInput = screen.getByRole('textbox', {name: /name/i})
    const emailInput = screen.getByRole('textbox', {name: /email/i})

    const button = screen.getByRole('button')

    user.click(nameInput)
    user.keyboard('test')
    user.click(emailInput)
    user.keyboard('test@test.com')

    await user.click(button)

    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
})