import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const req = await fetch('/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const res = await req.json();
      console.log(res);

      if (res.error) {
        toast.error(res.error);
      } else if (req.status === 400) {
        toast.error(res);
      } else {
        setName('');
        setEmail('');
        setPassword('');
        toast.success('User creacted succesfull !');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log('register ', name, email, password);
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='enter name..'
      />

      <label>Email</label>
      <input
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder='enter email..'
      />

      <label>Password</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder='enter password..'
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Register;
