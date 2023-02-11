export const buildTableUsers = (data = []) => {
  const rowTags = data.map(
    (user) => `
    <tr id="${user.login}">
      <td>${user.id}</td>
      <td>${user.login}</td>
    </tr>  
  `
  );

  const htmlTable = `
  <table class="table table-hover" id='tableUsers'>
    ${data.length == 0 ? "<caption>No hay usuarios</caption>" : ""}
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Login</th>
      </tr>
    </thead>
    <tbody> 
      ${rowTags.join("")}
    </tbody>
  </table>  
  `;

  return htmlTable;
};

export const redirectUserInfo = (tableId) => {
  let table = document.getElementById(tableId);
  let rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    let currentRow = table.rows[i];
    currentRow.addEventListener("click", () => {
      window.open (`./user.html?login=${currentRow.id}`, 'blank');
    });
  }
};
