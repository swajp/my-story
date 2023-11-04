import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stories: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.string(),
    likes: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_likes", ["likes"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
  }),
});
