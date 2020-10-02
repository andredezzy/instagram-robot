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
    profile: {
      selectors: {
        avatar_img: string;
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
    profile: {
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
        photo_img: 'div > div > img',
      },
    },
    profile: {
      selectors: {
        avatar_img: 'main > div > header > div > div > span > img',
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
    profile: {
      url: 'https://www.instagram.com/andredezzy.dev/',
    },
  },
} as IRobotInstagramConfig;
