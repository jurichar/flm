// src/service/locale.js :
'use server';

import { defaultLocale } from '@/config';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale) {
  cookies().set(COOKIE_NAME, locale);
}
