import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PriceContainer = styled.div`
  align-items: center;
  display: grid;
  flex-direction: row;
  justify-content: center;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgb(195 178 93 / 17%);
  margin-bottom: 10rem;
  color: ${(props) => props.theme.textColor};
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 1rem;
  padding: 2rem;
`;

const PriceDetail = styled.div`
font-size: 0.8rem;
  padding: 0.5rem;
  div{
    margin-bottom: 0.2rem;
    font-size: 1rem;
    color:#c0ba87;
  }
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams();
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);

  return (
    <PriceContainer>
      <PriceDetail>
        <div>ath_date</div>
        {priceInfo?.quotes.USD.ath_date}
      </PriceDetail>

      <PriceDetail>
        <div>ath_price</div>
        {priceInfo?.quotes.USD.ath_price}
      </PriceDetail>

      <PriceDetail>
        <div>market_cap</div>
        {priceInfo?.quotes.USD.market_cap}
      </PriceDetail>

      <PriceDetail>
        <div>market_cap_change_24h</div>
        {priceInfo?.quotes.USD.market_cap_change_24h}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_12h</div>
        {priceInfo?.quotes.USD.percent_change_12h}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_15m</div>
        {priceInfo?.quotes.USD.percent_change_15m}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_1h</div>
        {priceInfo?.quotes.USD.percent_change_1h}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_1y</div>
        {priceInfo?.quotes.USD.percent_change_1y}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_24h</div>
        {priceInfo?.quotes.USD.percent_change_24h}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_30d</div>
        {priceInfo?.quotes.USD.percent_change_30d}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_30m</div>
        {priceInfo?.quotes.USD.percent_change_30m}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_6h</div>
        {priceInfo?.quotes.USD.percent_change_6h}
      </PriceDetail>
      <PriceDetail>
        <div>percent_change_7d</div>
        {priceInfo?.quotes.USD.percent_change_7d}
      </PriceDetail>
      <PriceDetail>
        <div>percent_from_price_ath</div>
        {priceInfo?.quotes.USD.percent_from_price_ath}
      </PriceDetail>
      <PriceDetail>
        <div>price</div>
        {priceInfo?.quotes.USD.price}
      </PriceDetail>
      <PriceDetail>
        <div>volume_24h</div>
        {priceInfo?.quotes.USD.volume_24h}
      </PriceDetail>
      <PriceDetail>
        <div>volume_24h_change_24h</div>
        {priceInfo?.quotes.USD.volume_24h_change_24h}
      </PriceDetail>
    </PriceContainer>
  );
}

export default Price;
