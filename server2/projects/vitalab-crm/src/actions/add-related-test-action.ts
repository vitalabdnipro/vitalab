"use server";

import { db } from "@/server/db";
import { authActionClient } from "./safe-action";
import { addRelatedTestSchema } from "./shema";
import { products, relatedTests } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const addRelatedTestAction = authActionClient
  .schema(addRelatedTestSchema)
  .action(
    async ({
      parsedInput: { testId, code, title, relatedTestId },
      ctx: { session },
    }) => {
      if (!session) {
        throw new Error("Unauthorized");
      }

      await db.transaction(async (tx) => {
        const test = await tx.query.products.findFirst({
          where: eq(products.id, testId),
        });

        if (!test) {
          await tx.insert(products).values({
            id: testId,
            title,
            code,
          });
        }

        await tx.insert(relatedTests).values({
          testId,
          relatedTestId,
        });
      });

      revalidatePath(`/${testId}`);
      revalidatePath(`/`);
    },
  );
