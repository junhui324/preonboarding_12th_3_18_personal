interface Label {
	id: number;
	name: string;
}

export interface IssueType {
	id: number;
	number: number;
	url: string;
	title: string;
	user: {
		id: number;
		login: string;
		avatar_url: string;
	};
	labels: Label[];
	state: string;
	comments: number;
	created_at: string;
	updated_at: string;
	body: string;
}
