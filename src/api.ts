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
  // endData : 현재
  // Math.floor(1.9) : 1   Math.ceil(1.9) : 2
  // Date.now()를 통해 milliseconds를 받고 1000으로 나눠서 secodns로 바꾸기 한걸 내림처리
  const endDate = Math.floor(Date.now() / 1000);
  // startData : 현재로부터 일주일 전
  // 일주일을 초로 나타내기
  // 현재 시간에서 1주 -1 시간에 해당하는 초를 뺌
  const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((respons) => respons.json());
}
