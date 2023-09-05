import axios from 'axios';

const instance = axios.create({
	baseURL: ` http://localhost:4000/sick`,
});

export const getClinicalTrial = async (query: string) => {
	const response = await instance.get(`?q=${query}`);
	return response.data;
};
