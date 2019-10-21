import React from 'react'
import styled from '@emotion/styled'

const InputElm = styled.input`
    padding: 5px 10px;
    border: 1px solid #000;
    width: 100%;
    font-size: 20px;

    :focus {
        outline: none;
    }
`

export class Input extends React.Component {
    onChange = e => this.props.onChange(this.props.name, e.target.value)

    render() {
        return (
            <InputElm
                type="text"
                name={this.props.name}
                value={this.props.value}
                onChange={this.onChange}
            />
        )
    }
}
