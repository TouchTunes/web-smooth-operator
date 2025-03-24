import axios from 'axios';

const getOperators = async (): Promise<any> => {
  const response = await axios.get('https://randomuser.me/api/?results=10');
  const { data } = response;
  return data.results;
};

export { getOperators };
