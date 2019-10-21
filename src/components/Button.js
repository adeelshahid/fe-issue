import React from 'react'
import styled from '@emotion/styled'

const ButtonElm = styled.button`
    cursor: pointer;
    padding: 8px 20px;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #000;

    :focus {
        outline: none;
    }
`

export function Button({ label, onClick }) {
    return <ButtonElm onClick={onClick}>{label}</ButtonElm>
}
