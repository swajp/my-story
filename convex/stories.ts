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
    const name = identity.name;
    const image = identity.pictureUrl;

    const story = await ctx.db.insert("stories", {
      title: args.title,
      content: args.content,
      userId,
      name: name || "User",
      image: image || "",
      likes: 0,
      likedBy: [],
      comments: [],
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

export const story = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    const story = await ctx.db
      .query("stories")
      .filter((q) => q.eq(q.field("_id"), args.id))

      .collect();

    return story;
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

export const getUserPostsAndLikes = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query("stories")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    return posts;
  },
});

export const addComment = mutation({
  args: { id: v.id("stories"), comment: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authorized");
    }

    const existingStory = await ctx.db.get(args.id);

    if (!existingStory) {
      throw new Error("Story not found");
    }

    if (!identity.name) {
      throw new Error("Please set your name in your profile");
    }

    const comment = await ctx.db.patch(args.id, {
      comments: [
        ...existingStory.comments,
        { text: args.comment, user: identity.name },
      ],
    });

    return comment;
  },
});

export const getComments = query({
  args: { id: v.id("stories") },
  handler: async (ctx, args) => {
    const existingStory = await ctx.db.get(args.id);

    if (!existingStory) {
      throw new Error("Story not found");
    }

    return existingStory.comments;
  },
});

export const deleteStory = mutation({
  args: { id: v.id("stories") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authorized");
    }

    const existingStory = await ctx.db.get(args.id);

    if (!existingStory) {
      throw new Error("Story not found");
    }

    if (existingStory.userId !== identity.subject) {
      throw new Error("You can't delete this story");
    }

    await ctx.db.delete(args.id);

    return true;
  },
});
