import { useRouter } from 'next/router';
import { NextComponentType } from 'next';
import Login from "../../../pages/login";


type Props = Record<string, unknown>;

function withAuth<T extends Props>(Component: NextComponentType<T>) {

    const Auth = (props: T) => {
        const router = useRouter();

        // Login data added to props via redux-store (or use react context for example)
        const  isLoggedIn  = false

        if ( !isLoggedIn) {
           if (typeof window !== 'undefined') {
               router.push('/login');
           }
            return <Login/>
        }

        return <Component {...props} />;
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
}

export default withAuth;
