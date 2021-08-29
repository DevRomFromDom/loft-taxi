import React from "react";
import { useState } from "react";
import PropTypes from "prop-types"

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    AuthProvider.propTypes = {
        children: PropTypes.elementType
    }

    const logIn = (email, password) => {
        if (email !== "valid@email.com" && password !== "correctpassword") {
            return;
        }
        setIsLoggedIn(true);
    };
    const logOut = () => {
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ logIn, logOut, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const withAuth = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <AuthContext.Consumer>
                    {(value) => {
                        return <WrappedComponent {...this.props} {...value} />;
                    }}
                </AuthContext.Consumer>
            );
        }
    };
};
