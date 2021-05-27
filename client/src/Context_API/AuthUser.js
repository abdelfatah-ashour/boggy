import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [AuthUser, setAuthUser] = useState({
		isLogin: null,
		role: null,
		userId: null,
		isUser: null,
		isAdmin: null,
		email: null,
		displayName: null,
	});
	return (
		<AuthContext.Provider value={{ AuthUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
