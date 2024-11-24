// src/service/locale.js :

'use server';

import { cookies } from 'next/headers';
import { defaultLocale } from '../config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale) {
  cookies().set(COOKIE_NAME, locale);
}