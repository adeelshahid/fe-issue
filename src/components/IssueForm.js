import React from 'react'
import styled from '@emotion/styled'

import { Input } from './Input'
import { Textarea } from './Textarea'
import { Radio } from './Radio'
import { Button } from './Button'

const ISSUE_STATUS = {
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

export class IssueForm extends React.Component {
    state = {
        title: '',
        description: '',
        status: ISSUE_STATUS.OPEN,
    }

    onChangeTitle = (name, title) => this.setState({ title })
    onChangeDescription = (name, description) => this.setState({ description })
    onChangeStatus = (name, status) => this.setState({ status })

    onSave = () => {
        // make ajax call to save
    }

    render() {
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
                        name="status"
                        value={ISSUE_STATUS.OPEN}
                        label={ISSUE_STATUS.OPEN.toLowerCase()}
                        selected={this.state.status}
                        onChange={this.onChangeStatus}
                    />

                    <Radio
                        name="status"
                        value={ISSUE_STATUS.CLOSED}
                        label={ISSUE_STATUS.CLOSED.toLowerCase()}
                        selected={this.state.status}
                        onChange={this.onChangeStatus}
                    />

                    <Radio
                        name="status"
                        value={ISSUE_STATUS.PENDING}
                        label={ISSUE_STATUS.PENDING.toLowerCase()}
                        selected={this.state.status}
                        onChange={this.onChangeStatus}
                    />
                </Row>
                <Row key="row-submit" marginTop={10}>
                    <Label />
                    <Button label="Save" onClick={this.onSave} />
                </Row>
            </Form>
        )
    }
}
