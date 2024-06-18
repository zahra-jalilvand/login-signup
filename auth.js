const URL = 'https://api.escuelajs.co/api/v1/users';

class Authentication {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  verifyData() {
    if (!this.email.endsWith('@gmail.com')) {
      throw new Error('emailError');
    }

    if (this.password.length < 5) {
      throw new Error('passwordError');
    }
  }

  async signup() {
    try {
      const getUsers = await fetch(URL);
      const users = await getUsers.json();

      const doesUserExists = users.find((user) => user.email === this.email);

      if (doesUserExists) {
        return {
          statusCode: 409,
          message: 'This email already exists',
          data: '',
        };
      }

      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });

      const createdUser = await response.json();

      return {
        statusCode: 201,
        message: 'signed up successfully',
        data: createdUser,
      };
    } catch (error) {
      console.log('in catch block');
      console.log(error);
    }
  }

  async signin() {
    const getUsers = await fetch(URL);
    const users = await getUsers.json();

    const doesUserExits = users.find((user) => user.email === this.email);

    if (!doesUserExits) {
      return {
        statusCode: 404,
        message: 'email or password is incorrect',
        data: '',
      };
    }

    if (this.password !== doesUserExits.password) {
      return {
        statusCode: 404,
        message: 'email or password incorrect',
        data: '',
      };
    }

    return {
      statusCode: 200,
      message: 'logged in successfully',
      data: doesUserExits,
    };
  }
}

export { Authentication };
