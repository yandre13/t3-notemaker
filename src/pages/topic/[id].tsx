import Content from "@/components/Content";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { type Note } from "@prisma/client";
import { type GetServerSidePropsContext } from "next";

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { id } = ctx.params as { id: string };
  const { referer } = ctx.req.headers;

  // if theres a referer, then the user is coming from next link
  if (referer) {
    return {
      props: {
        notes: null,
        topicId: id,
        ssr: false,
      },
    };
  }

  const session = await getServerAuthSession(ctx);
  const notesDb = await prisma.note.findMany({
    where: {
      topicId: id,
      authorId: session?.user?.id ?? "undefined",
    },
  });

  const notes =
    notesDb.length > 0
      ? (JSON.parse(JSON.stringify(notesDb)) as Note[] | null)
      : [];

  return {
    props: {
      notes,
      topicId: id,
      ssr: true,
    },
  };

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
}

export default function Topic({
  notes,
  topicId,
  ssr,
}: {
  notes: Note[] | null;
  topicId: string;
  ssr: boolean;
}) {
  return (
    <>
      <Content notes={notes} topicId={topicId} ssr={ssr} />
    </>
  );
}
