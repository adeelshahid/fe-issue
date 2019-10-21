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

const SERVER_PATH = 'http://localhost:3001'

function apiUrl(path) {
    return `${SERVER_PATH}/${path}`
}

function fetchOptions(method = 'GET', body = {}) {
    if (method === 'GET' || method === 'DELETE') {
        return {
            method,
            mode: 'cors',
        }
    }

    return {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(body),
    }
}

class App extends React.Component {
    state = {
        edit: null,
        list: [],
    }

    async componentDidMount() {
        await this.fetch()
    }

    async fetch() {
        try {
            const list = await fetch(apiUrl('issue'), fetchOptions()).then(
                res => res.json(),
            )
            this.setState({ list })
        } catch (e) {
            console.error('fetch', e)
        }
    }

    clearEdit = () => this.setState({ edit: null })

    onSave = async issue => {
        try {
            if (issue.id > -1) {
                const list = this.state.list.filter(i => i.id !== issue.id)
                list.unshift(issue)

                this.setState({ list: list.slice(0) })
                await fetch(apiUrl('issue'), fetchOptions('PUT', issue))
                this.clearEdit()
            } else {
                await fetch(apiUrl('issue'), fetchOptions('POST', issue))
            }

            await this.fetch()
        } catch (e) {
            console.log('onSave', e)
        }
    }

    onEdit = issue => this.setState({ edit: issue })

    onEditCancel = () => this.clearEdit()

    onDelete = async issue => {
        try {
            // Clear edit state, if issue being edited is deleted
            if (this.state.edit && this.state.edit.id === issue.id) {
                this.clearEdit()
            }

            const { list } = this.state
            this.setState({ list: list.filter(i => i.id !== issue.id) })
            await fetch(apiUrl(`issue/${issue.id}`), fetchOptions('DELETE'))
        } catch (e) {
            console.log('onDelete', e)
        }
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
