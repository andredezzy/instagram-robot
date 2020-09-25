import 'dotenv/config';

interface IRobotInstagramConfig {
  pages: {
    signin: {
      url: string;
    };
  };

  testing_account: {
    username: string;
    password: string;
  };
}

export default {
  pages: {
    signin: {
      url: process.env.INSTAGRAM_SIGNIN_PAGE_URL,
    },
  },

  testing_account: {
    username: process.env.INSTAGRAM_TESTING_ACCOUNT_USERNAME,
    password: process.env.INSTAGRAM_TESTING_ACCOUNT_PASSWORD,
  },
} as IRobotInstagramConfig;
