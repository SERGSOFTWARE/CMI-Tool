import axios from "axios";

export const getValueChangeResults = ({ data, input1, input2 }) => {
  const body = {
    json_data: data,
    input1: input1,
    input2: input2,
  };
  return new Promise((resolve, reject) => {
    axios
      .post(`http://www.localhost:5050/api/v1/material`, body)
      .then((response) => {
        if (response && response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};