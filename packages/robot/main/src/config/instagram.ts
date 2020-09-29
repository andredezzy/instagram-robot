import 'dotenv/config';

interface IRobotInstagramConfig {
  pages: {
    signin: {
      url: string;
    };
    post: {
      selectors: {
        photo_img: string;
      };
    };
  };

  testing: {
    account: {
      username: string;
      password: string;
    };
    post: {
      url: string;
    };
  };
}

export default {
  pages: {
    signin: {
      url: process.env.INSTAGRAM_SIGNIN_PAGE_URL,
    },
    post: {
      selectors: {
        photo_img:
          'main > div > div > article > div > div > div > div > div > img',
      },
    },
  },

  testing: {
    account: {
      username: process.env.INSTAGRAM_TESTING_ACCOUNT_USERNAME,
      password: process.env.INSTAGRAM_TESTING_ACCOUNT_PASSWORD,
    },
    post: {
      url: 'https://www.instagram.com/p/CFZpqVkFIJX/',
    },
  },
} as IRobotInstagramConfig;
