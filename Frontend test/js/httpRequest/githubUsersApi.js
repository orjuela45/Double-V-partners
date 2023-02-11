import { globalVariables } from "../env.js";
import { errorAlert } from "../helpers/sweetAlert.js";

export class GithubUsersService {
  headers = {
    Accept: "application/vnd.github+json",
  };

  constructor(httpClient) {
    this.http = httpClient;
    if (globalVariables["github-token"]) {
      this.headers = {
        ...this.headers,
        Authorization: `Bearer ${globalVariables["github-token"]}`,
      };
    }
  }

  async getUsers(userSearch, limit = 10) {
    try {
      const { data, status } = await this.http.get(
        `https://api.github.com/search/users?q=${userSearch}&per_page=${limit}`,
        this.headers
      );
      return { data, status };
    } catch (error) {
      this.handleErrors(error)
    }
  }

  async getUser(userLogin) {
    try {
      const { data, status } = await this.http.get(
        `https://api.github.com/users/${userLogin}`,
        this.headers
      );
      return { data, status };
    } catch (error) {
      this.handleErrors(error)
    }
  }

  handleErrors(error){
    if (error.response.status === 403){
      errorAlert("Se excedio el limite de github api")
      return {data: [], status: 403}
    }
    errorAlert("Algo salio mal")
    return {data: [], status: error.response.status}
  }
}
