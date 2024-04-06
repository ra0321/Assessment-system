'use client'
// import node module libraries
import axios from 'axios';

const fetchSection = async (id) => {
  if (!id) id = 0;
  const url = process.env.SERVER_URL + '/section/list/' + id;

  return axios.get(url)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });    
};

const saveSection = async (data) => {
  const url = process.env.SERVER_URL + '/section/create';

  return axios.post(url, data)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export {fetchSection, saveSection};
