import { getParams } from "./helpers/params.js";
import { errorAlert } from "./helpers/sweetAlert.js";
import { GithubUsersService } from "./httpRequest/githubUsersApi.js";
import { HttpClient } from "./httpRequest/httpClient.js";

// Instances
const httpClient         = new HttpClient();
const usersGithubService = new GithubUsersService(httpClient);

// Elements
const imgUserImage    = document.getElementById("userImage");
const h5LoginUser     = document.getElementById("loginUser");
const spanName        = document.getElementById("name");
const spanBio         = document.getElementById("bio");
const spanRepositorys = document.getElementById("repositorys");
const spanFollowers   = document.getElementById("followers");
const spanFollowing   = document.getElementById("following");
const spanCreatedAt   = document.getElementById("createdAt");
const spanUpdateAt    = document.getElementById("updateAt");

const { login } = getParams();

if (!login) {
  errorAlert("Se excedio el limite de usos de github api \n Regresaras al home")
  window.location.href = "./index.html";
}

try {
  const { data: user, status } = await usersGithubService.getUser(login);
  if (status !== 200) {
    errorAlert("Se excedio el limite de usos de github api")
  } else{
    imgUserImage.src          = user.avatar_url ?? "https://www.newrosspianofestival.com/wp-content/uploads/2018/04/user-icon.png"
    h5LoginUser.innerHTML     = user.login ?? 'No provicionado'
    spanName.innerHTML        = user.name ?? 'No provicionado'
    spanBio.innerHTML         = user.bio ?? 'No provicionado'
    spanRepositorys.innerHTML = user.public_repos ?? 'No provicionado'
    spanFollowers.innerHTML   = user.followers ?? 'No provicionado'
    spanFollowing.innerHTML   = user.following ?? 'No provicionado'
    spanCreatedAt.innerHTML   = new Date(user.created_at).toLocaleDateString() ?? 'No provicionado'
    spanUpdateAt.innerHTML    = new Date(user.updated_at).toLocaleDateString() ?? 'No provicionado'
  }
} catch (error) {
  
}
