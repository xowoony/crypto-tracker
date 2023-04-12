import { Link } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { useState } from "react";

const SwitchTheme = styled.button`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 7rem;
  height: 3rem;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  margin: 1rem 3rem 1rem auto;
  color: white;
  background-color: rgb(157 132 25);
  &:hover {
    background-color: rgb(49 39 22);
  }
`;

const Container = styled.div`
  /* padding: 0px 20px; */
  /* max-width: 900px; */
  margin: 0px auto;
  // 화면을 크게 했을 때에도 모바일 화면처럼 가운데에 위치하게 됨
`;

const Header = styled.header`
  height: 15rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #1f1902;
  height: 5rem;
  @media screen and (max-width: 1090px) {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem 2rem;
  padding: 3rem;
  @media screen and (max-width: 1090px) {
    grid-template-columns: 4fr;
    width: 100%;
    padding: 2rem;
  }
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: rgb(255 255 255);
  border-radius: 15px;
  margin-bottom: 10px;
  font-weight: 600;
  a {
    height: 7rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    align-items: center;
    display: flex;
    padding: 20px;
    transition: color 0.2s ease-in;
  }

  // react router link들이 결국 anchor로 바뀐다.
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-left: 5rem;
  color: ${(props) => props.theme.accentColor};
  @media screen and (max-width: 1090px) {
    margin-left: 0rem;
  }
`;

const Loader = styled.div`
  text-align: center;
  font-size: 1rem;
  display: block;
`;

// img 컴포넌트
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const SubTitle = styled.span`
  margin-left: 5rem;
  color: #cdcdcd;
`;

// interface (API로부터 받아오는 정보도 적어주어야 한다.)
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // useQuery를 통해 Coins 를 fetch
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <Title>Thorn Coin</Title>
        </Link>
        <SubTitle>Grab Your Own Coin!</SubTitle>
      </Header>
      <SwitchTheme>테마 변경</SwitchTheme>
      {isLoading ? (
        <Loader>로딩중입니다...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt=""
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
