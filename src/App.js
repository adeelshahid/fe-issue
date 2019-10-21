import React from 'react'
import styled from '@emotion/styled'
import { IssueForm } from './components/IssueForm'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    width: 50vw;
    margin: 5vh auto 0 auto;
`

function App() {
    return (
        <Layout>
            <IssueForm />
            {/*<Issues />*/}
        </Layout>
    )
}

export default App
