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
  })
    .index("by_user", ["userId"])
    .index("by_likes", ["likes"]),
});
