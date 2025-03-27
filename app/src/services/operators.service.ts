import axios from 'axios';

interface OperatorName {
  title: string;
  first: string;
  last: string;
}

interface OperatorAvatar {
  thumbnail: string;
}

interface OperatorLocation {
  city: string;
  state: string;
  country: string;
}

export interface Operator {
  name: OperatorName;
  cell: string;
  location: OperatorLocation;
  picture: OperatorAvatar;
}

const getOperators = async ({
  quantity,
}: {
  quantity: string;
}): Promise<Operator[]> => {
  const response = await axios.get(
    `https://randomuser.me/api/?results=${quantity}`,
  );
  const { data } = response;
  return data.results;
};

export { getOperators };
