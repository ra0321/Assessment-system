'use client'
// import node module libraries
import axios from 'axios';

const fetchScore = async (assetmentId, sectionId) => {
  if (!assetmentId) assetmentId = 0;
  if (!sectionId) sectionId = 0;
  const url = process.env.SERVER_URL + '/score/list/section/' + assetmentId + '/' + sectionId;

  return axios.get(url)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });    
};

const saveScore = async (data) => {
  const url = process.env.SERVER_URL + '/score/create';

  return axios.post(url, data)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export {fetchScore, saveScore};
