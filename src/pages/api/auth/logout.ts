import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { API_URL } from "../../../config";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // To add refresh token in blacklist for backend
    const cookies = parseCookies({ req })
    if (cookies.refresh) {
      const resApi = await axios.post(
        `${API_URL}/api/auth/logout/`,
        undefined,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cookie": `refresh=${cookies.refresh}`
          },
        }
      );

      if (resApi.status === 205) {
        Object.keys(resApi.headers).forEach(key => res.setHeader(key, resApi.headers[key]));
        destroyCookie({res}, "refresh", {path: '/'});
      }
    }

    return res.status(200).json({
      success: 'Successfully logged out'
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ "error": `Method ${req.method} not allowed` });
  }
};