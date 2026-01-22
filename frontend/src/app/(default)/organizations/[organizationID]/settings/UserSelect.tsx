import { InputBox } from "@/components/ui/inputs/InputBox";
import { BaseApiInnerReturn, createBaseApi } from "@/lib/api/base";
import usersApi from "@/lib/api/handlers/users";
import { projectPermissions } from "@/lib/types/api/projects";
import { User } from "@/lib/types/api/users";
import React, {
  ReactElement,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

// used to determine how to display user on search results
export type ListUserStatus =
  | "selected"
  | "already-member"
  | "already-invited"
  | "standard";

export interface UserSelectRef {
  invSearchResults: User[];
  usersSelected: User[];
}

interface props {
  ref?: Ref<UserSelectRef>;
  determineUserStatus?: (user: User) => ListUserStatus;
}

// Component for seacrhing and selecting users
const UserSelect = ({ ref, determineUserStatus }: props) => {
  const [invSearchResults, setInvSearchResults] = useState<User[]>([]);
  const [usersSelected, setUsersSelected] = useState<User[]>([]);

  useImperativeHandle(ref, () => ({
    invSearchResults,
    usersSelected,
  }));

  // searches for users in invite modal with provided search criteria, sets results to invSearchResults
  const searchForUsers = (searchValue: string) => {
    const searchCriteria = searchValue.trim();

    if (searchCriteria === "" || searchCriteria === undefined) {
      setInvSearchResults([]);
      return;
    }

    usersApi.list({ search: searchCriteria }).then((res) => {
      setInvSearchResults(res.results as User[]);
    });
  };

  // determines entry properties when listed in the "Invite User" section
  const ListUser = ({ user }: { user: User }): ReactElement => {
    const [status, setStatus] = useState<ListUserStatus>("standard");

    useEffect(() => {
      if (determineUserStatus) setStatus(determineUserStatus(user));
    }, []);

    return (
      <li
        className={
          "pl-2 align-text-middle h-10 my-1 w-full flex rounded-md dark:border-dark-txt border-light-txt border " +
          (status === "selected"
            ? "bg-primary-green text-white"
            : status === "already-member" || status === "already-invited"
              ? "bg-gray-500 text-white"
              : "")
        }
      >
        <p className="my-auto">{user.username}</p>
        {status === "standard" ? (
          <button
            className="ml-auto align-middle rounded-r-sm h-full w-10 bg-primary-green hover:bg-accent-green cursor-pointer "
            onClick={() => {
              // add user to usersSelected
              let us = Object.assign([], usersSelected);
              us.push(user);
              setUsersSelected(us);
            }}
          >
            +
          </button>
        ) : status === "selected" ? (
          <button
            className="ml-auto align-middle rounded-r-sm h-full w-10 cursor-pointer bg-white hover:bg-gray-100 text-primary-green"
            onClick={() => {
              // remove user from usersSelected
              let us = Object.assign([], usersSelected) as User[];
              for (let i = 0; i < us.length; i++) {
                if (us[i].id === user.id) {
                  us.splice(i, 1);
                  setUsersSelected(us);
                  return;
                }
              }
            }}
          >
            -
          </button>
        ) : (
          <p className="italic ml-auto my-auto mr-3 text-slate-300">
            {" "}
            {status === "already-member" ? "Member" : "Invite sent"}
          </p>
        )}
      </li>
    );
  };

  return (
    <div className="flex flex-col w-90">
      <InputBox
        onChange={(e) => searchForUsers(e.target.value)}
        placeholder="Search username:"
        className="bg-white text-black mb-3 border-0"
      />
      <ul className="mb-3 p-1 rounded-md h-40 border border-white overflow-y-scroll standard-scrollbar bg-light-tertiary dark:bg-dark-tertiary text-light-txt dark:text-dark-txt">
        {invSearchResults.map((user) => (
          <ListUser user={user} key={user.id} />
        ))}
      </ul>
    </div>
  );
};

export default UserSelect;
