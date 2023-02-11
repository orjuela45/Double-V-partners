export class HttpClient {
  // Using fetch to do http request
  // async get(url) {
  //   const resp = await fetch(url);
  //   const data = await resp.json();

  //   return { data, status: resp.status };
  // }

  // Using Axiox to do http request
  async get(url, headers) {
    const { data, status } = await axios.get(url, {headers});
    return { data, status };
  }
}

