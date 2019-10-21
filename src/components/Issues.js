import React from 'react'
import styled from '@emotion/styled'

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;

    :last-of-type {
        border-bottom: 0;
    }
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Title = styled.div`
    margin-bottom: 3px;
    font-size: 20px;
`
const Description = styled.div`
    margin: 10px 0;
    font-size: 15px;
`
const Status = styled.div`
    font-weight: bold;
    font-size: 14px;
`
const Actions = styled.div`
    display: flex;
    margin-top: 5px;

    > div {
        margin: 0 10px;

        :last-of-type {
            margin-right: 0;
        }
    }
`
const Action = styled.div`
    cursor: pointer;
    color: #00f;

    :hover {
        text-decoration: underline;
    }
`

function Item({ issue, onEdit, onDelete }) {
    const { title, description, status } = issue
    return (
        <ItemContainer>
            <Header>
                <Title>{title}</Title>
                <Actions>
                    <Action onClick={() => onEdit(issue)}>Edit</Action>-
                    <Action onClick={() => onDelete(issue)}>Delete</Action>
                </Actions>
            </Header>
            <Status>{status}</Status>
            <Description>{description}</Description>
        </ItemContainer>
    )
}

const List = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
`
const ListStatus = styled.div`
    margin-bottom: 30px;
    text-align: center;
    font-size: 24px;
`

export function Issues({ list, onEdit, onDelete }) {
    return (
        <List>
            <ListStatus>
                You currently have {list.length}{' '}
                {list.length === 1 ? 'issue' : 'issues'}
            </ListStatus>

            {list.map(i => (
                <Item
                    key={`issue-${i.id}`}
                    issue={i}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </List>
    )
}
