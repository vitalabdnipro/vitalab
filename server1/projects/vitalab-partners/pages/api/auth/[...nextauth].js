import NextAuth from "next-auth";
import prisma from "../../../lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import logo from "../../../public/vitalab.svg";

const confirmPasswordHash = (plainPassword, hashedPassword) => {
  return new Promise((resolve) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
      resolve(res);
    });
  });
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      name: "Вхід",
      credentials: {
        email: { label: "Електронна пошта", type: "text", placeholder: "" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
          include: {
            organization: true,
          },
        });
        // const user = await res.json();

        // If no error and we have user data, return it
        if (user) {
          const res = await confirmPasswordHash(
            credentials.password,
            user.password
          );

          if (res && user.isActive === "TRUE") {
            return (
              res && {
                id: user.id,
                name: `${user.lastName} ${user.firstName} ${user.middleName}`,
                email: user.email,
                lisId: user.lisId,
                role: user.role,
              }
            );
          }
        }
        return null;
      },
    }),
  ],
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code
    logo: "/vitalab.svg", // Absolute URL to image
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user = {
          id: token.sub,
          name: token.name,
          email: token.email,
          lisId: token.lis_id,
          role: token.role,
        };
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.lis_id = user.lisId;
        token.role = user.role;
      }

      return token;
    },
  },
});
