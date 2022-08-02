import { API_URL } from "../../../config";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const { data, status: returnedStatus, headers: returnedHeaders, } = await axios.post(
        `${API_URL}/api/auth/refresh/`,
        undefined,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Cookie": `${req.headers.cookie}`
          },
        }
      );

      if (returnedStatus === 200) {
        Object.keys(returnedHeaders).forEach(key => res.setHeader(key, returnedHeaders[key]));
      }

      res.status(200).send(data);
    } catch ({ response: { status, data } }) {
      res.status(typeof status === "number" ? status : 500).json(data);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ "error": `Method ${req.method} not allowed` });
  }
};