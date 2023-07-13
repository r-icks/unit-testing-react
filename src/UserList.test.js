import {render, screen, within} from '@testing-library/react'
import UserList from './UserList'

function renderComponent() {
    const users=[
        {name:'Test1', email: 'test1@mail.com'},
        {name:'Test2', email: 'test2@mail.com'}
    ]
    render(<UserList users={users}/>);
    return {
        users
    };
}

test('render one row per user', ()=>{
    renderComponent()
    //eslint-disable-next-line
    // const rows = container.querySelectorAll('tbody tr')
    const rows = within(screen.getByTestId('users')).getAllByRole('row')

    expect(rows).toHaveLength(2)
})
test('render the email and name of each user',()=>{
    const {users} = renderComponent()

    // screen.logTestingPlaygroundURL()

    for(let user of users){
        const name = screen.getByRole('cell', {name: user.name});
        const email = screen.getByRole('cell', {name: user.email});

        expect(name).toBeInTheDocument()
        expect(email).toBeInTheDocument()
    }
})