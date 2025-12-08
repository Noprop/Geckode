import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface Props {
  centerDecal?: ReactNode | string | null;
  multiple?: boolean;
  accept?: string;
  dropAgain?: "overwrite" | "append";
  OnFileDrop?: (files: Array<File>) => any; //handles file changes when OnFileDrop is triggered
  OnChange?: React.FormEventHandler<HTMLDivElement> | undefined;
}

export interface DragAndDropRef {
  files: Array<File> | null;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

type DragAndDropRefObj = React.Ref<DragAndDropRef>;

const DragAndDrop = ({
  ref,
  centerDecal = DefaultCenterDecal,
  multiple = false,
  accept,
  dropAgain = "overwrite",
  OnFileDrop,
  OnChange,
}: { ref: DragAndDropRefObj } & Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<Array<File>>([]);

  // expose files
  useImperativeHandle(ref, () => ({
    files: files,
    setFiles: setFiles,
  }));

  useEffect(() => {
    console.log(files?.length! > 0);
  }, [files]);

  const handleOnDrop = (fs: FileList) => {
    if (fs.length === 0) return;
    const fsList = Array.from(fs);

    // filter fs on accept parametres (matches with MIME type)
    const rules = accept!.split(",").map((x) => x.trim().toLowerCase());

    fsList.filter((file) => {
      const fileType = file.type.toLowerCase();
      const fileExt = "." + file.name.split(".").pop()?.toLowerCase();

      return rules.some((rule) => {
        if (rule.endsWith("/*")) {
          return fileType.startsWith(rule.replace("/*", ""));
        }
        if (rule.startsWith(".")) {
          return fileExt === rule;
        }
        return fileType === rule;
      });
    });

    if (fs.length === 0) return;

    // get file url paths for image and and file display
    if (dropAgain === "overwrite") setFiles(fsList);
    else setFiles(files && files.concat(fsList));

    // only take first enrty if multiple is disabled
    if (!multiple && files.length > 0) setFiles([files[0]]);

    // handle OnFileDrop given
    if (OnFileDrop) OnFileDrop(files);
  };

  return (
    <>
      <div
        className="outline outline-light-txt dark:outline-dark-txt rounded-lg w-full p-5 my-2"
        onDrop={(e) => {
          e.preventDefault();
          handleOnDrop(e.dataTransfer.files);
        }}
        onChange={OnChange}
        onDragOver={(e) => e.preventDefault()}
      >
        {centerDecal}
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept={accept}
          onChange={(e) => {
            e.preventDefault();
            handleOnDrop(e.target.files!);
          }}
        />
        <div
          className="text-sm underline text-blue-500 hover:text-blue-400 active:text-blue-600 hover:cursor-pointer w-full text-center"
          onClick={() => inputRef.current?.click()}
        >
          Open File Explorer
        </div>
      </div>
      <ul>
        {files?.map((f) => (
          <li
            key={f.name}
            className="bg-light-hover dark:bg-dark-hover rounded-lg w-full my-1 flex"
          >
            {f.type.startsWith("image") && (
              <img
                src={URL.createObjectURL(f)}
                className="h-9 rounded-l-lg"
              ></img>
            )}
            <p className="p-2">{f.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

const DefaultCenterDecal = <p className="text-center">Drag your file here!</p>;
export default DragAndDrop;
