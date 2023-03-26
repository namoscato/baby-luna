import { ApiResponse } from "@/app/api/types";
import { WishesRequest, WishesResponse } from "@/app/api/wishes/sendWishes";
import { useCallback } from "react";
import { Key } from "swr";
import useSWRMutation from "swr/mutation";

interface Response {
  sendWishes: (wishes: WishesRequest) => Promise<WishesResponse>;
  isSending: boolean;
}

export function useSendWishes(): Response {
  const { trigger, isMutating } = useSWRMutation<
    ApiResponse<WishesResponse>,
    any,
    Key,
    WishesRequest
  >("/api/wishes", sendRequest);

  const sendWishes = useCallback(
    async (wishes: WishesRequest) => {
      const data = await trigger(wishes);

      if (!data?.data) {
        throw new Error("Error sending wishes");
      }

      return data.data;
    },
    [trigger]
  );

  return {
    sendWishes,
    isSending: isMutating,
  };
}

async function sendRequest(url: string, { arg }: { arg: any }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}
