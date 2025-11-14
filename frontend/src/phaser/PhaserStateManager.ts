// allows phaser data to be uploaded

export interface PhaserExport {
    [key: string]: any
}

// Schema mirrors the interface to 
const phaserExportSchema = {
  game: "any",
  scene: {
    key: "string",
    player: "object",  /// Use a format like: {x: "number",y: "number"} if you only want specific fields,
    add: {
      displayList: {
        list: "object", // dynamic numeric keys
      },
    },
  },
} as const;

// uses schema to filter the given object by the associated interface
export function filterBySchema<T>(obj: any, schema: any): T | undefined {
  if (schema === "any") return obj;
  if (typeof schema === "string") {
    if (typeof obj === schema || schema === "any") return obj;
    return undefined;
  }

  // If schema is an object then go into the object and copy their properties
  if (typeof schema === "object" && typeof obj === "object" && obj !== null) {
    const result: any = Array.isArray(obj) ? [] : {};
    for (const key of Object.keys(schema)) {
      const subSchema = schema[key];
      const subValue = obj[key];
      const filtered = filterBySchema<T>(subValue, subSchema);
      if (filtered !== undefined) result[key] = filtered;
    }
    return result;
  }

  return undefined;
}

export function createPhaserState(phaserRef: {game?: any, scene?:any }) : PhaserExport | undefined {
    return filterBySchema<PhaserExport>(phaserRef, phaserExportSchema);
}

type ImportFunction = (phaserRef: {game?: any, scene?: any}, dataFromState: any) => void;

// determines how objects are imported into phaser
const importRegistry: Record<string, ImportFunction> = {
  player: (phaserRef, data) => phaserRef.scene.createPlayer?.(data.x, data.y, data.key),
  add: (phaserRef, data) => {
    const spriteList = data.displayList?.list!;
    return spriteList.map((spr : any) => {if(spr.name !== 'player') phaserRef.scene.addStar (spr.x, spr.y, spr.key)})
  }
};

export function loadPhaserState(phaserRef: {game?: any, scene?: any}, phaserState: {[key:string] : any}) {
  if (phaserRef.scene.key !== phaserState.scene.key) return

  // implement import function
  Object.keys(phaserState.scene!).forEach((key) => {
    if (key in importRegistry) importRegistry[key](phaserRef, phaserState.scene?.[key]);
  });

}