import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  console.log(navigate);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const req = await fetch('api/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await req.json();
      console.log('login ', req, res);

      if (res.error) {
        toast.error(res.error);
      } else if (req.status === 400) {
        toast.error(res);
      } else {
        setEmail('');
        setPassword('');
        toast.success('Login succesfull !');
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log('login ', email, password);
  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='enter email..'
      />

      <label>Password</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='enter password..'
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default Login;
