import React from 'react'
import styled from '@emotion/styled'
import { IssueForm } from './components/IssueForm'
import { Issues } from './components/Issues'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    margin: 5vh auto 0 auto;
`

class App extends React.Component {
    state = {
        edit: null,

        list: [
            {
                id: 1,
                title: 'Some issue',
                description: 'Some issue description',
                status: 'OPEN',
            },
            {
                id: 2,
                title: 'Another issue',
                description: 'Some issue description',
                status: 'PENDING',
            },
            {
                id: 3,
                title: 'Yet another issue',
                description: 'Some issue description',
                status: 'CLOSED',
            },
        ],
    }

    async componentDidMount() {
        await this.fetch()
    }

    async fetch() {
        try {
            // TODO fetch list of issues from server
        } catch (e) {
            console.error('fetch', e)
        }
    }

    clearEdit = () => this.setState({ edit: null })

    onSave = issue => {
        this.clearEdit()

        if (issue.id > -1) {
            const list = this.state.list.filter(i => i.id !== issue.id)
            list.unshift(issue)

            this.setState({ list: list.slice(0) })
            // TODO UPDATE
        } else {
            // TODO CREATE
            // TODO fetch updated list of issues from the server
        }
    }

    onEdit = issue => this.setState({ edit: issue })

    onEditCancel = () => this.clearEdit()

    onDelete = issue => {
        // clear form, if issue being edited get's deleted
        if (this.state.edit && this.state.edit.id === issue.id) {
            this.clearEdit()
        }

        const { list } = this.state
        this.setState({ list: list.filter(i => i.id !== issue.id) })
        // TODO DELETE
    }

    render() {
        return (
            <Layout>
                <IssueForm
                    issue={this.state.edit}
                    onSave={this.onSave}
                    onEditCancel={this.onEditCancel}
                />
                <Issues
                    list={this.state.list}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete}
                />
            </Layout>
        )
    }
}

export default App
