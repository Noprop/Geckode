import { BaseFilters } from "..";

export interface Asset {
    id: number;
    name: string;
    asset: string;
    asset_type: string;
}

export interface AssetFilters extends BaseFilters{
    name: string;
    asset_type: string;
}

export interface AssetPayload {
    name: string;
    asset : string;
    asset_file: File;
    asset_type: string;
}