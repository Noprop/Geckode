import { PublicUser } from "../api/users";

export interface BlockDrag {
  blockId: string;
  group: string;
  newCoordinate: string;
  oldCoordinate: string;
}

export interface BlockSelection {
  blockId: string;
  oldBlockId: string;
}

export interface Client {
  id: number;
  user: PublicUser;
  blockDrag?: BlockDrag;
  blockSelection?: BlockSelection;
}