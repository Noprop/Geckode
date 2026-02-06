import { Project } from "@playwright/test";
import { BaseFilters } from "..";

export interface SpriteLibrary {
    id: number;
    name: string;
}

export interface SpriteLibraryFilters extends BaseFilters{
    name: string;
}

export interface SpriteLibraryPayload {
    name: string;
}

export const spriteLibrarySortKeys = ["id", "name"]

