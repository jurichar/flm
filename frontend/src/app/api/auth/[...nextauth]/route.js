// src/app/api/auth/[...nextauth]/route.js

import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { refreshAccessToken } from '../../../../utils/apiClient';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'Login', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          console.log('credentials', credentials);
          console.log(
            'process.env.NEXT_PUBLIC_API_BASE_URL',
            process.env.NEXT_PUBLIC_API_BASE_URL,
          );
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                login: credentials.login,
                password: credentials.password,
              }),
            },
          );

          const data = await res.json();

          if (res.ok && data) {
            const decoded = jwtDecode(data.access);
            console.log('decoded:', decoded);
            return {
              accessToken: data.access,
              refreshToken: data.refresh,
              user: {
                login: credentials.login,
                uid: decoded.user_uid,
              },
            };
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user.user;
        token.accessTokenExpires = jwtDecode(user.accessToken).exp * 1000;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token.refreshToken).then((data) => {
        return {
          ...token,
          accessToken: data.access,
          refreshToken: data.refresh || token.refreshToken,
          accessTokenExpires: jwtDecode(data.access).exp * 1000,
        };
      });
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };