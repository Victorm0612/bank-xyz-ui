import packageJson from '../package.json';

const { version } = packageJson;

const localEnv = {
  apiUrl: 'http://localhost:8000/',
  version,
  env: 'local'
};

const devEnv = {
  hamUrl: 'https://xyz-bank-api-dev.herokuapp.com/',
  version,
  env: 'dev'
};

const prodEnv = {
  hamUrl: 'https//xyz-bank-api.herokuapp.com/',
  version,
  env: 'prod'
};

const qaEnv = {
  hamUrl: 'https://xyz-bank-api-qa.herokuapp.com/',
  version,
  env: 'qa'
};

export default (() => {
  switch (process.env.REACT_APP_ENV) {
    case 'prod':
      return prodEnv;
    case 'dev':
      return devEnv;
    case 'qa':
      return qaEnv;
    default:
      return localEnv;
  }
})();
