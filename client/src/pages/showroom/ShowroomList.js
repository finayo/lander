export async function getList() {
  const response = await fetch('http://localhost:1337/api/displayShowroom',{
    headers:{
        'x-access-token' : localStorage.getItem('token')
    } 
  })
  return await response.json()
}