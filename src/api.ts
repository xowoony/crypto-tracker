// fetchCoins 함수는 json data의 promise를 return 한다.
const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// 유료화된 api
// export function fetchCoinHistory(coinId: string) {
//   const endDate = Math.floor(Date.now() / 1000);
//   const startDate = endDate - 60 * 60 * 24 * 7;
//   return fetch(
//     `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
//   ).then((response) => response.json());
// }


// 유효한 api
// chart api 불러오기
export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((respons) => respons.json());
}
