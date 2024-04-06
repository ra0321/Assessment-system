'use client'
// import node module libraries
import axios from 'axios';

const fetchAssessment = async () => {
    const url = process.env.SERVER_URL + '/assessment/all';

    return axios.get(url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });    
};

const saveAssessment = async (data) => {
    const url = process.env.SERVER_URL + '/assessment/create';

    return axios.post(url, data)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });     
}

export {fetchAssessment, saveAssessment};
