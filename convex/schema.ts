import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stories: defineTable({
    title: v.string(),
    content: v.string(),
    userId: v.string(),
    name: v.string(),
    image: v.string(),
    likes: v.number(),
    likedBy: v.array(v.string()),
    comments: v.optional(
      v.array(v.object({ text: v.string(), user: v.string() }))
    ),
  })
    .index("by_user", ["userId"])
    .index("by_likes", ["likes"]),

  users: defineTable({
    userId: v.string(),
    name: v.string(),
    image: v.string(),
  }),
});
