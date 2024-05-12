import { setAuthToken, setError } from "./authSlice";
import { URL_API } from "../../constants";

export const doLogin = (dades) => {
    return async (dispatch, getState) => {
        const { email, password } = dades;
        try {
            const data = await fetch(URL_API + "login", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({ email: email, password: password })
            });
            const resposta = await data.json();
            if (resposta.success == true) {
                dispatch(setAuthToken(resposta.authToken));
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (err) {
            dispatch(setError("Network error"));
        }
    }
}