import axios from 'axios';
import { URL_INFO } from '../utils/constants/constants';

const instance = axios.create({
	baseURL: `https://api.github.com/repos/${URL_INFO.OWNER}/${URL_INFO.REPO}`,
});

export const getIssueDetail = async (issue_number: number) => {
	const response = await instance.get(`/issues/${issue_number}`);
	return response;
};

export const getIssueList = async (page: number) => {
	const response = await instance.get(`/issues?per_page=15&sort=comments&page=${page}`);
	return response.data;
};
