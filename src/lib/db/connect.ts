import mongoose from "mongoose";

/**
 * WHY THIS FILE EXISTS
 * ---------------------
 * Next.js API routes run as serverless functions. In a serverless environment,
 * every request can spin up a new function instance. If we call
 * `mongoose.connect()` on every request, we quickly exhaust MongoDB's
 * connection limit.
 *
 * The fix: cache the connection (and the in-flight connection promise) on the
 * Node.js global object. Since the global object persists between hot
 * reloads in dev and between invocations on a warm serverless instance,
 * we reuse the same connection instead of creating a new one every time.
 */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined. Add it to your .env.local file."
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
