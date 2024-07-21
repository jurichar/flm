export async function getSession(request) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');
  if (!accessToken || !refreshToken) {
    return null;
  }
  try {
    return {};
  } catch (error) {
    console.error(error);
  }
}

export async function refreshSession(request) {
  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken) {
    return null;
  }
  try {
    return {};
  } catch (error) {
    console.error(error);
  }
}
