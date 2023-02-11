export const emptyField = (string = '') => {
  if(string.trim() === '') return true
}

export const minLength = (string = '', min = 1) => {
  if (string.length >= min) return true;
}

export const fordibenSearch = (search = '') =>{
  const fordiben = ["doublevpartners"];
  if (fordiben.includes(search.toLocaleLowerCase())) return true
}