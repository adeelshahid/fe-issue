import React from 'react'
import styled from '@emotion/styled'

import { Input } from './Input'
import { Textarea } from './Textarea'
import { Radio } from './Radio'
import { Button } from './Button'

export const ISSUE_STATUS = {
    OPEN: 'OPEN',
    PENDING: 'PENDING',
    CLOSED: 'CLOSED',
}

const Title = styled.div`
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: ${p => p.marginTop || 0}px;
    margin-bottom: 10px;
`
const Label = styled.label`
    width: 10vw;
    min-width: 10vw;
    margin-top: 10px;
`

function defaultState(props = {}) {
    const issue = props.issue || {}
    return {
        id: issue.id || -1,
        title: issue.title || '',
        description: issue.description || '',
        status: issue.status || ISSUE_STATUS.OPEN,
    }
}

export class IssueForm extends React.Component {
    state = defaultState()

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.issue && this.props.issue.id !== prevState.id) {
            this.setState(defaultState(this.props))
        }
    }

    onChangeTitle = (name, title) => this.setState({ title })
    onChangeDescription = (name, description) => this.setState({ description })
    onChangeStatus = (name, status) => this.setState({ status })

    clearForm = () => this.setState(defaultState())

    onSave = () => {
        this.props.onSave(this.state)
        this.clearForm()
    }

    onCancel = () => {
        this.clearForm()
        this.props.onEditCancel()
    }

    render() {
        let disableOpen, disablePending
        disableOpen = disablePending = false

        const editing = this.state.id > 0
        if (editing) {
            const { status } = this.props.issue
            disableOpen =
                status === ISSUE_STATUS.PENDING ||
                status === ISSUE_STATUS.CLOSED
            disablePending = status === ISSUE_STATUS.CLOSED
        }

        return (
            <Form>
                <Title>Add/Edit Issue</Title>
                <Row key="row-title">
                    <Label>Title</Label>
                    <Input
                        name="title"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                    />
                </Row>
                <Row key="row-desc">
                    <Label>Description</Label>
                    <Textarea
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </Row>
                <Row key="row-status">
                    <Label>Status</Label>

                    <Radio
                        disabled={disableOpen}
                        name="status"
                        value={ISSUE_STATUS.OPEN}
                        label={ISSUE_STATUS.OPEN.toLowerCase()}
                        selected={this.state.status}
                        onChange={this.onChangeStatus}
                    />

                    <Radio
                        disabled={disablePending}
                        name="status"
                        value={ISSUE_STATUS.PENDING}
                        label={ISSUE_STATUS.PENDING.toLowerCase()}
                        selected={this.state.status}
                        onChange={this.onChangeStatus}
                    />

                    <Radio
                        disabled={false}
                        name="status"
                        value={ISSUE_STATUS.CLOSED}
                        label={ISSUE_STATUS.CLOSED.toLowerCase()}
                        selected={this.state.status}
                        onChange={this.onChangeStatus}
                    />
                </Row>
                <Row key="row-submit" marginTop={10}>
                    <Label />
                    <Button
                        label={editing ? 'Update' : 'Create'}
                        onClick={this.onSave}
                    />

                    {editing && (
                        <Button label="Cancel" onClick={this.onCancel} />
                    )}
                </Row>
            </Form>
        )
    }
}
