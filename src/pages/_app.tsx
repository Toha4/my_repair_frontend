import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { destroyCookie, parseCookies, } from 'nookies';
import * as cookie from "cookie";
import { wrapper } from "../redux/store";
import { Api } from "../utils/api";
import { setUser } from "../redux/slices/authSlice";
import axios from "axios";
import { setAccessCookie } from "../utils/cookies";
import ConfirmationModalContextProvider from "../contexts/ModalDialogContext";


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <ConfirmationModalContextProvider>
        <Component {...pageProps} />
      </ConfirmationModalContextProvider>
    </ChakraProvider>
  );
};


App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  /**
   * If req is present this function is running on the server
   * The server at this point will _always_ be missing the accessToken because it is stored in the clients memory
   * for that reason we need to correctly set the axios instances cookie header and fetch refreshToken
   */
  const { req, res } = ctx;
  const { refresh } = parseCookies(ctx);
  if (req && refresh) {
    try {
      const resp = await axios.get('http://127.0.0.1:3000/api/auth/refresh', { headers: { cookie: req.headers.cookie || "" } });

      if (res) {
        res.setHeader('set-cookie', `${resp.headers['set-cookie']}`);
      }

      const { access } = resp.data;
      setAccessCookie(access, ctx);
      req.headers.cookie = cookie.serialize('access', access);

      const user = await Api(ctx).user.getMe();
      store.dispatch(setUser(user));
    }
    catch (e) {
      destroyCookie(ctx, "refresh", {path: '/'});
      console.error(e);
    }
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default wrapper.withRedux(App);
