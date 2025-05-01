
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/login-form';
import Logo from '@/components/logo';

const Login = () => {
  return (
    <div className="w-full h-screen rootina-pattern-bg">
      <div className="container py-16 flex flex-col items-center">
        <div className="mb-8">
          <Logo className="w-48" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
