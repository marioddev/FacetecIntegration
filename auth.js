import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./Config";

const msalInstance = new PublicClientApplication(msalConfig);

// Función para iniciar sesión
export const login = async () => {
    try {
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        console.log("Usuario autenticado:", loginResponse.account);
    } catch (error) {
        console.error("Error en la autenticación:", error);
    }
};

// Obtener un token de acceso
export const getToken = async () => {
    try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) throw new Error("No hay cuentas disponibles");

        const tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        });
        return tokenResponse.accessToken;
    } catch (error) {
        console.error("Error al obtener el token:", error);
        throw error;
    }
};
