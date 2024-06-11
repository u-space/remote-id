import "dotenv/config";

// Way to access the environment variables
// if not allenvs variables are defined in .env file
// then show error message

class Configuration {
  private constructor() {
    // vefiry mandatory envs are defined
    const ENVS = [
      "PORT",
      "CIELUM_BACKEND",
      "DATABASE_HOST",
      "DATABASE_PORT",
      "DATABASE_USERNAME",
      "DATABASE_PASSWORD",
      "DATABASE_DATABASE",
    ];
    for (let i = 0; i < ENVS.length; i++) {
      const env = ENVS[i];
      if (!process.env[env]) {
        throw new Error(`Environment variable ${env} is not defined`);
      }
    }
  }

  static getInstance() {
    return new Configuration();
  }

  // We can safely cast as string because constructor will check the enviroments

  get PORT() {
    return process.env.PORT as string;
  }

  get CIELUM_BACKEND() {
    return process.env.CIELUM_BACKEND as string;
  }

  get DATABASE_HOST() {
    return process.env.DATABASE_HOST as string;
  }

  get DATABASE_PORT() {
    return Number(process.env.DATABASE_PORT) as number;
  }

  get DATABASE_USERNAME() {
    return process.env.DATABASE_USERNAME as string;
  }

  get DATABASE_PASSWORD() {
    return process.env.DATABASE_PASSWORD as string;
  }

  get DATABASE_DATABASE() {
    return process.env.DATABASE_DATABASE as string;
  }

  get MOCK_JWT_VERIFICATION() {
    return process.env.MOCK_JWT_VERIFICATION === "true";
  }

  get JWT_USERNAME() {
    return process.env.JWT_USERNAME as string;
  }

  get JWT_SECRET() {
    return process.env.JWT_SECRET as string;
  }

  get SSL_KEY() {
    return process.env.SSL_KEY as string;
  }
  get SSL_CERT() {
    return process.env.SSL_CERT as string;
  }
}

export default Configuration.getInstance();
