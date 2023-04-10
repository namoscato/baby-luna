import { Wishes } from "@/components/Wishes/Wishes";
import { fetchWishes } from "./fetchWishes";

export default async function WishesPage() {
  const wishes = await fetchWishes();

  return <Wishes wishes={wishes} />;
}
