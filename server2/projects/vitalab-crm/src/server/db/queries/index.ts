import { eq } from "drizzle-orm";
import { db } from "..";
import { products, type RelatedTest } from "../schema";
import { type searchParamsCache } from "@/lib/utils";

export async function getProduct(params: { id: string }): Promise<{
  id: string;
  mid_code: string;
  title: string;
  description?: string | null;
  otherNames?: string | null;
  preparation?: string | null;
  relatedTests?: RelatedTest[];
}> {
  const { id } = params;

  if (!id) return null;

  const res = await fetch(`https://admin.vitalab.com.ua/store/products/${id}`);

  const { product } = (await res.json()) as {
    product: {
      id: string;
      title: string;
      mid_code: string;
    };
  };

  const dbProduct = await db.query.products.findFirst({
    where: eq(products.id, id),
    columns: {
      description: true,
      otherNames: true,
      preparation: true,
    },
    with: {
      relatedTests: true,
    },
  });

  console.log("dbProduct", dbProduct);

  return {
    id: product.id,
    title: product.title,
    mid_code: product.mid_code,
    description: dbProduct?.description as string,
    otherNames: dbProduct?.otherNames as string,
    preparation: dbProduct?.preparation as string,
    relatedTests: dbProduct?.relatedTests,
  };
}

export type Test = {
  id: string;
  mid_code: string;
  title: string;
  status: string;
};

export type Tests = {
  count: number;
  limit: number;
  offset: number;
  products: Test[];
};

async function getTestsQuery(
  params?: ReturnType<typeof searchParamsCache.parse>,
) {
  const { code } = (await params) ?? {};

  const res = await fetch(
    "https://admin.vitalab.com.ua/store/products?limit=1000",
  );
  const tests = (await res.json()) as Tests;

  if (code) {
    const product = tests.products.filter((test) => test.mid_code === code);

    return {
      ...tests,
      products: product,
    };
  }

  return tests;
}

export async function getTests(
  params?: ReturnType<typeof searchParamsCache.parse>,
) {
  return getTestsQuery(params);
  // return unstable_cache(async () => getTestsQuery(params), ["tests"], {
  //   tags: ["tests"],
  //   revalidate: 3600,
  // });
}
