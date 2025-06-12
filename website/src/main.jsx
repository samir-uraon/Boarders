
import { createRoot } from 'react-dom/client'
import './index.css'
import  {GoogleOAuthProvider} from '@react-oauth/google';
import { Authprovider } from './components/Auth.jsx'
import { AdminProvider } from './AdminComponents/AdminAuth.jsx';
import App from './App.jsx'




createRoot(document.getElementById('root')).render(
    
<Authprovider>
	<GoogleOAuthProvider clientId={import.meta.env.VITE_clientId}>
        <AdminProvider>
    <App />
    </AdminProvider>
    </GoogleOAuthProvider>
</Authprovider>


)
