import axios from "axios";
import { RES } from "../Utils/constants";

export const getDefaultResults = (input1, input2) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://www.localhost:5050/api/v1/material?input1=${input1}&input2=${input2}`
      )
      .then((response) => {
        if (response && response.status === 200) {
          const removeDoubleFromTop5 = response.data.replace(/"/g, "");
          const replaceSingleToDoubleQuotes = removeDoubleFromTop5.replace(
            /'/g,
            '"'
          );
          const parsedResponse = JSON.parse(replaceSingleToDoubleQuotes);
          resolve(parsedResponse);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

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

export const getDefaultChemicalValues = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://www.localhost:5050/api/v1/material`)
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
