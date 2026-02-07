import { BaseFilters } from "..";

export interface Sprite {
    id: number;
    name: string;
    texture: string;
}

export interface SpriteFilters extends BaseFilters{
    name: string;
}

export interface SpritePayload {
    name: string;
    texture: File;
}