import { Metadata } from "next";
import { prisma } from "../../../lib/prisma";
import FollowButton from "../../../components/FollowButton/FollowButton";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const users = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${users?.name}` };
}

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });

  const { name, bio, image } = user ?? {};
  return (
    <div>
      <h1>{name}</h1>

      <img src={image ?? "/mememan.webp"} alt={`${name}'s profile`} />

      <h3>Bio</h3>
      <p>{bio}</p>
      {/* <FollowButton targetUserId={params.id} /> */}
    </div>
  );
}
