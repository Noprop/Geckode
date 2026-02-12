import { BaseFilters } from "..";

export interface Asset {
    id: number;
    name: string;
    texture: string;
    texture_type: string;
}

export interface AssetFilters extends BaseFilters{
    name: string;
    texture_type: string;
}

export interface AssetPayload {
    name: string;
    texture_file: File;
    texture_type: string;
}