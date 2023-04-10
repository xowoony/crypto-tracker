// fetchCoins 함수는 json data의 promise를 return 한다.
export async function fetchCoins() {
  return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json()
  );
}
