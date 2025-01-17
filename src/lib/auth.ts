import "server-only";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const isAuth = async () => {
  const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
  const token = cookieStore.get("session")?.value; // Leggi il valore del cookie 'session'

  if (!token) {
    return null; // Se il token non esiste, l'utente non è autenticato
  }

  try {
    // Usa jwt.verify per decodificare e verificare il token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET as string);

    // Se il token è valido, ritorna true (l'utente è autenticato)
    return decoded;
  } catch (err) {
    // Se il token non è valido o è scaduto, ritorna false
    console.log("Token non valid");
    return null;
  }
};
export const getAccessToken = async () => {
  const cookieStore = await cookies(); // Ottieni i cookies dalla richiesta
  const token = cookieStore.get("session")?.value;

  return token;
};
