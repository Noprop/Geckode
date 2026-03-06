import { getClientColourHex } from "@/lib/yjs/clients";
import { useLayoutStore } from "@/stores/layoutStore";
import { UserIcon } from "./UserIcon";

export const ClientsDisplay = () => {
  const clients = useLayoutStore((s) => s.clients);
  const maxIconCount = 4;

  return <>
    {clients.slice(0, maxIconCount).map((client, i) => (
      <UserIcon
        key={client.id}
        user={client.user}
        variant="avatar"
        size="md"
        accentColor={getClientColourHex(i)}
      />
    ))}
    {clients.length > maxIconCount ? <>
      <div
        key="extra-clients"
        className="size-8 overflow-hidden rounded-full bg-white dark:bg-black flex justify-center select-none"
      >
        <span className="my-auto font-bold text-sm text-center">
          +{clients.length - maxIconCount}
        </span>
      </div>
    </> : null}
  </>;
};