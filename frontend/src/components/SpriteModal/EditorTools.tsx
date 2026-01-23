import { EraserIcon } from "@radix-ui/react-icons";
import { PencilIcon, BucketIcon, LineIcon, CircleIcon, RectangleSelectionIcon, HandIcon, ColorPickerIcon } from '@/components/icons';
import type { Tool } from './SpriteEditor';

interface ToolButtonProps {
  tool: Tool;
  activeTool: Tool;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

const ToolButton = ({ tool, activeTool, onClick, title, children }: ToolButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-12 h-12 flex items-center justify-center rounded cursor-pointer transition ${
      activeTool === tool
        ? 'bg-primary-green text-white'
        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
    }`}
    title={title}
  >
    {children}
  </button>
);

const EditorTools = ({ activeTool, setActiveTool }: { activeTool: Tool, setActiveTool: (tool: Tool) => void }) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-fit mx-auto">
      <ToolButton tool="pen" activeTool={activeTool} onClick={() => setActiveTool('pen')} title="Pen tool">
        <PencilIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="eraser" activeTool={activeTool} onClick={() => setActiveTool('eraser')} title="Eraser tool">
        <EraserIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="bucket" activeTool={activeTool} onClick={() => setActiveTool('bucket')} title="Bucket fill tool">
        <BucketIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="line" activeTool={activeTool} onClick={() => setActiveTool('line')} title="Pencil line tool">
        <LineIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="rectangle" activeTool={activeTool} onClick={() => setActiveTool('rectangle')} title="Rectangle tool">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="1" />
        </svg>
      </ToolButton>
      <ToolButton tool="oval" activeTool={activeTool} onClick={() => setActiveTool('oval')} title="Oval tool">
        <CircleIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="rectangle-selection" activeTool={activeTool} onClick={() => setActiveTool('rectangle-selection')} title="Rectangle selection tool">
        <RectangleSelectionIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="pan-tool" activeTool={activeTool} onClick={() => setActiveTool('pan-tool')} title="Pan tool">
        <HandIcon className="w-5 h-5" />
      </ToolButton>
      <ToolButton tool="color-picker" activeTool={activeTool} onClick={() => setActiveTool('color-picker')} title="Color picker tool">
        <ColorPickerIcon className="w-5 h-5" />
      </ToolButton> 
    </div>
  );
};

export default EditorTools;
