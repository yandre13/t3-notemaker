import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
          authorId: ctx.session.user.id,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        topicId: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          topicId: input.topicId,
          authorId: input.authorId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
