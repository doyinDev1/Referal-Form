const prod = {
	url: {
		API_URL: `https://afternoon-ridge-35420.herokuapp.com/https://testassessify.com/backend/public/api`,
	},
};

// added cors proxy for dev environment
const dev = {
	url: {
		API_URL:
			'https://afternoon-ridge-35420.herokuapp.com/https://testassessify.com/backend/public/api',
	},
};

export const Config = process.env.NODE_ENV === 'development' ? dev : prod;
