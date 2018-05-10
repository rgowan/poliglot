import LoginForm from '../../../../src/components/authentication/LoginForm';

const props = {
  user: {
    email: '',
    password: ''
  }
}

describe('Login Form', done => {
  const wrapper = shallow(<LoginForm {...props} />);

  console.log(wrapper);


  done();
})