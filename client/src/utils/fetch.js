const SERVER_PORT = '3001'
const SERVER_URI = 'http://localhost:'

export const post = async (route, auth, body) => {
  return fetch(`${SERVER_URI}${SERVER_PORT}${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + auth,
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
  .then(res => res.json())
}

export const get = async (route, auth) => {
  return fetch(`${SERVER_URI}${SERVER_PORT}${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + auth
    },
    credentials: 'include',
  })
  .then(res => res.json())
}
