const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS ||
    "http://localhost:7000,http://localhost:7001,http://localhost:9000,http://localhost:8000,http://vitalab.localhost,http://vitalab.localhost:8000,http://vitalab.localhost:9000";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS ||
    "http://localhost:8000,http://localhost:9000,http://vitalab.localhost,http://vitalab.localhost:8000,http://vitalab.localhost:9000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-store";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: "@medusajs/admin",
    options: {
      serve: true,
      autoRebuild: true,
    },
  },
  {
    resolve: `medusa-plugin-meilisearch`,
    options: {
      // config object passed when creating an instance
      // of the MeiliSearch client
      config: {
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
      },
      settings: {
        // index name
        products: {
          indexSettings: {
            searchableAttributes: ["title", "mid_code", "description"],
            displayedAttributes: [
              "title",
              "id",
              "mid_code",
              "variant",
              "variants",
              "metadata.manipulation_id",
              "days",
              "handle",
              "description",
              // "product",
              "price",
            ],
          },
          primaryKey: "id",
          transformer: (product) => ({
            id: product.id,
            mid_code: product.mid_code,
            title: product.title,
            description: product.description,
            days: product.metadata?.days,
            // product: product,
            price:
              product?.variants?.[0]?.prices.length > 1
                ? product.variants?.[0]?.prices?.[1].amount / 100
                : product.variants?.[0]?.prices?.[0].amount / 100,
            // other attributes...
          }),
        },
        // products: {
        //   // MeiliSearch's setting options to be set on a particular index
        //   searchableAttributes: [
        //     "title",
        //     // "description",
        //     // "variant_sku",
        //     // "variant",
        //     // "attributes",
        //     "mid_code",
        //     // "variants",
        //   ],
        //   displayedAttributes: [
        //     "title",
        //     "id",
        //     // "attributes",
        //     "mid_code",
        //     // "description",
        //     // "variant_sku",
        //     // "thumbnail",

        //     "variant",
        //     "variants",
        //     "metadata.manipulation_id",
        //     "handle",
        //   ],
        // },
      },
    },
  },
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    // For more production-like environment install PostgresQL
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    cli_migration_dirs: ["dist/**/*.migration.js"],
    database_logging: ["warn", "error"],
  },
  plugins,
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: "redis://192.46.236.159:6379",
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: "redis://192.46.236.159:6379",
    },
  },
};
