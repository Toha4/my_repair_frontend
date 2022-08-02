import { API_URL } from "../../../config";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { emailOrUsername, password } = req.body;

    const body = JSON.stringify({
      username: emailOrUsername,
      password
    });

    try {
      const resApi = await axios.post(
        `${API_URL}/api/auth/login/`,
        body,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        }
      );

      if (resApi.status === 200) {
        Object.keys(resApi.headers).forEach(key => res.setHeader(key, resApi.headers[key]));
      }

      res.send(resApi.data);

    } catch ({ response: { status, data } }) {
      res.status(typeof status === "number" ? status : 500).json(data);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      error: `Method ${req.method} not allowed`
    });
  }
}
