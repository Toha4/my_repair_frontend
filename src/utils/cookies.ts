import { GetServerSidePropsContext, NextPageContext } from 'next';
import { setCookie } from 'nookies';
import { ACCESS_TOKEN_LIFETIME_SEC } from "../config";


export function setAccessCookie(access_token: string, ctx?: NextPageContext | GetServerSidePropsContext) {
  setCookie(ctx, 'access', access_token, {
    maxAge: Number(ACCESS_TOKEN_LIFETIME_SEC),
    path: '/',
  });
};

export function destoryAccessCookie() {
  setCookie(undefined, 'access', "", {
    maxAge: 0,
    path: '/',
  });
};
