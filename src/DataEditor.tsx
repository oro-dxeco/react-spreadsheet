import * as React from "react";
import * as Types from "./types";
import { moveCursorToEnd } from "./util";

/** The default Spreadsheet DataEditor component */
const DataEditor: React.FC<Types.DataEditorProps> = ({
  onChange,
  cell,
  supportIme,
  mode,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...cell, value: event.target.value });
    },
    [onChange, cell]
  );

  React.useEffect(() => {
    if (inputRef.current) {
      moveCursorToEnd(inputRef.current);
    }
  }, [inputRef]);

  React.useEffect(() => {
    // 遅延を入れてinputにフォーカスさせる（supportImeモード下）
    supportIme && setTimeout(() => inputRef.current?.focus(), 0);
  }, [inputRef, supportIme]);

  const value = cell?.value ?? "";

  return (
    <div className="Spreadsheet__data-editor">
      <input
        ref={inputRef}
        type="text"
        onChange={handleChange}
        value={value}
        autoFocus
        // editモードになったら表示する（supportImeモード下）
        style={{ opacity: !supportIme || mode === "edit" ? 1 : 0 }}
      />
    </div>
  );
};

export default DataEditor;
