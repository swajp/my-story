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
      likedBy: [],
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

export const giveLike = mutation({
  args: { id: v.id("stories"), userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authorized");
    }

    const existingStory = await ctx.db.get(args.id);

    if (!existingStory) {
      throw new Error("Story not found");
    }

    if (existingStory.userId === identity.subject) {
      throw new Error("You can't like your own story");
    }

    if (existingStory.likedBy.includes(identity.subject)) {
      const story = await ctx.db.patch(args.id, {
        likes: existingStory.likes - 1,
        likedBy: existingStory.likedBy.filter((id) => id !== identity.subject),
      });

      return story;
    } else {
      const story = await ctx.db.patch(args.id, {
        likes: existingStory.likes + 1,
        likedBy: [...existingStory.likedBy, identity.subject],
      });

      return story;
    }
  },
});
