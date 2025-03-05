"use server";

import { db } from "@/server/db";
import { authActionClient } from "./safe-action";
import { removeRelatedTestSchema } from "./shema";
import { relatedTests } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const removeRelatedTestAction = authActionClient
  .schema(removeRelatedTestSchema)
  .action(async ({ parsedInput: { id }, ctx: { session } }) => {
    if (!session) {
      throw new Error("Unauthorized");
    }

    await db.delete(relatedTests).where(eq(relatedTests.id, id));

    // revalidatePath(`/${testId}`);
    revalidatePath(`/`);
  });
