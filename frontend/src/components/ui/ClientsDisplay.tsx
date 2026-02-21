import { getClientColourHex } from "@/lib/yjs/clients";
import { useLayoutStore } from "@/stores/layoutStore";

export const ClientsDisplay = () => {
  const clients = useLayoutStore((s) => s.clients);
  const maxIconCount = 4;
  const iconSize = 10;

  return <>
    {clients.slice(0, maxIconCount).map((client, i) => (
      <div
        key={i}
        className={`w-${iconSize} h-${iconSize} overflow-hidden rounded-full`}
        style={{ outline: `2px solid ${getClientColourHex(i)}` }}
      >
        <img
          src={client?.user?.avatar || "/user-icon.png"}
          title={`${client?.user?.first_name ?? 'First'} ${client?.user?.last_name ?? 'Last'}` +
            ` (${client?.user?.username ?? 'username'})`}
          alt={client?.user?.first_name + ' ' + client?.user?.last_name}
          className={`size-full object-cover`}
        />
      </div>
    ))}
    {clients.length > maxIconCount ? <>
      <div
        key="extra-clients"
        className={`w-${iconSize} h-${iconSize} overflow-hidden rounded-full bg-white dark:bg-black
        flex justify-center select-none`}
      >
        <span className="my-auto font-bold text-sm text-center">
          +{clients.length - maxIconCount}
        </span>
      </div>
    </> : null}
  </>;
};