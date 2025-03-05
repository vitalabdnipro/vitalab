// https://next-auth.js.org/configuration/nextjs#middleware
// export { default } from "next-auth/middleware";

import { withAuth } from "next-auth/middleware";
// import { NextResponse, NextRequest } from "next/server";
export default withAuth(
  // function middleware(req) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/patients'
  //   return NextResponse.rewrite(url)
  //   // return NextResponse.redirect("/patients");
  // },
  {
    callbacks: {
      authorized: ({ req, token }) =>
        // req.nextUrl.pathname?.slice(0, 5) === "/api/" ||
        req.nextUrl.pathname === "/api/results" ||        
        req.nextUrl.pathname === "/api/results/sms" ||
        !!token,
    },
  }
);

// export default withAuth(
//   function middleware(req) {
//     console.log("!");
//   },
//   {
//     callbacks: {
//       // authorized: ({ token }) => token?.role === "admin",
//       authorized: ({ req, token }) => {
//         if (req.url == "http://localhost:3001/favicon.ico") {
//           console.log("al11", req.url);
//         }
//         return !!token;
//       },
//     },
//   }
// );

// // protect all api routes but /api/healthcheck
// export default withAuth({
//   callbacks: {
//     authorized: async ({ req, token }) => {
//       if (req.page.name === '/api/healthcheck') return true;
//       if (token) return true;
//       return false;
//     },
//   },
// });

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   // return early if url isn't supposed to be protected
//   if (!req.url.includes("/protected-url")) {
//     return NextResponse.next();
//   }

//   const session = await getToken({ req, secret: process.env.SECRET });
//   // You could also check for any property on the session object,
//   // like role === "admin" or name === "John Doe", etc.
//   if (!session) return NextResponse.redirect("/api/auth/signin");

//   // If user is authenticated, continue.
//   return NextResponse.next();
// }
