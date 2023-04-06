import { useEffect, useState } from "react";
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

  // useEffect - 컴포넌트가 생성될 때 한번만 실행됨
  useEffect(() => {
    // 캡슐화로 코드 한줄로 정리 - 이 한줄의 solution이 두개의 변수를 받는다.
    (async () => {
      // 2. 그 response로부터 json을 받는다.
      const infoData = await // 1. 여기에서 response를 받고
      (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();

      // 가격정보 데이터 받아오기
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);
    })();
  }, []);

  return (
    <Container>
      <Header>
        {/* /coinID 로 바로 접속하면 시크릿모드에서 에러가 나는데 */}
        {/* 그것은 home을 거쳐서 오지 않았기 때문에 state가 생성되지 않기 때문이다 */}
        {/* ?를 붙여서 state가 존재하면 name을 가져오고, 아니라면 로딩중이라는 문구가 표시되게 함*/}
        <Title>{state?.name || "로딩 중입니다..."}</Title>
      </Header>
      {loading ? <Loader>로딩중입니다...</Loader> : null}
    </Container>
  );
}

export default Coin;
