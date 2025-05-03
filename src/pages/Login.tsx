
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/login-form';
import Logo from '@/components/logo';

const Login = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center rootina-pattern-bg">
      <div className="container max-w-md mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <Logo className="w-64 mb-8" />
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
