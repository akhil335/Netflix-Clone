import styled from "styled-components"

export default function NotAvailable({alert}) {
    return <Container className="not-available">{ alert }</Container>
}

const Container = styled.h1`
    color: white;
    margin-top: 1rem;
    font-weight: 200;
    width: 27rem;
    text-align: start;
@media (max-width: 912px) {
    width: 38rem;
}
@media (max-width: 540px) {
    width: 24rem;
    font-size: 1.5rem;
}
`