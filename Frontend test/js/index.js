import { chartBar } from "./helpers/charts.js";
import { errorAlert } from "./helpers/sweetAlert.js";
import { buildTableUsers, redirectUserInfo } from "./helpers/tables.js";
import { emptyField, fordibenSearch, minLength } from "./helpers/validations.js";
import { GithubUsersService } from "./httpRequest/githubUsersApi.js";
import { HttpClient } from "./httpRequest/httpClient.js";

// Instances
const httpClient         = new HttpClient();
const usersGithubService = new GithubUsersService(httpClient);

// Elements
const btnConsult          = document.getElementById("btnConsult");
const inputUsername       = document.getElementById("inputUsername");
const chartUserFollowers  = document.getElementById("chartUserFollowers");
const tableUsersSection   = document.getElementById("tableUsersSection");

btnConsult.addEventListener("click", async() => {
  const username     = inputUsername.value;
  const isEmptyField = emptyField(username);
  const hasMinLength = minLength(username, 4);
  const hasFordibenSearch = fordibenSearch(username);

  if (isEmptyField){
    
    errorAlert("El nombre de usuario es obligatorio")
    return;
  }
  if (!hasMinLength){
    errorAlert("El nombre de usuario debe tener almenos 4 letras")
    return;
  }

  if (hasFordibenSearch){
    errorAlert(`No se puede realizar la busqueda por ${username}`)
    return;
  }

  try {
    const {data, status} = await usersGithubService.getUsers(username);
  
    if (status === 403){
      errorAlert('Se excedio el limite de intentos en github api')
      return;
    }
    const {items: users, total_count} = data
    tableUsersSection.innerHTML = buildTableUsers(users);
    const existsChart = Chart.getChart(chartUserFollowers.id)
    if (existsChart != undefined) {
      existsChart.destroy();
    }
  
    if (total_count === 0){
      errorAlert(`No hay usuarios con el nombre ${username}`)
      return;
    }
  
    redirectUserInfo("tableUsers");
    const chartData = [];
    const usersInfo = await Promise.all(users.map(user => usersGithubService.getUser(user.login)))
    usersInfo.forEach(({data}) => {
      chartData[data.login] = data.followers
    });
    chartBar(chartUserFollowers, chartData, "Seguidores por usuario")
  } catch (error) {
    
  }
})

tableUsersSection.innerHTML = buildTableUsers();