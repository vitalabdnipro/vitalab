"use server";

import { db } from "@/server/db";
import { authActionClient } from "./safe-action";
import { safeDescriptionSchema } from "./shema";
import { products } from "@/server/db/schema";

export const safeDescriptionAction = authActionClient
  .schema(safeDescriptionSchema)
  .action(
    async ({
      parsedInput: { id, text, mid_code, otherNames, preparation, biomaterial },
      ctx: { session },
    }) => {
      console.log("otherNames", otherNames);
      console.log("preparation", preparation);
      console.log("biomaterial", biomaterial);
      console.log("text", text);
      console.log("session", session);
      if (!session) {
        throw new Error("Unauthorized");
      }

      try {
        await db
          .insert(products)
          .values({
            id,
            code: mid_code,
            description: text,
            otherNames: otherNames,
            preparation: preparation,
            biomaterial: biomaterial,
          })
          .onConflictDoUpdate({
            target: products.id,
            set: {
              description: text,
              otherNames: otherNames,
              preparation: preparation,
              biomaterial: biomaterial,
            },
          });
      } catch (error) {
        console.log("error", error);
      }
    },
  );
