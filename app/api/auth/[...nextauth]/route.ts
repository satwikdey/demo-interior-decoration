import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { countUsers, createUser, findUserByEmail } from "@/lib/firestore-data";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await findUserByEmail(credentials.email);

        if (!user) {
          // If no user exists, and it's the first time, we could auto-create one
          // but for security, we should have a seed script.
          // For now, let's allow the first user to be created if the DB is empty
          const userCount = await countUsers();
          if (userCount === 0 && credentials.email === process.env.ADMIN_EMAIL) {
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const createdUser = await createUser(credentials.email, hashedPassword);
            return {
              id: createdUser.id,
              email: createdUser.email,
            };
          }
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
