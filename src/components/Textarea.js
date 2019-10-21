import React from 'react'
import styled from '@emotion/styled'

const TextareaElm = styled.textarea`
    padding: 10px 10px;
    border: 1px solid #000;
    width: 100%;
    font-size: 20px;

    :focus {
        outline: none;
    }
`

export class Textarea extends React.Component {
    onChange = e => this.props.onChange(this.props.name, e.target.value)

    render() {
        return (
            <TextareaElm
                type="text"
                rows={3}
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
            />
        )
    }
}
