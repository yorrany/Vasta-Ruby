import { PublicProfile } from "../../components/profile/PublicProfile"

type Props = {
  params: Promise<{ username: string }>
}

export default async function Page({ params }: Props) {
  const { username } = await params
  return <PublicProfile username={username} />
}
