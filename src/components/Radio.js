import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 10px 30px 0 0;
`
const RadioElm = styled.input`
    margin-right: 10px;

    :focus {
        outline: none;
    }
`
const Label = styled.label`
    cursor: pointer;
    user-select: none;
    font-size: 18px;
    text-transform: capitalize;
`

export class Radio extends React.Component {
    onChange = () => {
        console.log('this.props.value', this.props.value)
        this.props.onChange(this.props.name, this.props.value)
    }

    render() {
        console.log(this.props.name, this.props.value)
        return (
            <Container>
                <Label>
                    <RadioElm
                        type="radio"
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.onChange}
                        checked={this.props.value === this.props.selected}
                    />
                    {this.props.label}
                </Label>
            </Container>
        )
    }
}
