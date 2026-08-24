export const config = {
  matcher: '/((?!api/|images/|css/|favicon.ico).*)',
};

const PASSWORT = 'Sonne 2026';
const COOKIE_NAME = 'ea_preview';
const COOKIE_WERT = 'freigegeben';

function istAuthentifiziert(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  return cookieHeader
    .split(';')
    .some((teil) => teil.trim() === `${COOKIE_NAME}=${COOKIE_WERT}`);
}

export default async function middleware(request) {
  const url = new URL(request.url);

  if (url.pathname === '/gate' && request.method === 'POST') {
    const daten = await request.formData();

    if (daten.get('passwort') === PASSWORT) {
      return new Response(null, {
        status: 303,
        headers: {
          Location: new URL('/', url).toString(),
          'Set-Cookie': `${COOKIE_NAME}=${COOKIE_WERT}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`,
        },
      });
    }

    return Response.redirect(new URL('/gate.html?fehler=1', url), 303);
  }

  if (url.pathname === '/gate.html' || istAuthentifiziert(request)) {
    return;
  }

  return Response.redirect(new URL('/gate.html', url), 303);
}
