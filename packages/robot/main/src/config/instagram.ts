import 'dotenv/config';

interface IRobotInstagramConfig {
  username: string;
  password: string;

  pages: {
    signin: {
      url: string;
    };
  };
}

export default {
  pages: {
    signin: {
      url: process.env.INSTAGRAM_SIGNIN_PAGE_URL,
    },
  },
} as IRobotInstagramConfig;
