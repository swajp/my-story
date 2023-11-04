import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authorized");
    }

    const userId = identity.subject;

    const story = await ctx.db.insert("stories", {
      title: args.title,
      content: args.content,
      userId,
      likes: 0,
    });

    return story;
  },
});

export const stories = query({
  handler: async (ctx) => {
    const stories = await ctx.db.query("stories").order("desc").collect();

    return stories;
  },
});
