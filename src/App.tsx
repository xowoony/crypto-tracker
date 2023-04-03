import styled from "styled-components";

interface DummyProps {
  text: string;
}

// Container
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
// H1
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

// Dummy
function Dummy({ text }: DummyProps) {
  return <H1>{text}</H1>;
}

function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <Container>
      <Dummy text="dd" />
      <button onClick={onClick}>Click me</button>
    </Container>
  );
}

export default App;
