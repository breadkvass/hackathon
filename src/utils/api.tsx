const URL = 'http://localhost:8000/api';

const checkResponse = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err: Error) => {
      return Promise.reject(err);
    });
  };

const headersWithContentType = { "Content-Type": "application/json" };

const headersWithAuthorizeFn = () => ({
  "Content-Type": "application/json",
  authorization: `Bearer ${sessionStorage.getItem("auth_token")}`,
});

export const loginUser = (email: string, password: string) => {
  return fetch(`${URL}/login/`, {
    method: "POST",
    headers: headersWithContentType,
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.access) {
        sessionStorage.setItem("auth_token", data.access);
        return data;
      } else {
        return;
      }
    });
};

export const getTeams = () => {
  return fetch(`${URL}/v1/teams/`, {
    headers: headersWithAuthorizeFn(),
    method: "GET", 
  })
  .then(checkResponse);
};

export const getTeam = (id: string) => {
  return fetch(`${URL}/v1/teams/${id}`, {
    method: "GET",
  })
  .then(checkResponse);
}

export const getEmployees = () => {
  return fetch(`${URL}/v1/employees/`, {
    method: "GET",
  })
  .then(checkResponse);
}

export const getEmployee = (id: string) => {
  return fetch(`${URL}/v1/employees/${id}`, {
    method: "GET",
  })
  .then(checkResponse);
}

