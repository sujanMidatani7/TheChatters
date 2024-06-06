
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Section from './Section.jsx'
import { useAuth } from '../contexts/authcontext';
import '../styles/Home.css'
import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/authcontext';
// import { useContext } from 'react';
// import AuthForm from './components/AuthForms';

const Home = () => {
    // const { userLoggedIn, isEmailUser, isGoogleUser, currentUser } = useAuth();
    const userLoggedIn=true;
    return (
        userLoggedIn ?
        <div className="home">
            <Header></Header>
            <Section></Section>
            <Footer></Footer>
        </div> :
        <Navigate to={"/"}></Navigate>
    );
}
export default Home;
