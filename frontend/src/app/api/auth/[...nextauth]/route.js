// src/app/api/auth/[...nextauth]/route.js

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
          const res = await axios.post(`${API_BASE_URL}/api/token/`, {
            login: credentials.login,
            password: credentials.password,
          });

          const decoded = jwtDecode(res.data.access);

          if (res.data) {
            return {
              ...res.data,
              user: {
                login: credentials.login,
                uid: decoded.user_uid,
              },
            };
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
        token.accessToken = user.access;
        token.refreshToken = user.refresh;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
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
