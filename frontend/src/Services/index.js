import axios from "axios";
import { isObjectEmpty } from "../Utils/helpers";

export const getValueChangeResults = ({ data, input1, input2 }) => {
  let body = {
    json_data: data,
    input1: input1,
    input2: input2,
  };

  if (isObjectEmpty(data)) {
    body = {
      input1: input1,
      input2: input2,
    };
  }

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
