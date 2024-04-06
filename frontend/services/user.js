'use client'
// import node module libraries
import axios from 'axios';

const fetchUser = async () => {
  const url = process.env.SERVER_URL + '/user/users';

  return axios.get(url)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });    
};

const saveUser = async (data) => {
  const url = process.env.SERVER_URL + '/user/create';

  return axios.post(url, data)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });     
}

const userLogin = async (email, password) => {
  const url = process.env.SERVER_URL + '/user/login';

  return axios.post(url, {email, password})
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}
export {fetchUser, saveUser, userLogin};
