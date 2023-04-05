import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

// 여기는 각각의 코인 페이지

const Container = styled.div`
  padding: 0px 20px;
  max-width: 700px;
  margin: 0 auto;
  // 화면을 크게 했을 때에도 모바일 화면처럼 가운데에 위치하게 됨
`;

const Header = styled.header`
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  font-size: 38px;
  display: block;
`;

interface RouteState {
  state: {
    name: string;
  };
}

function Coin() {
  // react-router-dom v6 이상의 경우
  // useParams쓰는 순간 타입이 string or undefined로 설정됨.
  // 따라서 const {coinId} = useParams(); 로만 적어줘도 상관 ㄴ
  const { coinId } = useParams(); // coinId를 받아서 parameter로 사용
  const [loading, setLoading] = useState(true);
  // state 안에 있는 name을 가져오기 위한 작업
  const { state } = useLocation() as RouteState;
  console.log(state.name);
  return (
    <Container>
      <Header>
        <Title>{coinId}</Title>
      </Header>
      {loading ? <Loader>로딩중입니다...</Loader> : null}
    </Container>
  );
}

export default Coin;
