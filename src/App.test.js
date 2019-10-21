import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import App from './App'
import { IssueForm } from './components/IssueForm'
import { Issues } from './components/Issues'

it('render App without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('count the number of buttons in IssueForm on create, update', () => {
    const empty = renderer.create(<IssueForm />)
    expect(empty.root.findByType('button').props.children).toBe('Create')

    const issue = {
        id: 1,
        title: 'Some issue',
        description: 'Some issue description',
        status: 'OPEN',
    }
    const open = renderer.create(<IssueForm issue={issue} />)
    const openBtns = open.root.findAllByType('button')

    expect(openBtns[0].props.children).toBe('Update')
    expect(openBtns[1].props.children).toBe('Cancel')
})

it('count the number of issues', () => {
    const empty = renderer.create(<Issues list={[]} />)
    expect(empty.root.findAllByType('div')[1].props.children.join('')).toBe(
        'You currently have 0 issues',
    )

    const list = [
        {
            id: 1,
            title: 'Some issue',
            description: 'Some issue description',
            status: 'OPEN',
        },
    ]
    const one = renderer.create(<Issues list={list} />)
    expect(one.root.findAllByType('div')[1].props.children.join('')).toBe(
        'You currently have 1 issue',
    )
})
