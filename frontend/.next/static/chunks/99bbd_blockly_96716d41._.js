(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/blocks.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blocks",
    ()=>blocks,
    "lists",
    ()=>lists,
    "logic",
    ()=>logic,
    "loops",
    ()=>loops,
    "math",
    ()=>math,
    "procedures",
    ()=>procedures,
    "texts",
    ()=>texts,
    "variables",
    ()=>variables,
    "variablesDynamic",
    ()=>variablesDynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$blocks_compressed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/blocks_compressed.js [app-client] (ecmascript)");
;
const { blocks, lists, logic, loops, math, procedures, texts, variables, variablesDynamic } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$blocks_compressed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/blockly.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Block",
    ()=>Block,
    "BlockFlyoutInflater",
    ()=>BlockFlyoutInflater,
    "BlockNavigationPolicy",
    ()=>BlockNavigationPolicy,
    "BlockSvg",
    ()=>BlockSvg,
    "Blocks",
    ()=>Blocks,
    "ButtonFlyoutInflater",
    ()=>ButtonFlyoutInflater,
    "COLLAPSED_FIELD_NAME",
    ()=>COLLAPSED_FIELD_NAME,
    "COLLAPSED_INPUT_NAME",
    ()=>COLLAPSED_INPUT_NAME,
    "COLLAPSE_CHARS",
    ()=>COLLAPSE_CHARS,
    "CodeGenerator",
    ()=>CodeGenerator,
    "CollapsibleToolboxCategory",
    ()=>CollapsibleToolboxCategory,
    "ComponentManager",
    ()=>ComponentManager,
    "Connection",
    ()=>Connection,
    "ConnectionChecker",
    ()=>ConnectionChecker,
    "ConnectionDB",
    ()=>ConnectionDB,
    "ConnectionNavigationPolicy",
    ()=>ConnectionNavigationPolicy,
    "ConnectionType",
    ()=>ConnectionType,
    "ContextMenu",
    ()=>ContextMenu,
    "ContextMenuItems",
    ()=>ContextMenuItems,
    "ContextMenuRegistry",
    ()=>ContextMenuRegistry,
    "Css",
    ()=>Css,
    "DELETE_VARIABLE_ID",
    ()=>DELETE_VARIABLE_ID,
    "DeleteArea",
    ()=>DeleteArea,
    "DragTarget",
    ()=>DragTarget,
    "DropDownDiv",
    ()=>DropDownDiv,
    "Events",
    ()=>Events,
    "Extensions",
    ()=>Extensions,
    "Field",
    ()=>Field,
    "FieldCheckbox",
    ()=>FieldCheckbox,
    "FieldDropdown",
    ()=>FieldDropdown,
    "FieldImage",
    ()=>FieldImage,
    "FieldLabel",
    ()=>FieldLabel,
    "FieldLabelSerializable",
    ()=>FieldLabelSerializable,
    "FieldNavigationPolicy",
    ()=>FieldNavigationPolicy,
    "FieldNumber",
    ()=>FieldNumber,
    "FieldTextInput",
    ()=>FieldTextInput,
    "FieldVariable",
    ()=>FieldVariable,
    "Flyout",
    ()=>Flyout,
    "FlyoutButton",
    ()=>FlyoutButton,
    "FlyoutButtonNavigationPolicy",
    ()=>FlyoutButtonNavigationPolicy,
    "FlyoutItem",
    ()=>FlyoutItem,
    "FlyoutMetricsManager",
    ()=>FlyoutMetricsManager,
    "FlyoutNavigationPolicy",
    ()=>FlyoutNavigationPolicy,
    "FlyoutNavigator",
    ()=>FlyoutNavigator,
    "FlyoutSeparator",
    ()=>FlyoutSeparator,
    "FlyoutSeparatorNavigationPolicy",
    ()=>FlyoutSeparatorNavigationPolicy,
    "FocusManager",
    ()=>FocusManager,
    "FocusableTreeTraverser",
    ()=>FocusableTreeTraverser,
    "Generator",
    ()=>Generator,
    "Gesture",
    ()=>Gesture,
    "Grid",
    ()=>Grid,
    "HorizontalFlyout",
    ()=>HorizontalFlyout,
    "INPUT_VALUE",
    ()=>INPUT_VALUE,
    "Input",
    ()=>Input,
    "InsertionMarkerPreviewer",
    ()=>InsertionMarkerPreviewer,
    "KeyboardNavigationController",
    ()=>KeyboardNavigationController,
    "LabelFlyoutInflater",
    ()=>LabelFlyoutInflater,
    "LineCursor",
    ()=>LineCursor,
    "Marker",
    ()=>Marker,
    "MarkerManager",
    ()=>MarkerManager,
    "Menu",
    ()=>Menu,
    "MenuItem",
    ()=>MenuItem,
    "MetricsManager",
    ()=>MetricsManager,
    "Msg",
    ()=>Msg,
    "NEXT_STATEMENT",
    ()=>NEXT_STATEMENT,
    "Names",
    ()=>Names,
    "Navigator",
    ()=>Navigator,
    "OPPOSITE_TYPE",
    ()=>OPPOSITE_TYPE,
    "OUTPUT_VALUE",
    ()=>OUTPUT_VALUE,
    "Options",
    ()=>Options,
    "PREVIOUS_STATEMENT",
    ()=>PREVIOUS_STATEMENT,
    "PROCEDURE_CATEGORY_NAME",
    ()=>PROCEDURE_CATEGORY_NAME,
    "Procedures",
    ()=>Procedures,
    "RENAME_VARIABLE_ID",
    ()=>RENAME_VARIABLE_ID,
    "RenderedConnection",
    ()=>RenderedConnection,
    "Scrollbar",
    ()=>Scrollbar,
    "ScrollbarPair",
    ()=>ScrollbarPair,
    "SeparatorFlyoutInflater",
    ()=>SeparatorFlyoutInflater,
    "ShortcutItems",
    ()=>ShortcutItems,
    "ShortcutRegistry",
    ()=>ShortcutRegistry,
    "TOOLBOX_AT_BOTTOM",
    ()=>TOOLBOX_AT_BOTTOM,
    "TOOLBOX_AT_LEFT",
    ()=>TOOLBOX_AT_LEFT,
    "TOOLBOX_AT_RIGHT",
    ()=>TOOLBOX_AT_RIGHT,
    "TOOLBOX_AT_TOP",
    ()=>TOOLBOX_AT_TOP,
    "Theme",
    ()=>Theme,
    "ThemeManager",
    ()=>ThemeManager,
    "Themes",
    ()=>Themes,
    "Toast",
    ()=>Toast,
    "Toolbox",
    ()=>Toolbox,
    "ToolboxCategory",
    ()=>ToolboxCategory,
    "ToolboxItem",
    ()=>ToolboxItem,
    "ToolboxSeparator",
    ()=>ToolboxSeparator,
    "Tooltip",
    ()=>Tooltip,
    "Touch",
    ()=>Touch,
    "Trashcan",
    ()=>Trashcan,
    "UnattachedFieldError",
    ()=>UnattachedFieldError,
    "VARIABLE_CATEGORY_NAME",
    ()=>VARIABLE_CATEGORY_NAME,
    "VARIABLE_DYNAMIC_CATEGORY_NAME",
    ()=>VARIABLE_DYNAMIC_CATEGORY_NAME,
    "VERSION",
    ()=>VERSION,
    "VariableMap",
    ()=>VariableMap,
    "VariableModel",
    ()=>VariableModel,
    "Variables",
    ()=>Variables,
    "VariablesDynamic",
    ()=>VariablesDynamic,
    "VerticalFlyout",
    ()=>VerticalFlyout,
    "WidgetDiv",
    ()=>WidgetDiv,
    "Workspace",
    ()=>Workspace,
    "WorkspaceAudio",
    ()=>WorkspaceAudio,
    "WorkspaceDragger",
    ()=>WorkspaceDragger,
    "WorkspaceNavigationPolicy",
    ()=>WorkspaceNavigationPolicy,
    "WorkspaceSvg",
    ()=>WorkspaceSvg,
    "Xml",
    ()=>Xml,
    "ZoomControls",
    ()=>ZoomControls,
    "blockAnimations",
    ()=>blockAnimations,
    "blockRendering",
    ()=>blockRendering,
    "browserEvents",
    ()=>browserEvents,
    "bubbles",
    ()=>bubbles,
    "bumpObjects",
    ()=>bumpObjects,
    "clipboard",
    ()=>clipboard,
    "comments",
    ()=>comments,
    "common",
    ()=>common,
    "config",
    ()=>config,
    "constants",
    ()=>constants,
    "defineBlocksWithJsonArray",
    ()=>defineBlocksWithJsonArray,
    "dialog",
    ()=>dialog,
    "dragging",
    ()=>dragging,
    "fieldRegistry",
    ()=>fieldRegistry,
    "geras",
    ()=>geras,
    "getFocusManager",
    ()=>getFocusManager,
    "getMainWorkspace",
    ()=>getMainWorkspace,
    "getSelected",
    ()=>getSelected,
    "hasBubble",
    ()=>hasBubble,
    "hideChaff",
    ()=>hideChaff,
    "icons",
    ()=>icons,
    "inject",
    ()=>inject,
    "inputs",
    ()=>inputs,
    "isCopyable",
    ()=>isCopyable,
    "isDeletable",
    ()=>isDeletable,
    "isDraggable",
    ()=>isDraggable,
    "isIcon",
    ()=>isIcon,
    "isObservable",
    ()=>isObservable,
    "isPaster",
    ()=>isPaster,
    "isRenderedElement",
    ()=>isRenderedElement,
    "isSelectable",
    ()=>isSelectable,
    "isSerializable",
    ()=>isSerializable,
    "isVariableBackedParameterModel",
    ()=>isVariableBackedParameterModel,
    "keyboardNavigationController",
    ()=>keyboardNavigationController,
    "layers",
    ()=>layers,
    "navigateBlock",
    ()=>navigateBlock,
    "navigateStacks",
    ()=>navigateStacks,
    "procedures",
    ()=>procedures,
    "registry",
    ()=>registry,
    "renderManagement",
    ()=>renderManagement,
    "serialization",
    ()=>serialization,
    "setLocale",
    ()=>setLocale,
    "setParentContainer",
    ()=>setParentContainer,
    "svgResize",
    ()=>svgResize,
    "thrasos",
    ()=>thrasos,
    "uiPosition",
    ()=>uiPosition,
    "utils",
    ()=>utils,
    "zelos",
    ()=>zelos
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$blockly_compressed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/blockly_compressed.js [app-client] (ecmascript)");
;
const { Block, BlockFlyoutInflater, BlockNavigationPolicy, BlockSvg, Blocks, ButtonFlyoutInflater, COLLAPSED_FIELD_NAME, COLLAPSED_INPUT_NAME, COLLAPSE_CHARS, CodeGenerator, CollapsibleToolboxCategory, ComponentManager, Connection, ConnectionChecker, ConnectionDB, ConnectionNavigationPolicy, ConnectionType, ContextMenu, ContextMenuItems, ContextMenuRegistry, Css, DELETE_VARIABLE_ID, DeleteArea, DragTarget, DropDownDiv, Events, Extensions, Field, FieldCheckbox, FieldDropdown, FieldImage, FieldLabel, FieldLabelSerializable, FieldNavigationPolicy, FieldNumber, FieldTextInput, FieldVariable, Flyout, FlyoutButton, FlyoutButtonNavigationPolicy, FlyoutItem, FlyoutMetricsManager, FlyoutNavigationPolicy, FlyoutNavigator, FlyoutSeparator, FlyoutSeparatorNavigationPolicy, FocusManager, FocusableTreeTraverser, Generator, Gesture, Grid, HorizontalFlyout, INPUT_VALUE, Input, InsertionMarkerPreviewer, KeyboardNavigationController, LabelFlyoutInflater, LineCursor, Marker, MarkerManager, Menu, MenuItem, MetricsManager, Msg, NEXT_STATEMENT, Names, Navigator, OPPOSITE_TYPE, OUTPUT_VALUE, Options, PREVIOUS_STATEMENT, PROCEDURE_CATEGORY_NAME, Procedures, RENAME_VARIABLE_ID, RenderedConnection, Scrollbar, ScrollbarPair, SeparatorFlyoutInflater, ShortcutItems, ShortcutRegistry, TOOLBOX_AT_BOTTOM, TOOLBOX_AT_LEFT, TOOLBOX_AT_RIGHT, TOOLBOX_AT_TOP, Theme, ThemeManager, Themes, Toast, Toolbox, ToolboxCategory, ToolboxItem, ToolboxSeparator, Tooltip, Touch, Trashcan, UnattachedFieldError, VARIABLE_CATEGORY_NAME, VARIABLE_DYNAMIC_CATEGORY_NAME, VERSION, VariableMap, VariableModel, Variables, VariablesDynamic, VerticalFlyout, WidgetDiv, Workspace, WorkspaceAudio, WorkspaceDragger, WorkspaceNavigationPolicy, WorkspaceSvg, Xml, ZoomControls, blockAnimations, blockRendering, browserEvents, bubbles, bumpObjects, clipboard, comments, common, config, constants, defineBlocksWithJsonArray, dialog, dragging, fieldRegistry, geras, getFocusManager, getMainWorkspace, getSelected, hasBubble, hideChaff, icons, inject, inputs, isCopyable, isDeletable, isDraggable, isIcon, isObservable, isPaster, isRenderedElement, isSelectable, isSerializable, isVariableBackedParameterModel, keyboardNavigationController, layers, navigateBlock, navigateStacks, procedures, registry, renderManagement, serialization, setLocale, setParentContainer, svgResize, thrasos, uiPosition, utils, zelos } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$blockly_compressed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/javascript_compressed.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// Do not edit this file; automatically generated.
/* eslint-disable */ ;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(factory(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/blockly_compressed.js [app-client] (ecmascript)")));
    } else if ("TURBOPACK compile-time truthy", 1) {
        module.exports = factory(__turbopack_context__.r("[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/blockly_compressed.js [app-client] (ecmascript)"));
    } else //TURBOPACK unreachable
    ;
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(__parent__) {
    var $ = __parent__.__namespace__;
    var lists_create_empty$$module$build$src$generators$javascript$lists = function(a, b) {
        return [
            "[]",
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ];
    }, lists_create_with$$module$build$src$generators$javascript$lists = function(a, b) {
        const c = Array(a.itemCount_);
        for(let d = 0; d < a.itemCount_; d++)c[d] = b.valueToCode(a, "ADD" + d, Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "null";
        return [
            "[" + c.join(", ") + "]",
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ];
    }, lists_repeat$$module$build$src$generators$javascript$lists = function(a, b) {
        const c = b.provideFunction_("listsRepeat", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(value, n) {\n  var array = [];\n  for (var i = 0; i < n; i++) {\n    array[i] = value;\n  }\n  return array;\n}\n")), d = b.valueToCode(a, "ITEM", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "null";
        a = b.valueToCode(a, "NUM", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0";
        return [
            c + "(" + d + ", " + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, lists_length$$module$build$src$generators$javascript$lists = function(a, b) {
        return [
            (b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]") + ".length",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
        ];
    }, lists_isEmpty$$module$build$src$generators$javascript$lists = function(a, b) {
        return [
            "!" + (b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]") + ".length",
            Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT
        ];
    }, lists_indexOf$$module$build$src$generators$javascript$lists = function(a, b) {
        const c = a.getFieldValue("END") === "FIRST" ? "indexOf" : "lastIndexOf", d = b.valueToCode(a, "FIND", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        b = (b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]") + "." + c + "(" + d + ")";
        return a.workspace.options.oneBasedIndex ? [
            b + " + 1",
            Order$$module$build$src$generators$javascript$javascript_generator.ADDITION
        ] : [
            b,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, lists_getIndex$$module$build$src$generators$javascript$lists = function(a, b) {
        const c = a.getFieldValue("MODE") || "GET", d = a.getFieldValue("WHERE") || "FROM_START";
        var e = b.valueToCode(a, "VALUE", d === "RANDOM" ? Order$$module$build$src$generators$javascript$javascript_generator.NONE : Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]";
        switch(d){
            case "FIRST":
                if (c === "GET") return [
                    e + "[0]",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ];
                if (c === "GET_REMOVE") return [
                    e + ".shift()",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ];
                if (c === "REMOVE") return e + ".shift();\n";
                break;
            case "LAST":
                if (c === "GET") return [
                    e + ".slice(-1)[0]",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ];
                if (c === "GET_REMOVE") return [
                    e + ".pop()",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ];
                if (c === "REMOVE") return e + ".pop();\n";
                break;
            case "FROM_START":
                a = b.getAdjusted(a, "AT");
                if (c === "GET") return [
                    e + "[" + a + "]",
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ];
                if (c === "GET_REMOVE") return [
                    e + ".splice(" + a + ", 1)[0]",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
                if (c === "REMOVE") return e + ".splice(" + a + ", 1);\n";
                break;
            case "FROM_END":
                a = b.getAdjusted(a, "AT", 1, !0);
                if (c === "GET") return [
                    e + ".slice(" + a + ")[0]",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
                if (c === "GET_REMOVE") return [
                    e + ".splice(" + a + ", 1)[0]",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
                if (c === "REMOVE") return e + ".splice(" + a + ", 1);";
                break;
            case "RANDOM":
                e = b.provideFunction_("listsGetRandomItem", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(list, remove) {\n  var x = Math.floor(Math.random() * list.length);\n  if (remove) {\n    return list.splice(x, 1)[0];\n  } else {\n    return list[x];\n  }\n}\n")) + "(" + e + ", " + (c !== "GET") + ")";
                if (c === "GET" || c === "GET_REMOVE") return [
                    e,
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
                if (c === "REMOVE") return e + ";\n";
        }
        throw Error("Unhandled combination (lists_getIndex).");
    }, lists_setIndex$$module$build$src$generators$javascript$lists = function(a, b) {
        function c() {
            if (d.match(/^\w+$/)) return "";
            const h = b.nameDB_.getDistinctName("tmpList", $.NameType$$module$build$src$core$names.VARIABLE), k = "var " + h + " = " + d + ";\n";
            d = h;
            return k;
        }
        let d = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]";
        const e = a.getFieldValue("MODE") || "GET";
        var f = a.getFieldValue("WHERE") || "FROM_START";
        const g = b.valueToCode(a, "TO", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "null";
        switch(f){
            case "FIRST":
                if (e === "SET") return d + "[0] = " + g + ";\n";
                if (e === "INSERT") return d + ".unshift(" + g + ");\n";
                break;
            case "LAST":
                if (e === "SET") return c() + (d + "[" + d + ".length - 1] = " + g + ";\n");
                if (e === "INSERT") return d + ".push(" + g + ");\n";
                break;
            case "FROM_START":
                a = b.getAdjusted(a, "AT");
                if (e === "SET") return d + "[" + a + "] = " + g + ";\n";
                if (e === "INSERT") return d + ".splice(" + a + ", 0, " + g + ");\n";
                break;
            case "FROM_END":
                a = b.getAdjusted(a, "AT", 1, !1, Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION);
                f = c();
                if (e === "SET") return f + (d + "[" + d + ".length - " + a + "] = " + g + ";\n");
                if (e === "INSERT") return f + (d + ".splice(" + d + ".length - " + a + ", 0, " + g + ");\n");
                break;
            case "RANDOM":
                a = c();
                f = b.nameDB_.getDistinctName("tmpX", $.NameType$$module$build$src$core$names.VARIABLE);
                a += "var " + f + " = Math.floor(Math.random() * " + d + ".length);\n";
                if (e === "SET") return a + (d + "[" + f + "] = " + g + ";\n");
                if (e === "INSERT") return a + (d + ".splice(" + f + ", 0, " + g + ");\n");
        }
        throw Error("Unhandled combination (lists_setIndex).");
    }, lists_getSublist$$module$build$src$generators$javascript$lists = function(a, b) {
        var c = {
            FIRST: "First",
            LAST: "Last",
            FROM_START: "FromStart",
            FROM_END: "FromEnd"
        }, d = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]";
        const e = a.getFieldValue("WHERE1"), f = a.getFieldValue("WHERE2");
        if (e === "FIRST" && f === "LAST") d += ".slice(0)";
        else if (d.match(/^\w+$/) || e !== "FROM_END" && f === "FROM_START") {
            switch(e){
                case "FROM_START":
                    c = b.getAdjusted(a, "AT1");
                    break;
                case "FROM_END":
                    c = b.getAdjusted(a, "AT1", 1, !1, Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION);
                    c = d + ".length - " + c;
                    break;
                case "FIRST":
                    c = "0";
                    break;
                default:
                    throw Error("Unhandled option (lists_getSublist).");
            }
            switch(f){
                case "FROM_START":
                    b = b.getAdjusted(a, "AT2", 1);
                    break;
                case "FROM_END":
                    b = b.getAdjusted(a, "AT2", 0, !1, Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION);
                    b = d + ".length - " + b;
                    break;
                case "LAST":
                    b = d + ".length";
                    break;
                default:
                    throw Error("Unhandled option (lists_getSublist).");
            }
            d = d + ".slice(" + c + ", " + b + ")";
        } else {
            const g = b.getAdjusted(a, "AT1");
            a = b.getAdjusted(a, "AT2");
            d = b.provideFunction_("subsequence" + c[e] + c[f], "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(sequence").concat(e === "FROM_END" || e === "FROM_START" ? ", at1" : "").concat(f === "FROM_END" || f === "FROM_START" ? ", at2" : "", ") {\n  var start = ").concat(getSubstringIndex$$module$build$src$generators$javascript$lists("sequence", e, "at1"), ";\n  var end = ").concat(getSubstringIndex$$module$build$src$generators$javascript$lists("sequence", f, "at2"), " + 1;\n  return sequence.slice(start, end);\n}\n")) + "(" + d + (e === "FROM_END" || e === "FROM_START" ? ", " + g : "") + (f === "FROM_END" || f === "FROM_START" ? ", " + a : "") + ")";
        }
        return [
            d,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, lists_sort$$module$build$src$generators$javascript$lists = function(a, b) {
        const c = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL) || "[]", d = a.getFieldValue("DIRECTION") === "1" ? 1 : -1;
        a = a.getFieldValue("TYPE");
        b = b.provideFunction_("listsGetSortCompare", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(type, direction) {\n  var compareFuncs = {\n    'NUMERIC': function(a, b) {\n        return Number(a) - Number(b); },\n    'TEXT': function(a, b) {\n        return String(a) > String(b) ? 1 : -1; },\n    'IGNORE_CASE': function(a, b) {\n        return String(a).toLowerCase() > String(b).toLowerCase() ? 1 : -1; },\n  };\n  var compare = compareFuncs[type];\n  return function(a, b) { return compare(a, b) * direction; };\n}\n      "));
        return [
            c + ".slice().sort(" + b + '("' + a + '", ' + d + "))",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, lists_split$$module$build$src$generators$javascript$lists = function(a, b) {
        let c = b.valueToCode(a, "INPUT", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER);
        b = b.valueToCode(a, "DELIM", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        a = a.getFieldValue("MODE");
        if (a === "SPLIT") c || (c = "''"), a = "split";
        else if (a === "JOIN") c || (c = "[]"), a = "join";
        else throw Error("Unknown mode: " + a);
        return [
            c + "." + a + "(" + b + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, lists_reverse$$module$build$src$generators$javascript$lists = function(a, b) {
        return [
            (b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL) || "[]") + ".slice().reverse()",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, controls_if$$module$build$src$generators$javascript$logic = function(a, b) {
        var c = 0;
        let d = "";
        b.STATEMENT_PREFIX && (d += b.injectId(b.STATEMENT_PREFIX, a));
        do {
            const e = b.valueToCode(a, "IF" + c, Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "false";
            let f = b.statementToCode(a, "DO" + c);
            b.STATEMENT_SUFFIX && (f = b.prefixLines(b.injectId(b.STATEMENT_SUFFIX, a), b.INDENT) + f);
            d += (c > 0 ? " else " : "") + "if (" + e + ") {\n" + f + "}";
            c++;
        }while (a.getInput("IF" + c))
        if (a.getInput("ELSE") || b.STATEMENT_SUFFIX) c = a.getInput("ELSE") ? b.statementToCode(a, "ELSE") : "", b.STATEMENT_SUFFIX && (c = b.prefixLines(b.injectId(b.STATEMENT_SUFFIX, a), b.INDENT) + c), d += " else {\n" + c + "}";
        return d + "\n";
    }, logic_compare$$module$build$src$generators$javascript$logic = function(a, b) {
        const c = {
            EQ: "==",
            NEQ: "!=",
            LT: "<",
            LTE: "<=",
            GT: ">",
            GTE: ">="
        }[a.getFieldValue("OP")], d = c === "==" || c === "!=" ? Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY : Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL, e = b.valueToCode(a, "A", d) || "0";
        a = b.valueToCode(a, "B", d) || "0";
        return [
            e + " " + c + " " + a,
            d
        ];
    }, logic_operation$$module$build$src$generators$javascript$logic = function(a, b) {
        const c = a.getFieldValue("OP") === "AND" ? "&&" : "||", d = c === "&&" ? Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_AND : Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_OR;
        let e = b.valueToCode(a, "A", d);
        a = b.valueToCode(a, "B", d);
        e || a ? (b = c === "&&" ? "true" : "false", e || (e = b), a || (a = b)) : a = e = "false";
        return [
            e + " " + c + " " + a,
            d
        ];
    }, logic_negate$$module$build$src$generators$javascript$logic = function(a, b) {
        const c = Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT;
        return [
            "!" + (b.valueToCode(a, "BOOL", c) || "true"),
            c
        ];
    }, logic_boolean$$module$build$src$generators$javascript$logic = function(a, b) {
        return [
            a.getFieldValue("BOOL") === "TRUE" ? "true" : "false",
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ];
    }, logic_null$$module$build$src$generators$javascript$logic = function(a, b) {
        return [
            "null",
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ];
    }, logic_ternary$$module$build$src$generators$javascript$logic = function(a, b) {
        const c = b.valueToCode(a, "IF", Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL) || "false", d = b.valueToCode(a, "THEN", Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL) || "null";
        a = b.valueToCode(a, "ELSE", Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL) || "null";
        return [
            c + " ? " + d + " : " + a,
            Order$$module$build$src$generators$javascript$javascript_generator.CONDITIONAL
        ];
    }, controls_repeat_ext$$module$build$src$generators$javascript$loops = function(a, b) {
        let c;
        c = a.getField("TIMES") ? String(Number(a.getFieldValue("TIMES"))) : b.valueToCode(a, "TIMES", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "0";
        let d = b.statementToCode(a, "DO");
        d = b.addLoopTrap(d, a);
        a = "";
        const e = b.nameDB_.getDistinctName("count", $.NameType$$module$build$src$core$names.VARIABLE);
        let f = c;
        c.match(/^\w+$/) || $.isNumber$$module$build$src$core$utils$string(c) || (f = b.nameDB_.getDistinctName("repeat_end", $.NameType$$module$build$src$core$names.VARIABLE), a += "var " + f + " = " + c + ";\n");
        return a + ("for (var " + e + " = 0; " + e + " < " + f + "; " + e + "++) {\n" + d + "}\n");
    }, controls_whileUntil$$module$build$src$generators$javascript$loops = function(a, b) {
        const c = a.getFieldValue("MODE") === "UNTIL";
        let d = b.valueToCode(a, "BOOL", c ? Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT : Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "false", e = b.statementToCode(a, "DO");
        e = b.addLoopTrap(e, a);
        c && (d = "!" + d);
        return "while (" + d + ") {\n" + e + "}\n";
    }, controls_for$$module$build$src$generators$javascript$loops = function(a, b) {
        var c = b.getVariableName(a.getFieldValue("VAR")), d = b.valueToCode(a, "FROM", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "0", e = b.valueToCode(a, "TO", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "0";
        const f = b.valueToCode(a, "BY", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "1";
        let g = b.statementToCode(a, "DO");
        g = b.addLoopTrap(g, a);
        if ($.isNumber$$module$build$src$core$utils$string(d) && $.isNumber$$module$build$src$core$utils$string(e) && $.isNumber$$module$build$src$core$utils$string(f)) b = Number(d) <= Number(e), a = "for (" + c + " = " + d + "; " + c + (b ? " <= " : " >= ") + e + "; " + c, c = Math.abs(Number(f)), a = c === 1 ? a + (b ? "++" : "--") : a + ((b ? " += " : " -= ") + c), a += ") {\n" + g + "}\n";
        else {
            a = "";
            let h = d;
            d.match(/^\w+$/) || $.isNumber$$module$build$src$core$utils$string(d) || (h = b.nameDB_.getDistinctName(c + "_start", $.NameType$$module$build$src$core$names.VARIABLE), a += "var " + h + " = " + d + ";\n");
            d = e;
            e.match(/^\w+$/) || $.isNumber$$module$build$src$core$utils$string(e) || (d = b.nameDB_.getDistinctName(c + "_end", $.NameType$$module$build$src$core$names.VARIABLE), a += "var " + d + " = " + e + ";\n");
            e = b.nameDB_.getDistinctName(c + "_inc", $.NameType$$module$build$src$core$names.VARIABLE);
            a += "var " + e + " = ";
            a = $.isNumber$$module$build$src$core$utils$string(f) ? a + (Math.abs(Number(f)) + ";\n") : a + ("Math.abs(" + f + ");\n");
            a += "if (" + h + " > " + d + ") {\n";
            a += b.INDENT + e + " = -" + e + ";\n";
            a = a + "}\nfor (" + (c + " = " + h + "; " + e + " >= 0 ? " + c + " <= " + d + " : " + c + " >= " + d + "; " + c + " += " + e + ") {\n" + g + "}\n");
        }
        return a;
    }, controls_forEach$$module$build$src$generators$javascript$loops = function(a, b) {
        const c = b.getVariableName(a.getFieldValue("VAR"));
        var d = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "[]";
        let e = b.statementToCode(a, "DO");
        e = b.addLoopTrap(e, a);
        a = "";
        let f = d;
        d.match(/^\w+$/) || (f = b.nameDB_.getDistinctName(c + "_list", $.NameType$$module$build$src$core$names.VARIABLE), a += "var " + f + " = " + d + ";\n");
        d = b.nameDB_.getDistinctName(c + "_index", $.NameType$$module$build$src$core$names.VARIABLE);
        e = b.INDENT + c + " = " + f + "[" + d + "];\n" + e;
        return a + ("for (var " + d + " in " + f + ") {\n" + e + "}\n");
    }, controls_flow_statements$$module$build$src$generators$javascript$loops = function(a, b) {
        let c = "";
        b.STATEMENT_PREFIX && (c += b.injectId(b.STATEMENT_PREFIX, a));
        b.STATEMENT_SUFFIX && (c += b.injectId(b.STATEMENT_SUFFIX, a));
        if (b.STATEMENT_PREFIX) {
            const d = a.getSurroundLoop();
            d && !d.suppressPrefixSuffix && (c += b.injectId(b.STATEMENT_PREFIX, d));
        }
        switch(a.getFieldValue("FLOW")){
            case "BREAK":
                return c + "break;\n";
            case "CONTINUE":
                return c + "continue;\n";
        }
        throw Error("Unknown flow statement.");
    }, math_number$$module$build$src$generators$javascript$math = function(a, b) {
        a = Number(a.getFieldValue("NUM"));
        return [
            String(a),
            a >= 0 ? Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC : Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION
        ];
    }, math_arithmetic$$module$build$src$generators$javascript$math = function(a, b) {
        var c = {
            ADD: [
                " + ",
                Order$$module$build$src$generators$javascript$javascript_generator.ADDITION
            ],
            MINUS: [
                " - ",
                Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION
            ],
            MULTIPLY: [
                " * ",
                Order$$module$build$src$generators$javascript$javascript_generator.MULTIPLICATION
            ],
            DIVIDE: [
                " / ",
                Order$$module$build$src$generators$javascript$javascript_generator.DIVISION
            ],
            POWER: [
                null,
                Order$$module$build$src$generators$javascript$javascript_generator.NONE
            ]
        }[a.getFieldValue("OP")];
        const d = c[0];
        c = c[1];
        const e = b.valueToCode(a, "A", c) || "0";
        a = b.valueToCode(a, "B", c) || "0";
        return d ? [
            e + d + a,
            c
        ] : [
            "Math.pow(" + e + ", " + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, math_single$$module$build$src$generators$javascript$math = function(a, b) {
        const c = a.getFieldValue("OP");
        let d;
        if (c === "NEG") return a = b.valueToCode(a, "NUM", Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION) || "0", a[0] === "-" && (a = " " + a), [
            "-" + a,
            Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION
        ];
        a = c === "SIN" || c === "COS" || c === "TAN" ? b.valueToCode(a, "NUM", Order$$module$build$src$generators$javascript$javascript_generator.DIVISION) || "0" : b.valueToCode(a, "NUM", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0";
        switch(c){
            case "ABS":
                d = "Math.abs(" + a + ")";
                break;
            case "ROOT":
                d = "Math.sqrt(" + a + ")";
                break;
            case "LN":
                d = "Math.log(" + a + ")";
                break;
            case "EXP":
                d = "Math.exp(" + a + ")";
                break;
            case "POW10":
                d = "Math.pow(10," + a + ")";
                break;
            case "ROUND":
                d = "Math.round(" + a + ")";
                break;
            case "ROUNDUP":
                d = "Math.ceil(" + a + ")";
                break;
            case "ROUNDDOWN":
                d = "Math.floor(" + a + ")";
                break;
            case "SIN":
                d = "Math.sin(" + a + " / 180 * Math.PI)";
                break;
            case "COS":
                d = "Math.cos(" + a + " / 180 * Math.PI)";
                break;
            case "TAN":
                d = "Math.tan(" + a + " / 180 * Math.PI)";
        }
        if (d) return [
            d,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
        switch(c){
            case "LOG10":
                d = "Math.log(" + a + ") / Math.log(10)";
                break;
            case "ASIN":
                d = "Math.asin(" + a + ") / Math.PI * 180";
                break;
            case "ACOS":
                d = "Math.acos(" + a + ") / Math.PI * 180";
                break;
            case "ATAN":
                d = "Math.atan(" + a + ") / Math.PI * 180";
                break;
            default:
                throw Error("Unknown math operator: " + c);
        }
        return [
            d,
            Order$$module$build$src$generators$javascript$javascript_generator.DIVISION
        ];
    }, math_constant$$module$build$src$generators$javascript$math = function(a, b) {
        return ({
            PI: [
                "Math.PI",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
            ],
            E: [
                "Math.E",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
            ],
            GOLDEN_RATIO: [
                "(1 + Math.sqrt(5)) / 2",
                Order$$module$build$src$generators$javascript$javascript_generator.DIVISION
            ],
            SQRT2: [
                "Math.SQRT2",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
            ],
            SQRT1_2: [
                "Math.SQRT1_2",
                Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
            ],
            INFINITY: [
                "Infinity",
                Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
            ]
        })[a.getFieldValue("CONSTANT")];
    }, math_number_property$$module$build$src$generators$javascript$math = function(a, b) {
        var c = {
            EVEN: [
                " % 2 === 0",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY
            ],
            ODD: [
                " % 2 === 1",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY
            ],
            WHOLE: [
                " % 1 === 0",
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY
            ],
            POSITIVE: [
                " > 0",
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL
            ],
            NEGATIVE: [
                " < 0",
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL,
                Order$$module$build$src$generators$javascript$javascript_generator.RELATIONAL
            ],
            DIVISIBLE_BY: [
                null,
                Order$$module$build$src$generators$javascript$javascript_generator.MODULUS,
                Order$$module$build$src$generators$javascript$javascript_generator.EQUALITY
            ],
            PRIME: [
                null,
                Order$$module$build$src$generators$javascript$javascript_generator.NONE,
                Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
            ]
        };
        const d = a.getFieldValue("PROPERTY"), [e, f, g] = c[d];
        c = b.valueToCode(a, "NUMBER_TO_CHECK", f) || "0";
        d === "PRIME" ? a = b.provideFunction_("mathIsPrime", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(n) {\n  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods\n  if (n == 2 || n == 3) {\n    return true;\n  }\n  // False if n is NaN, negative, is 1, or not whole.\n  // And false if n is divisible by 2 or 3.\n  if (isNaN(n) || n <= 1 || n % 1 !== 0 || n % 2 === 0 || n % 3 === 0) {\n    return false;\n  }\n  // Check all the numbers of form 6k +/- 1, up to sqrt(n).\n  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {\n    if (n % (x - 1) === 0 || n % (x + 1) === 0) {\n      return false;\n    }\n  }\n  return true;\n}\n")) + "(" + c + ")" : d === "DIVISIBLE_BY" ? (a = b.valueToCode(a, "DIVISOR", Order$$module$build$src$generators$javascript$javascript_generator.MODULUS) || "0", a = c + " % " + a + " === 0") : a = c + e;
        return [
            a,
            g
        ];
    }, math_change$$module$build$src$generators$javascript$math = function(a, b) {
        const c = b.valueToCode(a, "DELTA", Order$$module$build$src$generators$javascript$javascript_generator.ADDITION) || "0";
        a = b.getVariableName(a.getFieldValue("VAR"));
        return a + " = (typeof " + a + " === 'number' ? " + a + " : 0) + " + c + ";\n";
    }, math_on_list$$module$build$src$generators$javascript$math = function(a, b) {
        var c = a.getFieldValue("OP");
        switch(c){
            case "SUM":
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "[]";
                a += ".reduce(function(x, y) {return x + y;}, 0)";
                break;
            case "MIN":
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = "Math.min.apply(null, " + a + ")";
                break;
            case "MAX":
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = "Math.max.apply(null, " + a + ")";
                break;
            case "AVERAGE":
                c = b.provideFunction_("mathMean", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(myList) {\n  return myList.reduce(function(x, y) {return x + y;}, 0) / myList.length;\n}\n"));
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = c + "(" + a + ")";
                break;
            case "MEDIAN":
                c = b.provideFunction_("mathMedian", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(myList) {\n  var localList = myList.filter(function (x) {return typeof x === 'number';});\n  if (!localList.length) return null;\n  localList.sort(function(a, b) {return b - a;});\n  if (localList.length % 2 === 0) {\n    return (localList[localList.length / 2 - 1] + localList[localList.length / 2]) / 2;\n  } else {\n    return localList[(localList.length - 1) / 2];\n  }\n}\n"));
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = c + "(" + a + ")";
                break;
            case "MODE":
                c = b.provideFunction_("mathModes", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(values) {\n  var modes = [];\n  var counts = [];\n  var maxCount = 0;\n  for (var i = 0; i < values.length; i++) {\n    var value = values[i];\n    var found = false;\n    var thisCount;\n    for (var j = 0; j < counts.length; j++) {\n      if (counts[j][0] === value) {\n        thisCount = ++counts[j][1];\n        found = true;\n        break;\n      }\n    }\n    if (!found) {\n      counts.push([value, 1]);\n      thisCount = 1;\n    }\n    maxCount = Math.max(thisCount, maxCount);\n  }\n  for (var j = 0; j < counts.length; j++) {\n    if (counts[j][1] === maxCount) {\n      modes.push(counts[j][0]);\n    }\n  }\n  return modes;\n}\n"));
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = c + "(" + a + ")";
                break;
            case "STD_DEV":
                c = b.provideFunction_("mathStandardDeviation", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(numbers) {\n  var n = numbers.length;\n  if (!n) return null;\n  var mean = numbers.reduce(function(x, y) {return x + y;}) / n;\n  var variance = 0;\n  for (var j = 0; j < n; j++) {\n    variance += Math.pow(numbers[j] - mean, 2);\n  }\n  variance /= n;\n  return Math.sqrt(variance);\n}\n"));
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = c + "(" + a + ")";
                break;
            case "RANDOM":
                c = b.provideFunction_("mathRandomList", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(list) {\n  var x = Math.floor(Math.random() * list.length);\n  return list[x];\n}\n"));
                a = b.valueToCode(a, "LIST", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "[]";
                a = c + "(" + a + ")";
                break;
            default:
                throw Error("Unknown operator: " + c);
        }
        return [
            a,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, math_modulo$$module$build$src$generators$javascript$math = function(a, b) {
        const c = b.valueToCode(a, "DIVIDEND", Order$$module$build$src$generators$javascript$javascript_generator.MODULUS) || "0";
        a = b.valueToCode(a, "DIVISOR", Order$$module$build$src$generators$javascript$javascript_generator.MODULUS) || "0";
        return [
            c + " % " + a,
            Order$$module$build$src$generators$javascript$javascript_generator.MODULUS
        ];
    }, math_constrain$$module$build$src$generators$javascript$math = function(a, b) {
        const c = b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0", d = b.valueToCode(a, "LOW", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0";
        a = b.valueToCode(a, "HIGH", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "Infinity";
        return [
            "Math.min(Math.max(" + c + ", " + d + "), " + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, math_random_int$$module$build$src$generators$javascript$math = function(a, b) {
        const c = b.valueToCode(a, "FROM", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0";
        a = b.valueToCode(a, "TO", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0";
        return [
            b.provideFunction_("mathRandomInt", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(a, b) {\n  if (a > b) {\n    // Swap a and b to ensure a is smaller.\n    var c = a;\n    a = b;\n    b = c;\n  }\n  return Math.floor(Math.random() * (b - a + 1) + a);\n}\n")) + "(" + c + ", " + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, math_random_float$$module$build$src$generators$javascript$math = function(a, b) {
        return [
            "Math.random()",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, math_atan2$$module$build$src$generators$javascript$math = function(a, b) {
        const c = b.valueToCode(a, "X", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0";
        return [
            "Math.atan2(" + (b.valueToCode(a, "Y", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "0") + ", " + c + ") / Math.PI * 180",
            Order$$module$build$src$generators$javascript$javascript_generator.DIVISION
        ];
    }, procedures_defreturn$$module$build$src$generators$javascript$procedures = function(a, b) {
        const c = b.getProcedureName(a.getFieldValue("NAME"));
        var d = "";
        b.STATEMENT_PREFIX && (d += b.injectId(b.STATEMENT_PREFIX, a));
        b.STATEMENT_SUFFIX && (d += b.injectId(b.STATEMENT_SUFFIX, a));
        d && (d = b.prefixLines(d, b.INDENT));
        let e = "";
        b.INFINITE_LOOP_TRAP && (e = b.prefixLines(b.injectId(b.INFINITE_LOOP_TRAP, a), b.INDENT));
        let f = "";
        a.getInput("STACK") && (f = b.statementToCode(a, "STACK"));
        let g = "";
        a.getInput("RETURN") && (g = b.valueToCode(a, "RETURN", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "");
        let h = "";
        f && g && (h = d);
        g && (g = b.INDENT + "return " + g + ";\n");
        const k = [], l = a.getVars();
        for(let m = 0; m < l.length; m++)k[m] = b.getVariableName(l[m]);
        d = "function " + c + "(" + k.join(", ") + ") {\n" + d + e + f + h + g + "}";
        d = b.scrub_(a, d);
        b.definitions_["%" + c] = d;
        return null;
    }, procedures_callreturn$$module$build$src$generators$javascript$procedures = function(a, b) {
        const c = b.getProcedureName(a.getFieldValue("NAME")), d = [], e = a.getVars();
        for(let f = 0; f < e.length; f++)d[f] = b.valueToCode(a, "ARG" + f, Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "null";
        return [
            c + "(" + d.join(", ") + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, procedures_callnoreturn$$module$build$src$generators$javascript$procedures = function(a, b) {
        return b.forBlock.procedures_callreturn(a, b)[0] + ";\n";
    }, procedures_ifreturn$$module$build$src$generators$javascript$procedures = function(a, b) {
        let c = "if (" + (b.valueToCode(a, "CONDITION", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "false") + ") {\n";
        b.STATEMENT_SUFFIX && (c += b.prefixLines(b.injectId(b.STATEMENT_SUFFIX, a), b.INDENT));
        a.hasReturnValue_ ? (a = b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "null", c += b.INDENT + "return " + a + ";\n") : c += b.INDENT + "return;\n";
        return c + "}\n";
    }, text$$module$build$src$generators$javascript$text = function(a, b) {
        return [
            b.quote_(a.getFieldValue("TEXT")),
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ];
    }, text_join$$module$build$src$generators$javascript$text = function(a, b) {
        switch(a.itemCount_){
            case 0:
                return [
                    "''",
                    Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
                ];
            case 1:
                return a = b.valueToCode(a, "ADD0", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''", forceString$$module$build$src$generators$javascript$text(a);
            case 2:
                var c = b.valueToCode(a, "ADD0", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
                a = b.valueToCode(a, "ADD1", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
                return [
                    forceString$$module$build$src$generators$javascript$text(c)[0] + " + " + forceString$$module$build$src$generators$javascript$text(a)[0],
                    Order$$module$build$src$generators$javascript$javascript_generator.ADDITION
                ];
            default:
                c = Array(a.itemCount_);
                for(let d = 0; d < a.itemCount_; d++)c[d] = b.valueToCode(a, "ADD" + d, Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
                return [
                    "[" + c.join(",") + "].join('')",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
        }
    }, text_append$$module$build$src$generators$javascript$text = function(a, b) {
        const c = b.getVariableName(a.getFieldValue("VAR"));
        a = b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        return c + " += " + forceString$$module$build$src$generators$javascript$text(a)[0] + ";\n";
    }, text_length$$module$build$src$generators$javascript$text = function(a, b) {
        return [
            (b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "''") + ".length",
            Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
        ];
    }, text_isEmpty$$module$build$src$generators$javascript$text = function(a, b) {
        return [
            "!" + (b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "''") + ".length",
            Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT
        ];
    }, text_indexOf$$module$build$src$generators$javascript$text = function(a, b) {
        const c = a.getFieldValue("END") === "FIRST" ? "indexOf" : "lastIndexOf", d = b.valueToCode(a, "FIND", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        b = (b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "''") + "." + c + "(" + d + ")";
        return a.workspace.options.oneBasedIndex ? [
            b + " + 1",
            Order$$module$build$src$generators$javascript$javascript_generator.ADDITION
        ] : [
            b,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_charAt$$module$build$src$generators$javascript$text = function(a, b) {
        const c = a.getFieldValue("WHERE") || "FROM_START", d = b.valueToCode(a, "VALUE", c === "RANDOM" ? Order$$module$build$src$generators$javascript$javascript_generator.NONE : Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "''";
        switch(c){
            case "FIRST":
                return [
                    d + ".charAt(0)",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
            case "LAST":
                return [
                    d + ".slice(-1)",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
            case "FROM_START":
                return a = b.getAdjusted(a, "AT"), [
                    d + ".charAt(" + a + ")",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
            case "FROM_END":
                return a = b.getAdjusted(a, "AT", 1, !0), [
                    d + ".slice(" + a + ").charAt(0)",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
            case "RANDOM":
                return [
                    b.provideFunction_("textRandomLetter", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(text) {\n  var x = Math.floor(Math.random() * text.length);\n  return text[x];\n}\n")) + "(" + d + ")",
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ];
        }
        throw Error("Unhandled option (text_charAt).");
    }, text_getSubstring$$module$build$src$generators$javascript$text = function(a, b) {
        var c = {
            FIRST: "First",
            LAST: "Last",
            FROM_START: "FromStart",
            FROM_END: "FromEnd"
        };
        const d = a.getFieldValue("WHERE1"), e = a.getFieldValue("WHERE2");
        var f = d !== "FROM_END" && d !== "LAST" && e !== "FROM_END" && e !== "LAST", g = b.valueToCode(a, "STRING", f ? Order$$module$build$src$generators$javascript$javascript_generator.MEMBER : Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        if (d === "FIRST" && e === "LAST") return [
            g,
            Order$$module$build$src$generators$javascript$javascript_generator.NONE
        ];
        if (g.match(/^'?\w+'?$/) || f) {
            switch(d){
                case "FROM_START":
                    c = b.getAdjusted(a, "AT1");
                    break;
                case "FROM_END":
                    c = b.getAdjusted(a, "AT1", 1, !1, Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION);
                    c = g + ".length - " + c;
                    break;
                case "FIRST":
                    c = "0";
                    break;
                default:
                    throw Error("Unhandled option (text_getSubstring).");
            }
            switch(e){
                case "FROM_START":
                    b = b.getAdjusted(a, "AT2", 1);
                    break;
                case "FROM_END":
                    b = b.getAdjusted(a, "AT2", 0, !1, Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION);
                    b = g + ".length - " + b;
                    break;
                case "LAST":
                    b = g + ".length";
                    break;
                default:
                    throw Error("Unhandled option (text_getSubstring).");
            }
            g = g + ".slice(" + c + ", " + b + ")";
        } else f = b.getAdjusted(a, "AT1"), a = b.getAdjusted(a, "AT2"), g = b.provideFunction_("subsequence" + c[d] + c[e], "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(sequence").concat(d === "FROM_END" || d === "FROM_START" ? ", at1" : "").concat(e === "FROM_END" || e === "FROM_START" ? ", at2" : "", ") {\n  var start = ").concat(getSubstringIndex$$module$build$src$generators$javascript$text("sequence", d, "at1"), ";\n  var end = ").concat(getSubstringIndex$$module$build$src$generators$javascript$text("sequence", e, "at2"), " + 1;\n  return sequence.slice(start, end);\n}\n")) + "(" + g + (d === "FROM_END" || d === "FROM_START" ? ", " + f : "") + (e === "FROM_END" || e === "FROM_START" ? ", " + a : "") + ")";
        return [
            g,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_changeCase$$module$build$src$generators$javascript$text = function(a, b) {
        const c = {
            UPPERCASE: ".toUpperCase()",
            LOWERCASE: ".toLowerCase()",
            TITLECASE: null
        }[a.getFieldValue("CASE")];
        a = b.valueToCode(a, "TEXT", c ? Order$$module$build$src$generators$javascript$javascript_generator.MEMBER : Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        return [
            c ? a + c : b.provideFunction_("textToTitleCase", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(str) {\n  return str.replace(/\\S+/g,\n      function(txt) {return txt[0].toUpperCase() + txt.substring(1).toLowerCase();});\n}\n")) + "(" + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_trim$$module$build$src$generators$javascript$text = function(a, b) {
        const c = {
            LEFT: ".replace(/^[\\s\\xa0]+/, '')",
            RIGHT: ".replace(/[\\s\\xa0]+$/, '')",
            BOTH: ".trim()"
        }[a.getFieldValue("MODE")];
        return [
            (b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "''") + c,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_print$$module$build$src$generators$javascript$text = function(a, b) {
        return "window.alert(" + (b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''") + ");\n";
    }, text_prompt_ext$$module$build$src$generators$javascript$text = function(a, b) {
        b = "window.prompt(" + (a.getField("TEXT") ? b.quote_(a.getFieldValue("TEXT")) : b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''") + ")";
        a.getFieldValue("TYPE") === "NUMBER" && (b = "Number(" + b + ")");
        return [
            b,
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_count$$module$build$src$generators$javascript$text = function(a, b) {
        const c = b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        a = b.valueToCode(a, "SUB", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        return [
            b.provideFunction_("textCount", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(haystack, needle) {\n  if (needle.length === 0) {\n    return haystack.length + 1;\n  } else {\n    return haystack.split(needle).length - 1;\n  }\n}\n")) + "(" + c + ", " + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_replace$$module$build$src$generators$javascript$text = function(a, b) {
        const c = b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''", d = b.valueToCode(a, "FROM", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        a = b.valueToCode(a, "TO", Order$$module$build$src$generators$javascript$javascript_generator.NONE) || "''";
        return [
            b.provideFunction_("textReplace", "\nfunction ".concat(b.FUNCTION_NAME_PLACEHOLDER_, "(haystack, needle, replacement) {\n  needle = needle.replace(/([-()\\[\\]{}+?*.$\\^|,:#<!\\\\])/g, '\\\\$1')\n                 .replace(/\\x08/g, '\\\\x08');\n  return haystack.replace(new RegExp(needle, 'g'), replacement);\n}\n")) + "(" + c + ", " + d + ", " + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, text_reverse$$module$build$src$generators$javascript$text = function(a, b) {
        return [
            (b.valueToCode(a, "TEXT", Order$$module$build$src$generators$javascript$javascript_generator.MEMBER) || "''") + ".split('').reverse().join('')",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, variables_get$$module$build$src$generators$javascript$variables = function(a, b) {
        return [
            b.getVariableName(a.getFieldValue("VAR")),
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ];
    }, variables_set$$module$build$src$generators$javascript$variables = function(a, b) {
        const c = b.valueToCode(a, "VALUE", Order$$module$build$src$generators$javascript$javascript_generator.ASSIGNMENT) || "0";
        return b.getVariableName(a.getFieldValue("VAR")) + " = " + c + ";\n";
    }, Order$$module$build$src$generators$javascript$javascript_generator;
    (function(a) {
        a[a.ATOMIC = 0] = "ATOMIC";
        a[a.NEW = 1.1] = "NEW";
        a[a.MEMBER = 1.2] = "MEMBER";
        a[a.FUNCTION_CALL = 2] = "FUNCTION_CALL";
        a[a.INCREMENT = 3] = "INCREMENT";
        a[a.DECREMENT = 3] = "DECREMENT";
        a[a.BITWISE_NOT = 4.1] = "BITWISE_NOT";
        a[a.UNARY_PLUS = 4.2] = "UNARY_PLUS";
        a[a.UNARY_NEGATION = 4.3] = "UNARY_NEGATION";
        a[a.LOGICAL_NOT = 4.4] = "LOGICAL_NOT";
        a[a.TYPEOF = 4.5] = "TYPEOF";
        a[a.VOID = 4.6] = "VOID";
        a[a.DELETE = 4.7] = "DELETE";
        a[a.AWAIT = 4.8] = "AWAIT";
        a[a.EXPONENTIATION = 5] = "EXPONENTIATION";
        a[a.MULTIPLICATION = 5.1] = "MULTIPLICATION";
        a[a.DIVISION = 5.2] = "DIVISION";
        a[a.MODULUS = 5.3] = "MODULUS";
        a[a.SUBTRACTION = 6.1] = "SUBTRACTION";
        a[a.ADDITION = 6.2] = "ADDITION";
        a[a.BITWISE_SHIFT = 7] = "BITWISE_SHIFT";
        a[a.RELATIONAL = 8] = "RELATIONAL";
        a[a.IN = 8] = "IN";
        a[a.INSTANCEOF = 8] = "INSTANCEOF";
        a[a.EQUALITY = 9] = "EQUALITY";
        a[a.BITWISE_AND = 10] = "BITWISE_AND";
        a[a.BITWISE_XOR = 11] = "BITWISE_XOR";
        a[a.BITWISE_OR = 12] = "BITWISE_OR";
        a[a.LOGICAL_AND = 13] = "LOGICAL_AND";
        a[a.LOGICAL_OR = 14] = "LOGICAL_OR";
        a[a.CONDITIONAL = 15] = "CONDITIONAL";
        a[a.ASSIGNMENT = 16] = "ASSIGNMENT";
        a[a.YIELD = 17] = "YIELD";
        a[a.COMMA = 18] = "COMMA";
        a[a.NONE = 99] = "NONE";
    })(Order$$module$build$src$generators$javascript$javascript_generator || (Order$$module$build$src$generators$javascript$javascript_generator = {}));
    var JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator = class extends $.CodeGenerator$$module$build$src$core$generator {
        init(a) {
            super.init(a);
            this.nameDB_ ? this.nameDB_.reset() : this.nameDB_ = new $.Names$$module$build$src$core$names(this.RESERVED_WORDS_);
            this.nameDB_.setVariableMap(a.getVariableMap());
            this.nameDB_.populateVariables(a);
            this.nameDB_.populateProcedures(a);
            const b = [];
            var c = $.allDeveloperVariables$$module$build$src$core$variables(a);
            for(let d = 0; d < c.length; d++)b.push(this.nameDB_.getName(c[d], $.NameType$$module$build$src$core$names.DEVELOPER_VARIABLE));
            a = $.allUsedVarModels$$module$build$src$core$variables(a);
            for(c = 0; c < a.length; c++)b.push(this.nameDB_.getName(a[c].getId(), $.NameType$$module$build$src$core$names.VARIABLE));
            b.length && (this.definitions_.variables = "var " + b.join(", ") + ";");
            this.isInitialized = !0;
        }
        finish(a) {
            const b = Object.values(this.definitions_);
            super.finish(a);
            this.isInitialized = !1;
            this.nameDB_.reset();
            return b.join("\n\n") + "\n\n\n" + a;
        }
        scrubNakedValue(a) {
            return a + ";\n";
        }
        quote_(a) {
            a = a.replace(/\\/g, "\\\\").replace(/\n/g, "\\\n").replace(/'/g, "\\'");
            return "'" + a + "'";
        }
        multiline_quote_(a) {
            return a.split(/\n/g).map(this.quote_).join(" + '\\n' +\n");
        }
        scrub_(a, b) {
            let c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            let d = "";
            if (!a.outputConnection || !a.outputConnection.targetConnection) {
                var e = a.getCommentText();
                e && (e = $.wrap$$module$build$src$core$utils$string(e, this.COMMENT_WRAP - 3), d += this.prefixLines(e + "\n", "// "));
                for(let f = 0; f < a.inputList.length; f++)a.inputList[f].type === $.inputTypes$$module$build$src$core$inputs$input_types.VALUE && (e = a.inputList[f].connection.targetBlock()) && (e = this.allNestedComments(e)) && (d += this.prefixLines(e, "// "));
            }
            a = a.nextConnection && a.nextConnection.targetBlock();
            c = c ? "" : this.blockToCode(a);
            return d + b + c;
        }
        getAdjusted(a, b) {
            let c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, d = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, e = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : Order$$module$build$src$generators$javascript$javascript_generator.NONE;
            a.workspace.options.oneBasedIndex && c--;
            const f = a.workspace.options.oneBasedIndex ? "1" : "0";
            let g = e;
            c > 0 ? g = Order$$module$build$src$generators$javascript$javascript_generator.ADDITION : c < 0 ? g = Order$$module$build$src$generators$javascript$javascript_generator.SUBTRACTION : d && (g = Order$$module$build$src$generators$javascript$javascript_generator.UNARY_NEGATION);
            a = this.valueToCode(a, b, g) || f;
            if (c === 0 && !d) return a;
            if ($.isNumber$$module$build$src$core$utils$string(a)) return a = String(Number(a) + c), d && (a = String(-Number(a))), a;
            c > 0 ? a = "".concat(a, " + ").concat(c) : c < 0 && (a = "".concat(a, " - ").concat(-c));
            d && (a = c ? "-(".concat(a, ")") : "-".concat(a));
            Math.floor(e) >= Math.floor(g) && (a = "(".concat(a, ")"));
            return a;
        }
        constructor(a = "JavaScript"){
            super(a);
            this.ORDER_OVERRIDES = [
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL,
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.MEMBER,
                    Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT,
                    Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_NOT
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.MULTIPLICATION,
                    Order$$module$build$src$generators$javascript$javascript_generator.MULTIPLICATION
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.ADDITION,
                    Order$$module$build$src$generators$javascript$javascript_generator.ADDITION
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_AND,
                    Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_AND
                ],
                [
                    Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_OR,
                    Order$$module$build$src$generators$javascript$javascript_generator.LOGICAL_OR
                ]
            ];
            this.isInitialized = !1;
            for(const b in Order$$module$build$src$generators$javascript$javascript_generator)a = Order$$module$build$src$generators$javascript$javascript_generator[b], typeof a !== "string" && (this["ORDER_" + b] = a);
            this.addReservedWords("break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,new,return,super,switch,this,throw,try,typeof,var,void,while,with,yield,enum,implements,interface,let,package,private,protected,public,static,await,null,true,false,arguments," + Object.getOwnPropertyNames(globalThis).join(","));
        }
    }, module$build$src$generators$javascript$javascript_generator = {};
    module$build$src$generators$javascript$javascript_generator.JavascriptGenerator = JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator;
    module$build$src$generators$javascript$javascript_generator.Order = Order$$module$build$src$generators$javascript$javascript_generator;
    var getSubstringIndex$$module$build$src$generators$javascript$lists = function(a, b, c) {
        return b === "FIRST" ? "0" : b === "FROM_END" ? a + ".length - 1 - " + c : b === "LAST" ? a + ".length - 1" : c;
    }, module$build$src$generators$javascript$lists = {};
    module$build$src$generators$javascript$lists.lists_create_empty = lists_create_empty$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_create_with = lists_create_with$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_getIndex = lists_getIndex$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_getSublist = lists_getSublist$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_indexOf = lists_indexOf$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_isEmpty = lists_isEmpty$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_length = lists_length$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_repeat = lists_repeat$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_reverse = lists_reverse$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_setIndex = lists_setIndex$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_sort = lists_sort$$module$build$src$generators$javascript$lists;
    module$build$src$generators$javascript$lists.lists_split = lists_split$$module$build$src$generators$javascript$lists;
    var controls_ifelse$$module$build$src$generators$javascript$logic = controls_if$$module$build$src$generators$javascript$logic, module$build$src$generators$javascript$logic = {};
    module$build$src$generators$javascript$logic.controls_if = controls_if$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.controls_ifelse = controls_if$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.logic_boolean = logic_boolean$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.logic_compare = logic_compare$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.logic_negate = logic_negate$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.logic_null = logic_null$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.logic_operation = logic_operation$$module$build$src$generators$javascript$logic;
    module$build$src$generators$javascript$logic.logic_ternary = logic_ternary$$module$build$src$generators$javascript$logic;
    var controls_repeat$$module$build$src$generators$javascript$loops = controls_repeat_ext$$module$build$src$generators$javascript$loops, module$build$src$generators$javascript$loops = {};
    module$build$src$generators$javascript$loops.controls_flow_statements = controls_flow_statements$$module$build$src$generators$javascript$loops;
    module$build$src$generators$javascript$loops.controls_for = controls_for$$module$build$src$generators$javascript$loops;
    module$build$src$generators$javascript$loops.controls_forEach = controls_forEach$$module$build$src$generators$javascript$loops;
    module$build$src$generators$javascript$loops.controls_repeat = controls_repeat_ext$$module$build$src$generators$javascript$loops;
    module$build$src$generators$javascript$loops.controls_repeat_ext = controls_repeat_ext$$module$build$src$generators$javascript$loops;
    module$build$src$generators$javascript$loops.controls_whileUntil = controls_whileUntil$$module$build$src$generators$javascript$loops;
    var math_round$$module$build$src$generators$javascript$math = math_single$$module$build$src$generators$javascript$math, math_trig$$module$build$src$generators$javascript$math = math_single$$module$build$src$generators$javascript$math, module$build$src$generators$javascript$math = {};
    module$build$src$generators$javascript$math.math_arithmetic = math_arithmetic$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_atan2 = math_atan2$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_change = math_change$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_constant = math_constant$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_constrain = math_constrain$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_modulo = math_modulo$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_number = math_number$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_number_property = math_number_property$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_on_list = math_on_list$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_random_float = math_random_float$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_random_int = math_random_int$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_round = math_single$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_single = math_single$$module$build$src$generators$javascript$math;
    module$build$src$generators$javascript$math.math_trig = math_single$$module$build$src$generators$javascript$math;
    var procedures_defnoreturn$$module$build$src$generators$javascript$procedures = procedures_defreturn$$module$build$src$generators$javascript$procedures, module$build$src$generators$javascript$procedures = {};
    module$build$src$generators$javascript$procedures.procedures_callnoreturn = procedures_callnoreturn$$module$build$src$generators$javascript$procedures;
    module$build$src$generators$javascript$procedures.procedures_callreturn = procedures_callreturn$$module$build$src$generators$javascript$procedures;
    module$build$src$generators$javascript$procedures.procedures_defnoreturn = procedures_defreturn$$module$build$src$generators$javascript$procedures;
    module$build$src$generators$javascript$procedures.procedures_defreturn = procedures_defreturn$$module$build$src$generators$javascript$procedures;
    module$build$src$generators$javascript$procedures.procedures_ifreturn = procedures_ifreturn$$module$build$src$generators$javascript$procedures;
    var strRegExp$$module$build$src$generators$javascript$text = /^\s*'([^']|\\')*'\s*$/, forceString$$module$build$src$generators$javascript$text = function(a) {
        return strRegExp$$module$build$src$generators$javascript$text.test(a) ? [
            a,
            Order$$module$build$src$generators$javascript$javascript_generator.ATOMIC
        ] : [
            "String(" + a + ")",
            Order$$module$build$src$generators$javascript$javascript_generator.FUNCTION_CALL
        ];
    }, getSubstringIndex$$module$build$src$generators$javascript$text = function(a, b, c) {
        return b === "FIRST" ? "0" : b === "FROM_END" ? a + ".length - 1 - " + c : b === "LAST" ? a + ".length - 1" : c;
    }, text_prompt$$module$build$src$generators$javascript$text = text_prompt_ext$$module$build$src$generators$javascript$text, module$build$src$generators$javascript$text = {};
    module$build$src$generators$javascript$text.text = text$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_append = text_append$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_changeCase = text_changeCase$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_charAt = text_charAt$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_count = text_count$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_getSubstring = text_getSubstring$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_indexOf = text_indexOf$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_isEmpty = text_isEmpty$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_join = text_join$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_length = text_length$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_print = text_print$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_prompt = text_prompt_ext$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_prompt_ext = text_prompt_ext$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_replace = text_replace$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_reverse = text_reverse$$module$build$src$generators$javascript$text;
    module$build$src$generators$javascript$text.text_trim = text_trim$$module$build$src$generators$javascript$text;
    var module$build$src$generators$javascript$variables = {};
    module$build$src$generators$javascript$variables.variables_get = variables_get$$module$build$src$generators$javascript$variables;
    module$build$src$generators$javascript$variables.variables_set = variables_set$$module$build$src$generators$javascript$variables;
    var module$build$src$generators$javascript$variables_dynamic = {};
    module$build$src$generators$javascript$variables_dynamic.variables_get_dynamic = variables_get$$module$build$src$generators$javascript$variables;
    module$build$src$generators$javascript$variables_dynamic.variables_set_dynamic = variables_set$$module$build$src$generators$javascript$variables;
    var javascriptGenerator$$module$build$src$generators$javascript = new JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator, generators$$module$build$src$generators$javascript = Object.assign({}, module$build$src$generators$javascript$lists, module$build$src$generators$javascript$logic, module$build$src$generators$javascript$loops, module$build$src$generators$javascript$math, module$build$src$generators$javascript$procedures, module$build$src$generators$javascript$text, module$build$src$generators$javascript$variables, module$build$src$generators$javascript$variables_dynamic);
    for(const a in generators$$module$build$src$generators$javascript)javascriptGenerator$$module$build$src$generators$javascript.forBlock[a] = generators$$module$build$src$generators$javascript[a];
    var module$build$src$generators$javascript = {};
    module$build$src$generators$javascript.JavascriptGenerator = JavascriptGenerator$$module$build$src$generators$javascript$javascript_generator;
    module$build$src$generators$javascript.Order = Order$$module$build$src$generators$javascript$javascript_generator;
    module$build$src$generators$javascript.javascriptGenerator = javascriptGenerator$$module$build$src$generators$javascript;
    module$build$src$generators$javascript.__namespace__ = $;
    return module$build$src$generators$javascript;
}); //# sourceMappingURL=javascript_compressed.js.map
}),
"[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/javascript.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JavascriptGenerator",
    ()=>JavascriptGenerator,
    "Order",
    ()=>Order,
    "javascriptGenerator",
    ()=>javascriptGenerator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$javascript_compressed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/javascript_compressed.js [app-client] (ecmascript)");
;
const { JavascriptGenerator, Order, javascriptGenerator } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$javascript_compressed$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
"[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/msg/en.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-disable */ ;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        ((r)=>r !== undefined && __turbopack_context__.v(r))(factory());
    } else if ("TURBOPACK compile-time truthy", 1) {
        module.exports = factory();
    } else //TURBOPACK unreachable
    {
        var messages;
        var key;
    }
})(/*TURBOPACK member replacement*/ __turbopack_context__.e, function() {
    // This file was automatically generated.  Do not modify.
    'use strict';
    var Blockly = Blockly || {
        Msg: Object.create(null)
    };
    Blockly.Msg["ADD_COMMENT"] = "Add Comment";
    Blockly.Msg["ALT_KEY"] = "Alt";
    Blockly.Msg["CANNOT_DELETE_VARIABLE_PROCEDURE"] = "Can't delete the variable '%1' because it's part of the definition of the function '%2'";
    Blockly.Msg["CHANGE_VALUE_TITLE"] = "Change value:";
    Blockly.Msg["CHROME_OS"] = "ChromeOS";
    Blockly.Msg["CLEAN_UP"] = "Clean up Blocks";
    Blockly.Msg["CLOSE"] = "Close";
    Blockly.Msg["COLLAPSED_WARNINGS_WARNING"] = "Collapsed blocks contain warnings.";
    Blockly.Msg["COLLAPSE_ALL"] = "Collapse Blocks";
    Blockly.Msg["COLLAPSE_BLOCK"] = "Collapse Block";
    Blockly.Msg["COLOUR_BLEND_COLOUR1"] = "colour 1";
    Blockly.Msg["COLOUR_BLEND_COLOUR2"] = "colour 2";
    Blockly.Msg["COLOUR_BLEND_HELPURL"] = "https://meyerweb.com/eric/tools/color-blend/#:::rgbp";
    Blockly.Msg["COLOUR_BLEND_RATIO"] = "ratio";
    Blockly.Msg["COLOUR_BLEND_TITLE"] = "blend";
    Blockly.Msg["COLOUR_BLEND_TOOLTIP"] = "Blends two colours together with a given ratio (0.0 - 1.0).";
    Blockly.Msg["COLOUR_PICKER_HELPURL"] = "https://en.wikipedia.org/wiki/Color";
    Blockly.Msg["COLOUR_PICKER_TOOLTIP"] = "Choose a colour from the palette.";
    Blockly.Msg["COLOUR_RANDOM_HELPURL"] = "http://randomcolour.com";
    Blockly.Msg["COLOUR_RANDOM_TITLE"] = "random colour";
    Blockly.Msg["COLOUR_RANDOM_TOOLTIP"] = "Choose a colour at random.";
    Blockly.Msg["COLOUR_RGB_BLUE"] = "blue";
    Blockly.Msg["COLOUR_RGB_GREEN"] = "green";
    Blockly.Msg["COLOUR_RGB_HELPURL"] = "https://www.december.com/html/spec/colorpercompact.html";
    Blockly.Msg["COLOUR_RGB_RED"] = "red";
    Blockly.Msg["COLOUR_RGB_TITLE"] = "colour with";
    Blockly.Msg["COLOUR_RGB_TOOLTIP"] = "Create a colour with the specified amount of red, green, and blue. All values must be between 0 and 100.";
    Blockly.Msg["COMMAND_KEY"] = "⌘ Command";
    Blockly.Msg["CONTROLS_FLOW_STATEMENTS_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#loop-termination-blocks";
    Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK"] = "break out of loop";
    Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE"] = "continue with next iteration of loop";
    Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK"] = "Break out of the containing loop.";
    Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE"] = "Skip the rest of this loop, and continue with the next iteration.";
    Blockly.Msg["CONTROLS_FLOW_STATEMENTS_WARNING"] = "Warning: This block may only be used within a loop.";
    Blockly.Msg["CONTROLS_FOREACH_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#for-each";
    Blockly.Msg["CONTROLS_FOREACH_TITLE"] = "for each item %1 in list %2";
    Blockly.Msg["CONTROLS_FOREACH_TOOLTIP"] = "For each item in a list, set the variable '%1' to the item, and then do some statements.";
    Blockly.Msg["CONTROLS_FOR_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#count-with";
    Blockly.Msg["CONTROLS_FOR_TITLE"] = "count with %1 from %2 to %3 by %4";
    Blockly.Msg["CONTROLS_FOR_TOOLTIP"] = "Have the variable '%1' take on the values from the start number to the end number, counting by the specified interval, and do the specified blocks.";
    Blockly.Msg["CONTROLS_IF_ELSEIF_TOOLTIP"] = "Add a condition to the if block.";
    Blockly.Msg["CONTROLS_IF_ELSE_TOOLTIP"] = "Add a final, catch-all condition to the if block.";
    Blockly.Msg["CONTROLS_IF_HELPURL"] = "https://github.com/google/blockly/wiki/IfElse";
    Blockly.Msg["CONTROLS_IF_IF_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this if block.";
    Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "else";
    Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"] = "else if";
    Blockly.Msg["CONTROLS_IF_MSG_IF"] = "if";
    Blockly.Msg["CONTROLS_IF_TOOLTIP_1"] = "If a value is true, then do some statements.";
    Blockly.Msg["CONTROLS_IF_TOOLTIP_2"] = "If a value is true, then do the first block of statements. Otherwise, do the second block of statements.";
    Blockly.Msg["CONTROLS_IF_TOOLTIP_3"] = "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements.";
    Blockly.Msg["CONTROLS_IF_TOOLTIP_4"] = "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements. If none of the values are true, do the last block of statements.";
    Blockly.Msg["CONTROLS_REPEAT_HELPURL"] = "https://en.wikipedia.org/wiki/For_loop";
    Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "do";
    Blockly.Msg["CONTROLS_REPEAT_TITLE"] = "repeat %1 times";
    Blockly.Msg["CONTROLS_REPEAT_TOOLTIP"] = "Do some statements several times.";
    Blockly.Msg["CONTROLS_WHILEUNTIL_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#repeat";
    Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_UNTIL"] = "repeat until";
    Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_WHILE"] = "repeat while";
    Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL"] = "While a value is false, then do some statements.";
    Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_WHILE"] = "While a value is true, then do some statements.";
    Blockly.Msg["CONTROL_KEY"] = "Ctrl";
    Blockly.Msg["COPY_SHORTCUT"] = "Copy";
    Blockly.Msg["CUT_SHORTCUT"] = "Cut";
    Blockly.Msg["DELETE_ALL_BLOCKS"] = "Delete all %1 blocks?";
    Blockly.Msg["DELETE_BLOCK"] = "Delete Block";
    Blockly.Msg["DELETE_VARIABLE"] = "Delete the '%1' variable";
    Blockly.Msg["DELETE_VARIABLE_CONFIRMATION"] = "Delete %1 uses of the '%2' variable?";
    Blockly.Msg["DELETE_X_BLOCKS"] = "Delete %1 Blocks";
    Blockly.Msg["DIALOG_CANCEL"] = "Cancel";
    Blockly.Msg["DIALOG_OK"] = "OK";
    Blockly.Msg["DISABLE_BLOCK"] = "Disable Block";
    Blockly.Msg["DUPLICATE_BLOCK"] = "Duplicate";
    Blockly.Msg["DUPLICATE_COMMENT"] = "Duplicate Comment";
    Blockly.Msg["EDIT_BLOCK_CONTENTS"] = "Edit Block contents";
    Blockly.Msg["ENABLE_BLOCK"] = "Enable Block";
    Blockly.Msg["EXPAND_ALL"] = "Expand Blocks";
    Blockly.Msg["EXPAND_BLOCK"] = "Expand Block";
    Blockly.Msg["EXTERNAL_INPUTS"] = "External Inputs";
    Blockly.Msg["HELP"] = "Help";
    Blockly.Msg["HELP_PROMPT"] = "Press %1 for help on keyboard controls";
    Blockly.Msg["INLINE_INPUTS"] = "Inline Inputs";
    Blockly.Msg["KEYBOARD_NAV_CONSTRAINED_MOVE_HINT"] = "Use the arrow keys to move, then %1 to accept the position";
    Blockly.Msg["KEYBOARD_NAV_COPIED_HINT"] = "Copied. Press %1 to paste.";
    Blockly.Msg["KEYBOARD_NAV_CUT_HINT"] = "Cut. Press %1 to paste.";
    Blockly.Msg["KEYBOARD_NAV_UNCONSTRAINED_MOVE_HINT"] = "Hold %1 and use arrow keys to move freely, then %2 to accept the position";
    Blockly.Msg["LINUX"] = "Linux";
    Blockly.Msg["LISTS_CREATE_EMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-empty-list";
    Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"] = "create empty list";
    Blockly.Msg["LISTS_CREATE_EMPTY_TOOLTIP"] = "Returns a list, of length 0, containing no data records";
    Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"] = "list";
    Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this list block.";
    Blockly.Msg["LISTS_CREATE_WITH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";
    Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "create list with";
    Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"] = "Add an item to the list.";
    Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"] = "Create a list with any number of items.";
    Blockly.Msg["LISTS_GET_INDEX_FIRST"] = "first";
    Blockly.Msg["LISTS_GET_INDEX_FROM_END"] = "# from end";
    Blockly.Msg["LISTS_GET_INDEX_FROM_START"] = "#";
    Blockly.Msg["LISTS_GET_INDEX_GET"] = "get";
    Blockly.Msg["LISTS_GET_INDEX_GET_REMOVE"] = "get and remove";
    Blockly.Msg["LISTS_GET_INDEX_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-items-from-a-list";
    Blockly.Msg["LISTS_GET_INDEX_LAST"] = "last";
    Blockly.Msg["LISTS_GET_INDEX_RANDOM"] = "random";
    Blockly.Msg["LISTS_GET_INDEX_REMOVE"] = "remove";
    Blockly.Msg["LISTS_GET_INDEX_TAIL"] = "";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FIRST"] = "Returns the first item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FROM"] = "Returns the item at the specified position in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_LAST"] = "Returns the last item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_RANDOM"] = "Returns a random item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST"] = "Removes and returns the first item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM"] = "Removes and returns the item at the specified position in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST"] = "Removes and returns the last item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM"] = "Removes and returns a random item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST"] = "Removes the first item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM"] = "Removes the item at the specified position in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST"] = "Removes the last item in a list.";
    Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM"] = "Removes a random item in a list.";
    Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_END"] = "to # from end";
    Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_START"] = "to #";
    Blockly.Msg["LISTS_GET_SUBLIST_END_LAST"] = "to last";
    Blockly.Msg["LISTS_GET_SUBLIST_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-a-sublist";
    Blockly.Msg["LISTS_GET_SUBLIST_START_FIRST"] = "get sub-list from first";
    Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_END"] = "get sub-list from # from end";
    Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_START"] = "get sub-list from #";
    Blockly.Msg["LISTS_GET_SUBLIST_TAIL"] = "";
    Blockly.Msg["LISTS_GET_SUBLIST_TOOLTIP"] = "Creates a copy of the specified portion of a list.";
    Blockly.Msg["LISTS_INDEX_FROM_END_TOOLTIP"] = "%1 is the last item.";
    Blockly.Msg["LISTS_INDEX_FROM_START_TOOLTIP"] = "%1 is the first item.";
    Blockly.Msg["LISTS_INDEX_OF_FIRST"] = "find first occurrence of item";
    Blockly.Msg["LISTS_INDEX_OF_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#finding-items-in-a-list";
    Blockly.Msg["LISTS_INDEX_OF_LAST"] = "find last occurrence of item";
    Blockly.Msg["LISTS_INDEX_OF_TOOLTIP"] = "Returns the index of the first/last occurrence of the item in the list. Returns %1 if item is not found.";
    Blockly.Msg["LISTS_INLIST"] = "in list";
    Blockly.Msg["LISTS_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#is-empty";
    Blockly.Msg["LISTS_ISEMPTY_TITLE"] = "%1 is empty";
    Blockly.Msg["LISTS_ISEMPTY_TOOLTIP"] = "Returns true if the list is empty.";
    Blockly.Msg["LISTS_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#length-of";
    Blockly.Msg["LISTS_LENGTH_TITLE"] = "length of %1";
    Blockly.Msg["LISTS_LENGTH_TOOLTIP"] = "Returns the length of a list.";
    Blockly.Msg["LISTS_REPEAT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";
    Blockly.Msg["LISTS_REPEAT_TITLE"] = "create list with item %1 repeated %2 times";
    Blockly.Msg["LISTS_REPEAT_TOOLTIP"] = "Creates a list consisting of the given value repeated the specified number of times.";
    Blockly.Msg["LISTS_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#reversing-a-list";
    Blockly.Msg["LISTS_REVERSE_MESSAGE0"] = "reverse %1";
    Blockly.Msg["LISTS_REVERSE_TOOLTIP"] = "Reverse a copy of a list.";
    Blockly.Msg["LISTS_SET_INDEX_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#in-list--set";
    Blockly.Msg["LISTS_SET_INDEX_INPUT_TO"] = "as";
    Blockly.Msg["LISTS_SET_INDEX_INSERT"] = "insert at";
    Blockly.Msg["LISTS_SET_INDEX_SET"] = "set";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST"] = "Inserts the item at the start of a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FROM"] = "Inserts the item at the specified position in a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_LAST"] = "Append the item to the end of a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM"] = "Inserts the item randomly in a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FIRST"] = "Sets the first item in a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FROM"] = "Sets the item at the specified position in a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_LAST"] = "Sets the last item in a list.";
    Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_RANDOM"] = "Sets a random item in a list.";
    Blockly.Msg["LISTS_SORT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#sorting-a-list";
    Blockly.Msg["LISTS_SORT_ORDER_ASCENDING"] = "ascending";
    Blockly.Msg["LISTS_SORT_ORDER_DESCENDING"] = "descending";
    Blockly.Msg["LISTS_SORT_TITLE"] = "sort %1 %2 %3";
    Blockly.Msg["LISTS_SORT_TOOLTIP"] = "Sort a copy of a list.";
    Blockly.Msg["LISTS_SORT_TYPE_IGNORECASE"] = "alphabetic, ignore case";
    Blockly.Msg["LISTS_SORT_TYPE_NUMERIC"] = "numeric";
    Blockly.Msg["LISTS_SORT_TYPE_TEXT"] = "alphabetic";
    Blockly.Msg["LISTS_SPLIT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#splitting-strings-and-joining-lists";
    Blockly.Msg["LISTS_SPLIT_LIST_FROM_TEXT"] = "make list from text";
    Blockly.Msg["LISTS_SPLIT_TEXT_FROM_LIST"] = "make text from list";
    Blockly.Msg["LISTS_SPLIT_TOOLTIP_JOIN"] = "Join a list of texts into one text, separated by a delimiter.";
    Blockly.Msg["LISTS_SPLIT_TOOLTIP_SPLIT"] = "Split text into a list of texts, breaking at each delimiter.";
    Blockly.Msg["LISTS_SPLIT_WITH_DELIMITER"] = "with delimiter";
    Blockly.Msg["LOGIC_BOOLEAN_FALSE"] = "false";
    Blockly.Msg["LOGIC_BOOLEAN_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#values";
    Blockly.Msg["LOGIC_BOOLEAN_TOOLTIP"] = "Returns either true or false.";
    Blockly.Msg["LOGIC_BOOLEAN_TRUE"] = "true";
    Blockly.Msg["LOGIC_COMPARE_HELPURL"] = "https://en.wikipedia.org/wiki/Inequality_(mathematics)";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_EQ"] = "Return true if both inputs equal each other.";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GT"] = "Return true if the first input is greater than the second input.";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GTE"] = "Return true if the first input is greater than or equal to the second input.";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LT"] = "Return true if the first input is smaller than the second input.";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LTE"] = "Return true if the first input is smaller than or equal to the second input.";
    Blockly.Msg["LOGIC_COMPARE_TOOLTIP_NEQ"] = "Return true if both inputs are not equal to each other.";
    Blockly.Msg["LOGIC_NEGATE_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#not";
    Blockly.Msg["LOGIC_NEGATE_TITLE"] = "not %1";
    Blockly.Msg["LOGIC_NEGATE_TOOLTIP"] = "Returns true if the input is false. Returns false if the input is true.";
    Blockly.Msg["LOGIC_NULL"] = "null";
    Blockly.Msg["LOGIC_NULL_HELPURL"] = "https://en.wikipedia.org/wiki/Nullable_type";
    Blockly.Msg["LOGIC_NULL_TOOLTIP"] = "Returns null.";
    Blockly.Msg["LOGIC_OPERATION_AND"] = "and";
    Blockly.Msg["LOGIC_OPERATION_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#logical-operations";
    Blockly.Msg["LOGIC_OPERATION_OR"] = "or";
    Blockly.Msg["LOGIC_OPERATION_TOOLTIP_AND"] = "Return true if both inputs are true.";
    Blockly.Msg["LOGIC_OPERATION_TOOLTIP_OR"] = "Return true if at least one of the inputs is true.";
    Blockly.Msg["LOGIC_TERNARY_CONDITION"] = "test";
    Blockly.Msg["LOGIC_TERNARY_HELPURL"] = "https://en.wikipedia.org/wiki/%3F:";
    Blockly.Msg["LOGIC_TERNARY_IF_FALSE"] = "if false";
    Blockly.Msg["LOGIC_TERNARY_IF_TRUE"] = "if true";
    Blockly.Msg["LOGIC_TERNARY_TOOLTIP"] = "Check the condition in 'test'. If the condition is true, returns the 'if true' value; otherwise returns the 'if false' value.";
    Blockly.Msg["MAC_OS"] = "macOS";
    Blockly.Msg["MATH_ADDITION_SYMBOL"] = "+";
    Blockly.Msg["MATH_ARITHMETIC_HELPURL"] = "https://en.wikipedia.org/wiki/Arithmetic";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_ADD"] = "Return the sum of the two numbers.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_DIVIDE"] = "Return the quotient of the two numbers.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MINUS"] = "Return the difference of the two numbers.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MULTIPLY"] = "Return the product of the two numbers.";
    Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_POWER"] = "Return the first number raised to the power of the second number.";
    Blockly.Msg["MATH_ATAN2_HELPURL"] = "https://en.wikipedia.org/wiki/Atan2";
    Blockly.Msg["MATH_ATAN2_TITLE"] = "atan2 of X:%1 Y:%2";
    Blockly.Msg["MATH_ATAN2_TOOLTIP"] = "Return the arctangent of point (X, Y) in degrees from -180 to 180.";
    Blockly.Msg["MATH_CHANGE_HELPURL"] = "https://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter";
    Blockly.Msg["MATH_CHANGE_TITLE"] = "change %1 by %2";
    Blockly.Msg["MATH_CHANGE_TOOLTIP"] = "Add a number to variable '%1'.";
    Blockly.Msg["MATH_CONSTANT_HELPURL"] = "https://en.wikipedia.org/wiki/Mathematical_constant";
    Blockly.Msg["MATH_CONSTANT_TOOLTIP"] = "Return one of the common constants: π (3.141…), e (2.718…), φ (1.618…), sqrt(2) (1.414…), sqrt(½) (0.707…), or ∞ (infinity).";
    Blockly.Msg["MATH_CONSTRAIN_HELPURL"] = "https://en.wikipedia.org/wiki/Clamping_(graphics)";
    Blockly.Msg["MATH_CONSTRAIN_TITLE"] = "constrain %1 low %2 high %3";
    Blockly.Msg["MATH_CONSTRAIN_TOOLTIP"] = "Constrain a number to be between the specified limits (inclusive).";
    Blockly.Msg["MATH_DIVISION_SYMBOL"] = "÷";
    Blockly.Msg["MATH_IS_DIVISIBLE_BY"] = "is divisible by";
    Blockly.Msg["MATH_IS_EVEN"] = "is even";
    Blockly.Msg["MATH_IS_NEGATIVE"] = "is negative";
    Blockly.Msg["MATH_IS_ODD"] = "is odd";
    Blockly.Msg["MATH_IS_POSITIVE"] = "is positive";
    Blockly.Msg["MATH_IS_PRIME"] = "is prime";
    Blockly.Msg["MATH_IS_TOOLTIP"] = "Check if a number is an even, odd, prime, whole, positive, negative, or if it is divisible by certain number. Returns true or false.";
    Blockly.Msg["MATH_IS_WHOLE"] = "is whole";
    Blockly.Msg["MATH_MODULO_HELPURL"] = "https://en.wikipedia.org/wiki/Modulo_operation";
    Blockly.Msg["MATH_MODULO_TITLE"] = "remainder of %1 ÷ %2";
    Blockly.Msg["MATH_MODULO_TOOLTIP"] = "Return the remainder from dividing the two numbers.";
    Blockly.Msg["MATH_MULTIPLICATION_SYMBOL"] = "×";
    Blockly.Msg["MATH_NUMBER_HELPURL"] = "https://en.wikipedia.org/wiki/Number";
    Blockly.Msg["MATH_NUMBER_TOOLTIP"] = "A number.";
    Blockly.Msg["MATH_ONLIST_HELPURL"] = "";
    Blockly.Msg["MATH_ONLIST_OPERATOR_AVERAGE"] = "average of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_MAX"] = "max of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_MEDIAN"] = "median of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_MIN"] = "min of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_MODE"] = "modes of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_RANDOM"] = "random item of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_STD_DEV"] = "standard deviation of list";
    Blockly.Msg["MATH_ONLIST_OPERATOR_SUM"] = "sum of list";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_AVERAGE"] = "Return the average (arithmetic mean) of the numeric values in the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_MAX"] = "Return the largest number in the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_MEDIAN"] = "Return the median number in the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_MIN"] = "Return the smallest number in the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_MODE"] = "Return a list of the most common item(s) in the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_RANDOM"] = "Return a random element from the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_STD_DEV"] = "Return the standard deviation of the list.";
    Blockly.Msg["MATH_ONLIST_TOOLTIP_SUM"] = "Return the sum of all the numbers in the list.";
    Blockly.Msg["MATH_POWER_SYMBOL"] = "^";
    Blockly.Msg["MATH_RANDOM_FLOAT_HELPURL"] = "https://en.wikipedia.org/wiki/Random_number_generation";
    Blockly.Msg["MATH_RANDOM_FLOAT_TITLE_RANDOM"] = "random fraction";
    Blockly.Msg["MATH_RANDOM_FLOAT_TOOLTIP"] = "Return a random fraction between 0.0 (inclusive) and 1.0 (exclusive).";
    Blockly.Msg["MATH_RANDOM_INT_HELPURL"] = "https://en.wikipedia.org/wiki/Random_number_generation";
    Blockly.Msg["MATH_RANDOM_INT_TITLE"] = "random integer from %1 to %2";
    Blockly.Msg["MATH_RANDOM_INT_TOOLTIP"] = "Return a random integer between the two specified limits, inclusive.";
    Blockly.Msg["MATH_ROUND_HELPURL"] = "https://en.wikipedia.org/wiki/Rounding";
    Blockly.Msg["MATH_ROUND_OPERATOR_ROUND"] = "round";
    Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDDOWN"] = "round down";
    Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDUP"] = "round up";
    Blockly.Msg["MATH_ROUND_TOOLTIP"] = "Round a number up or down.";
    Blockly.Msg["MATH_SINGLE_HELPURL"] = "https://en.wikipedia.org/wiki/Square_root";
    Blockly.Msg["MATH_SINGLE_OP_ABSOLUTE"] = "absolute";
    Blockly.Msg["MATH_SINGLE_OP_ROOT"] = "square root";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_ABS"] = "Return the absolute value of a number.";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_EXP"] = "Return e to the power of a number.";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_LN"] = "Return the natural logarithm of a number.";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_LOG10"] = "Return the base 10 logarithm of a number.";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_NEG"] = "Return the negation of a number.";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_POW10"] = "Return 10 to the power of a number.";
    Blockly.Msg["MATH_SINGLE_TOOLTIP_ROOT"] = "Return the square root of a number.";
    Blockly.Msg["MATH_SUBTRACTION_SYMBOL"] = "-";
    Blockly.Msg["MATH_TRIG_ACOS"] = "acos";
    Blockly.Msg["MATH_TRIG_ASIN"] = "asin";
    Blockly.Msg["MATH_TRIG_ATAN"] = "atan";
    Blockly.Msg["MATH_TRIG_COS"] = "cos";
    Blockly.Msg["MATH_TRIG_HELPURL"] = "https://en.wikipedia.org/wiki/Trigonometric_functions";
    Blockly.Msg["MATH_TRIG_SIN"] = "sin";
    Blockly.Msg["MATH_TRIG_TAN"] = "tan";
    Blockly.Msg["MATH_TRIG_TOOLTIP_ACOS"] = "Return the arccosine of a number.";
    Blockly.Msg["MATH_TRIG_TOOLTIP_ASIN"] = "Return the arcsine of a number.";
    Blockly.Msg["MATH_TRIG_TOOLTIP_ATAN"] = "Return the arctangent of a number.";
    Blockly.Msg["MATH_TRIG_TOOLTIP_COS"] = "Return the cosine of a degree (not radian).";
    Blockly.Msg["MATH_TRIG_TOOLTIP_SIN"] = "Return the sine of a degree (not radian).";
    Blockly.Msg["MATH_TRIG_TOOLTIP_TAN"] = "Return the tangent of a degree (not radian).";
    Blockly.Msg["MOVE_BLOCK"] = "Move Block";
    Blockly.Msg["NEW_COLOUR_VARIABLE"] = "Create colour variable...";
    Blockly.Msg["NEW_NUMBER_VARIABLE"] = "Create number variable...";
    Blockly.Msg["NEW_STRING_VARIABLE"] = "Create string variable...";
    Blockly.Msg["NEW_VARIABLE"] = "Create variable...";
    Blockly.Msg["NEW_VARIABLE_TITLE"] = "New variable name:";
    Blockly.Msg["NEW_VARIABLE_TYPE_TITLE"] = "New variable type:";
    Blockly.Msg["OPTION_KEY"] = "⌥ Option";
    Blockly.Msg["ORDINAL_NUMBER_SUFFIX"] = "";
    Blockly.Msg["PASTE_SHORTCUT"] = "Paste";
    Blockly.Msg["PROCEDURES_ALLOW_STATEMENTS"] = "allow statements";
    Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "with:";
    Blockly.Msg["PROCEDURES_CALLNORETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
    Blockly.Msg["PROCEDURES_CALLNORETURN_TOOLTIP"] = "Run the user-defined function '%1'.";
    Blockly.Msg["PROCEDURES_CALLRETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
    Blockly.Msg["PROCEDURES_CALLRETURN_TOOLTIP"] = "Run the user-defined function '%1' and use its output.";
    Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "with:";
    Blockly.Msg["PROCEDURES_CALL_DISABLED_DEF_WARNING"] = "Can't run the user-defined function '%1' because the definition block is disabled.";
    Blockly.Msg["PROCEDURES_CREATE_DO"] = "Create '%1'";
    Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"] = "Describe this function...";
    Blockly.Msg["PROCEDURES_DEFNORETURN_DO"] = "";
    Blockly.Msg["PROCEDURES_DEFNORETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
    Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"] = "do something";
    Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "to";
    Blockly.Msg["PROCEDURES_DEFNORETURN_TOOLTIP"] = "Creates a function with no output.";
    Blockly.Msg["PROCEDURES_DEFRETURN_HELPURL"] = "https://en.wikipedia.org/wiki/Subroutine";
    Blockly.Msg["PROCEDURES_DEFRETURN_RETURN"] = "return";
    Blockly.Msg["PROCEDURES_DEFRETURN_TOOLTIP"] = "Creates a function with an output.";
    Blockly.Msg["PROCEDURES_DEF_DUPLICATE_WARNING"] = "Warning: This function has duplicate parameters.";
    Blockly.Msg["PROCEDURES_HIGHLIGHT_DEF"] = "Highlight function definition";
    Blockly.Msg["PROCEDURES_IFRETURN_HELPURL"] = "https://c2.com/cgi/wiki?GuardClause";
    Blockly.Msg["PROCEDURES_IFRETURN_TOOLTIP"] = "If a value is true, then return a second value.";
    Blockly.Msg["PROCEDURES_IFRETURN_WARNING"] = "Warning: This block may be used only within a function definition.";
    Blockly.Msg["PROCEDURES_MUTATORARG_TITLE"] = "input name:";
    Blockly.Msg["PROCEDURES_MUTATORARG_TOOLTIP"] = "Add an input to the function.";
    Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TITLE"] = "inputs";
    Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TOOLTIP"] = "Add, remove, or reorder inputs to this function.";
    Blockly.Msg["REDO"] = "Redo";
    Blockly.Msg["REMOVE_COMMENT"] = "Remove Comment";
    Blockly.Msg["RENAME_VARIABLE"] = "Rename variable...";
    Blockly.Msg["RENAME_VARIABLE_TITLE"] = "Rename all '%1' variables to:";
    Blockly.Msg["SHORTCUTS_CODE_NAVIGATION"] = "Code navigation";
    Blockly.Msg["SHORTCUTS_EDITING"] = "Editing";
    Blockly.Msg["SHORTCUTS_GENERAL"] = "General";
    Blockly.Msg["TEXT_APPEND_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";
    Blockly.Msg["TEXT_APPEND_TITLE"] = "to %1 append text %2";
    Blockly.Msg["TEXT_APPEND_TOOLTIP"] = "Append some text to variable '%1'.";
    Blockly.Msg["TEXT_CHANGECASE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#adjusting-text-case";
    Blockly.Msg["TEXT_CHANGECASE_OPERATOR_LOWERCASE"] = "to lower case";
    Blockly.Msg["TEXT_CHANGECASE_OPERATOR_TITLECASE"] = "to Title Case";
    Blockly.Msg["TEXT_CHANGECASE_OPERATOR_UPPERCASE"] = "to UPPER CASE";
    Blockly.Msg["TEXT_CHANGECASE_TOOLTIP"] = "Return a copy of the text in a different case.";
    Blockly.Msg["TEXT_CHARAT_FIRST"] = "get first letter";
    Blockly.Msg["TEXT_CHARAT_FROM_END"] = "get letter # from end";
    Blockly.Msg["TEXT_CHARAT_FROM_START"] = "get letter #";
    Blockly.Msg["TEXT_CHARAT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-text";
    Blockly.Msg["TEXT_CHARAT_LAST"] = "get last letter";
    Blockly.Msg["TEXT_CHARAT_RANDOM"] = "get random letter";
    Blockly.Msg["TEXT_CHARAT_TAIL"] = "";
    Blockly.Msg["TEXT_CHARAT_TITLE"] = "in text %1 %2";
    Blockly.Msg["TEXT_CHARAT_TOOLTIP"] = "Returns the letter at the specified position.";
    Blockly.Msg["TEXT_COUNT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#counting-substrings";
    Blockly.Msg["TEXT_COUNT_MESSAGE0"] = "count %1 in %2";
    Blockly.Msg["TEXT_COUNT_TOOLTIP"] = "Count how many times some text occurs within some other text.";
    Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TOOLTIP"] = "Add an item to the text.";
    Blockly.Msg["TEXT_CREATE_JOIN_TITLE_JOIN"] = "join";
    Blockly.Msg["TEXT_CREATE_JOIN_TOOLTIP"] = "Add, remove, or reorder sections to reconfigure this text block.";
    Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_END"] = "to letter # from end";
    Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_START"] = "to letter #";
    Blockly.Msg["TEXT_GET_SUBSTRING_END_LAST"] = "to last letter";
    Blockly.Msg["TEXT_GET_SUBSTRING_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-a-region-of-text";
    Blockly.Msg["TEXT_GET_SUBSTRING_INPUT_IN_TEXT"] = "in text";
    Blockly.Msg["TEXT_GET_SUBSTRING_START_FIRST"] = "get substring from first letter";
    Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_END"] = "get substring from letter # from end";
    Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_START"] = "get substring from letter #";
    Blockly.Msg["TEXT_GET_SUBSTRING_TAIL"] = "";
    Blockly.Msg["TEXT_GET_SUBSTRING_TOOLTIP"] = "Returns a specified portion of the text.";
    Blockly.Msg["TEXT_INDEXOF_HELPURL"] = "https://github.com/google/blockly/wiki/Text#finding-text";
    Blockly.Msg["TEXT_INDEXOF_OPERATOR_FIRST"] = "find first occurrence of text";
    Blockly.Msg["TEXT_INDEXOF_OPERATOR_LAST"] = "find last occurrence of text";
    Blockly.Msg["TEXT_INDEXOF_TITLE"] = "in text %1 %2 %3";
    Blockly.Msg["TEXT_INDEXOF_TOOLTIP"] = "Returns the index of the first/last occurrence of the first text in the second text. Returns %1 if text is not found.";
    Blockly.Msg["TEXT_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Text#checking-for-empty-text";
    Blockly.Msg["TEXT_ISEMPTY_TITLE"] = "%1 is empty";
    Blockly.Msg["TEXT_ISEMPTY_TOOLTIP"] = "Returns true if the provided text is empty.";
    Blockly.Msg["TEXT_JOIN_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-creation";
    Blockly.Msg["TEXT_JOIN_TITLE_CREATEWITH"] = "create text with";
    Blockly.Msg["TEXT_JOIN_TOOLTIP"] = "Create a piece of text by joining together any number of items.";
    Blockly.Msg["TEXT_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";
    Blockly.Msg["TEXT_LENGTH_TITLE"] = "length of %1";
    Blockly.Msg["TEXT_LENGTH_TOOLTIP"] = "Returns the number of letters (including spaces) in the provided text.";
    Blockly.Msg["TEXT_PRINT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";
    Blockly.Msg["TEXT_PRINT_TITLE"] = "print %1";
    Blockly.Msg["TEXT_PRINT_TOOLTIP"] = "Print the specified text, number or other value.";
    Blockly.Msg["TEXT_PROMPT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#getting-input-from-the-user";
    Blockly.Msg["TEXT_PROMPT_TOOLTIP_NUMBER"] = "Prompt for user for a number.";
    Blockly.Msg["TEXT_PROMPT_TOOLTIP_TEXT"] = "Prompt for user for some text.";
    Blockly.Msg["TEXT_PROMPT_TYPE_NUMBER"] = "prompt for number with message";
    Blockly.Msg["TEXT_PROMPT_TYPE_TEXT"] = "prompt for text with message";
    Blockly.Msg["TEXT_REPLACE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#replacing-substrings";
    Blockly.Msg["TEXT_REPLACE_MESSAGE0"] = "replace %1 with %2 in %3";
    Blockly.Msg["TEXT_REPLACE_TOOLTIP"] = "Replace all occurances of some text within some other text.";
    Blockly.Msg["TEXT_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#reversing-text";
    Blockly.Msg["TEXT_REVERSE_MESSAGE0"] = "reverse %1";
    Blockly.Msg["TEXT_REVERSE_TOOLTIP"] = "Reverses the order of the characters in the text.";
    Blockly.Msg["TEXT_TEXT_HELPURL"] = "https://en.wikipedia.org/wiki/String_(computer_science)";
    Blockly.Msg["TEXT_TEXT_TOOLTIP"] = "A letter, word, or line of text.";
    Blockly.Msg["TEXT_TRIM_HELPURL"] = "https://github.com/google/blockly/wiki/Text#trimming-removing-spaces";
    Blockly.Msg["TEXT_TRIM_OPERATOR_BOTH"] = "trim spaces from both sides of";
    Blockly.Msg["TEXT_TRIM_OPERATOR_LEFT"] = "trim spaces from left side of";
    Blockly.Msg["TEXT_TRIM_OPERATOR_RIGHT"] = "trim spaces from right side of";
    Blockly.Msg["TEXT_TRIM_TOOLTIP"] = "Return a copy of the text with spaces removed from one or both ends.";
    Blockly.Msg["TODAY"] = "Today";
    Blockly.Msg["UNDO"] = "Undo";
    Blockly.Msg["UNKNOWN"] = "Unknown";
    Blockly.Msg["UNNAMED_KEY"] = "unnamed";
    Blockly.Msg["VARIABLES_DEFAULT_NAME"] = "item";
    Blockly.Msg["VARIABLES_GET_CREATE_SET"] = "Create 'set %1'";
    Blockly.Msg["VARIABLES_GET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#get";
    Blockly.Msg["VARIABLES_GET_TOOLTIP"] = "Returns the value of this variable.";
    Blockly.Msg["VARIABLES_SET"] = "set %1 to %2";
    Blockly.Msg["VARIABLES_SET_CREATE_GET"] = "Create 'get %1'";
    Blockly.Msg["VARIABLES_SET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#set";
    Blockly.Msg["VARIABLES_SET_TOOLTIP"] = "Sets this variable to be equal to the input.";
    Blockly.Msg["VARIABLE_ALREADY_EXISTS"] = "A variable named '%1' already exists.";
    Blockly.Msg["VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE"] = "A variable named '%1' already exists for another type: '%2'.";
    Blockly.Msg["VARIABLE_ALREADY_EXISTS_FOR_A_PARAMETER"] = "A variable named '%1' already exists as a parameter in the procedure '%2'.";
    Blockly.Msg["WINDOWS"] = "Windows";
    Blockly.Msg["WORKSPACE_ARIA_LABEL"] = "Blockly Workspace";
    Blockly.Msg["WORKSPACE_COMMENT_DEFAULT_TEXT"] = "Say something...";
    Blockly.Msg["CONTROLS_FOREACH_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
    Blockly.Msg["CONTROLS_FOR_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
    Blockly.Msg["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] = Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"];
    Blockly.Msg["CONTROLS_IF_ELSE_TITLE_ELSE"] = Blockly.Msg["CONTROLS_IF_MSG_ELSE"];
    Blockly.Msg["CONTROLS_IF_IF_TITLE_IF"] = Blockly.Msg["CONTROLS_IF_MSG_IF"];
    Blockly.Msg["CONTROLS_IF_MSG_THEN"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
    Blockly.Msg["CONTROLS_WHILEUNTIL_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
    Blockly.Msg["LISTS_CREATE_WITH_ITEM_TITLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
    Blockly.Msg["LISTS_GET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
    Blockly.Msg["LISTS_GET_SUBLIST_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
    Blockly.Msg["LISTS_INDEX_OF_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
    Blockly.Msg["LISTS_SET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
    Blockly.Msg["MATH_CHANGE_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
    Blockly.Msg["PROCEDURES_DEFRETURN_COMMENT"] = Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"];
    Blockly.Msg["PROCEDURES_DEFRETURN_DO"] = Blockly.Msg["PROCEDURES_DEFNORETURN_DO"];
    Blockly.Msg["PROCEDURES_DEFRETURN_PROCEDURE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"];
    Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"];
    Blockly.Msg["TEXT_APPEND_VARIABLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
    Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
    Blockly.Msg["COLOUR_HUE"] = "20";
    Blockly.Msg["LISTS_HUE"] = "260";
    Blockly.Msg["LOGIC_HUE"] = "210";
    Blockly.Msg["LOOPS_HUE"] = "120";
    Blockly.Msg["MATH_HUE"] = "230";
    Blockly.Msg["PROCEDURES_HUE"] = "290";
    Blockly.Msg["TEXTS_HUE"] = "160";
    Blockly.Msg["VARIABLES_DYNAMIC_HUE"] = "310";
    Blockly.Msg["VARIABLES_HUE"] = "330";
    return Blockly.Msg;
});
}),
"[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/msg/en.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADD_COMMENT",
    ()=>ADD_COMMENT,
    "ALT_KEY",
    ()=>ALT_KEY,
    "CANNOT_DELETE_VARIABLE_PROCEDURE",
    ()=>CANNOT_DELETE_VARIABLE_PROCEDURE,
    "CHANGE_VALUE_TITLE",
    ()=>CHANGE_VALUE_TITLE,
    "CHROME_OS",
    ()=>CHROME_OS,
    "CLEAN_UP",
    ()=>CLEAN_UP,
    "CLOSE",
    ()=>CLOSE,
    "COLLAPSED_WARNINGS_WARNING",
    ()=>COLLAPSED_WARNINGS_WARNING,
    "COLLAPSE_ALL",
    ()=>COLLAPSE_ALL,
    "COLLAPSE_BLOCK",
    ()=>COLLAPSE_BLOCK,
    "COLOUR_BLEND_COLOUR1",
    ()=>COLOUR_BLEND_COLOUR1,
    "COLOUR_BLEND_COLOUR2",
    ()=>COLOUR_BLEND_COLOUR2,
    "COLOUR_BLEND_HELPURL",
    ()=>COLOUR_BLEND_HELPURL,
    "COLOUR_BLEND_RATIO",
    ()=>COLOUR_BLEND_RATIO,
    "COLOUR_BLEND_TITLE",
    ()=>COLOUR_BLEND_TITLE,
    "COLOUR_BLEND_TOOLTIP",
    ()=>COLOUR_BLEND_TOOLTIP,
    "COLOUR_HUE",
    ()=>COLOUR_HUE,
    "COLOUR_PICKER_HELPURL",
    ()=>COLOUR_PICKER_HELPURL,
    "COLOUR_PICKER_TOOLTIP",
    ()=>COLOUR_PICKER_TOOLTIP,
    "COLOUR_RANDOM_HELPURL",
    ()=>COLOUR_RANDOM_HELPURL,
    "COLOUR_RANDOM_TITLE",
    ()=>COLOUR_RANDOM_TITLE,
    "COLOUR_RANDOM_TOOLTIP",
    ()=>COLOUR_RANDOM_TOOLTIP,
    "COLOUR_RGB_BLUE",
    ()=>COLOUR_RGB_BLUE,
    "COLOUR_RGB_GREEN",
    ()=>COLOUR_RGB_GREEN,
    "COLOUR_RGB_HELPURL",
    ()=>COLOUR_RGB_HELPURL,
    "COLOUR_RGB_RED",
    ()=>COLOUR_RGB_RED,
    "COLOUR_RGB_TITLE",
    ()=>COLOUR_RGB_TITLE,
    "COLOUR_RGB_TOOLTIP",
    ()=>COLOUR_RGB_TOOLTIP,
    "COMMAND_KEY",
    ()=>COMMAND_KEY,
    "CONTROLS_FLOW_STATEMENTS_HELPURL",
    ()=>CONTROLS_FLOW_STATEMENTS_HELPURL,
    "CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK",
    ()=>CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK,
    "CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE",
    ()=>CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE,
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK",
    ()=>CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE",
    ()=>CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE,
    "CONTROLS_FLOW_STATEMENTS_WARNING",
    ()=>CONTROLS_FLOW_STATEMENTS_WARNING,
    "CONTROLS_FOREACH_HELPURL",
    ()=>CONTROLS_FOREACH_HELPURL,
    "CONTROLS_FOREACH_INPUT_DO",
    ()=>CONTROLS_FOREACH_INPUT_DO,
    "CONTROLS_FOREACH_TITLE",
    ()=>CONTROLS_FOREACH_TITLE,
    "CONTROLS_FOREACH_TOOLTIP",
    ()=>CONTROLS_FOREACH_TOOLTIP,
    "CONTROLS_FOR_HELPURL",
    ()=>CONTROLS_FOR_HELPURL,
    "CONTROLS_FOR_INPUT_DO",
    ()=>CONTROLS_FOR_INPUT_DO,
    "CONTROLS_FOR_TITLE",
    ()=>CONTROLS_FOR_TITLE,
    "CONTROLS_FOR_TOOLTIP",
    ()=>CONTROLS_FOR_TOOLTIP,
    "CONTROLS_IF_ELSEIF_TITLE_ELSEIF",
    ()=>CONTROLS_IF_ELSEIF_TITLE_ELSEIF,
    "CONTROLS_IF_ELSEIF_TOOLTIP",
    ()=>CONTROLS_IF_ELSEIF_TOOLTIP,
    "CONTROLS_IF_ELSE_TITLE_ELSE",
    ()=>CONTROLS_IF_ELSE_TITLE_ELSE,
    "CONTROLS_IF_ELSE_TOOLTIP",
    ()=>CONTROLS_IF_ELSE_TOOLTIP,
    "CONTROLS_IF_HELPURL",
    ()=>CONTROLS_IF_HELPURL,
    "CONTROLS_IF_IF_TITLE_IF",
    ()=>CONTROLS_IF_IF_TITLE_IF,
    "CONTROLS_IF_IF_TOOLTIP",
    ()=>CONTROLS_IF_IF_TOOLTIP,
    "CONTROLS_IF_MSG_ELSE",
    ()=>CONTROLS_IF_MSG_ELSE,
    "CONTROLS_IF_MSG_ELSEIF",
    ()=>CONTROLS_IF_MSG_ELSEIF,
    "CONTROLS_IF_MSG_IF",
    ()=>CONTROLS_IF_MSG_IF,
    "CONTROLS_IF_MSG_THEN",
    ()=>CONTROLS_IF_MSG_THEN,
    "CONTROLS_IF_TOOLTIP_1",
    ()=>CONTROLS_IF_TOOLTIP_1,
    "CONTROLS_IF_TOOLTIP_2",
    ()=>CONTROLS_IF_TOOLTIP_2,
    "CONTROLS_IF_TOOLTIP_3",
    ()=>CONTROLS_IF_TOOLTIP_3,
    "CONTROLS_IF_TOOLTIP_4",
    ()=>CONTROLS_IF_TOOLTIP_4,
    "CONTROLS_REPEAT_HELPURL",
    ()=>CONTROLS_REPEAT_HELPURL,
    "CONTROLS_REPEAT_INPUT_DO",
    ()=>CONTROLS_REPEAT_INPUT_DO,
    "CONTROLS_REPEAT_TITLE",
    ()=>CONTROLS_REPEAT_TITLE,
    "CONTROLS_REPEAT_TOOLTIP",
    ()=>CONTROLS_REPEAT_TOOLTIP,
    "CONTROLS_WHILEUNTIL_HELPURL",
    ()=>CONTROLS_WHILEUNTIL_HELPURL,
    "CONTROLS_WHILEUNTIL_INPUT_DO",
    ()=>CONTROLS_WHILEUNTIL_INPUT_DO,
    "CONTROLS_WHILEUNTIL_OPERATOR_UNTIL",
    ()=>CONTROLS_WHILEUNTIL_OPERATOR_UNTIL,
    "CONTROLS_WHILEUNTIL_OPERATOR_WHILE",
    ()=>CONTROLS_WHILEUNTIL_OPERATOR_WHILE,
    "CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL",
    ()=>CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL,
    "CONTROLS_WHILEUNTIL_TOOLTIP_WHILE",
    ()=>CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
    "CONTROL_KEY",
    ()=>CONTROL_KEY,
    "COPY_SHORTCUT",
    ()=>COPY_SHORTCUT,
    "CUT_SHORTCUT",
    ()=>CUT_SHORTCUT,
    "DELETE_ALL_BLOCKS",
    ()=>DELETE_ALL_BLOCKS,
    "DELETE_BLOCK",
    ()=>DELETE_BLOCK,
    "DELETE_VARIABLE",
    ()=>DELETE_VARIABLE,
    "DELETE_VARIABLE_CONFIRMATION",
    ()=>DELETE_VARIABLE_CONFIRMATION,
    "DELETE_X_BLOCKS",
    ()=>DELETE_X_BLOCKS,
    "DIALOG_CANCEL",
    ()=>DIALOG_CANCEL,
    "DIALOG_OK",
    ()=>DIALOG_OK,
    "DISABLE_BLOCK",
    ()=>DISABLE_BLOCK,
    "DUPLICATE_BLOCK",
    ()=>DUPLICATE_BLOCK,
    "DUPLICATE_COMMENT",
    ()=>DUPLICATE_COMMENT,
    "EDIT_BLOCK_CONTENTS",
    ()=>EDIT_BLOCK_CONTENTS,
    "ENABLE_BLOCK",
    ()=>ENABLE_BLOCK,
    "EXPAND_ALL",
    ()=>EXPAND_ALL,
    "EXPAND_BLOCK",
    ()=>EXPAND_BLOCK,
    "EXTERNAL_INPUTS",
    ()=>EXTERNAL_INPUTS,
    "HELP",
    ()=>HELP,
    "HELP_PROMPT",
    ()=>HELP_PROMPT,
    "INLINE_INPUTS",
    ()=>INLINE_INPUTS,
    "KEYBOARD_NAV_CONSTRAINED_MOVE_HINT",
    ()=>KEYBOARD_NAV_CONSTRAINED_MOVE_HINT,
    "KEYBOARD_NAV_COPIED_HINT",
    ()=>KEYBOARD_NAV_COPIED_HINT,
    "KEYBOARD_NAV_CUT_HINT",
    ()=>KEYBOARD_NAV_CUT_HINT,
    "KEYBOARD_NAV_UNCONSTRAINED_MOVE_HINT",
    ()=>KEYBOARD_NAV_UNCONSTRAINED_MOVE_HINT,
    "LINUX",
    ()=>LINUX,
    "LISTS_CREATE_EMPTY_HELPURL",
    ()=>LISTS_CREATE_EMPTY_HELPURL,
    "LISTS_CREATE_EMPTY_TITLE",
    ()=>LISTS_CREATE_EMPTY_TITLE,
    "LISTS_CREATE_EMPTY_TOOLTIP",
    ()=>LISTS_CREATE_EMPTY_TOOLTIP,
    "LISTS_CREATE_WITH_CONTAINER_TITLE_ADD",
    ()=>LISTS_CREATE_WITH_CONTAINER_TITLE_ADD,
    "LISTS_CREATE_WITH_CONTAINER_TOOLTIP",
    ()=>LISTS_CREATE_WITH_CONTAINER_TOOLTIP,
    "LISTS_CREATE_WITH_HELPURL",
    ()=>LISTS_CREATE_WITH_HELPURL,
    "LISTS_CREATE_WITH_INPUT_WITH",
    ()=>LISTS_CREATE_WITH_INPUT_WITH,
    "LISTS_CREATE_WITH_ITEM_TITLE",
    ()=>LISTS_CREATE_WITH_ITEM_TITLE,
    "LISTS_CREATE_WITH_ITEM_TOOLTIP",
    ()=>LISTS_CREATE_WITH_ITEM_TOOLTIP,
    "LISTS_CREATE_WITH_TOOLTIP",
    ()=>LISTS_CREATE_WITH_TOOLTIP,
    "LISTS_GET_INDEX_FIRST",
    ()=>LISTS_GET_INDEX_FIRST,
    "LISTS_GET_INDEX_FROM_END",
    ()=>LISTS_GET_INDEX_FROM_END,
    "LISTS_GET_INDEX_FROM_START",
    ()=>LISTS_GET_INDEX_FROM_START,
    "LISTS_GET_INDEX_GET",
    ()=>LISTS_GET_INDEX_GET,
    "LISTS_GET_INDEX_GET_REMOVE",
    ()=>LISTS_GET_INDEX_GET_REMOVE,
    "LISTS_GET_INDEX_HELPURL",
    ()=>LISTS_GET_INDEX_HELPURL,
    "LISTS_GET_INDEX_INPUT_IN_LIST",
    ()=>LISTS_GET_INDEX_INPUT_IN_LIST,
    "LISTS_GET_INDEX_LAST",
    ()=>LISTS_GET_INDEX_LAST,
    "LISTS_GET_INDEX_RANDOM",
    ()=>LISTS_GET_INDEX_RANDOM,
    "LISTS_GET_INDEX_REMOVE",
    ()=>LISTS_GET_INDEX_REMOVE,
    "LISTS_GET_INDEX_TAIL",
    ()=>LISTS_GET_INDEX_TAIL,
    "LISTS_GET_INDEX_TOOLTIP_GET_FIRST",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_FIRST,
    "LISTS_GET_INDEX_TOOLTIP_GET_FROM",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_FROM,
    "LISTS_GET_INDEX_TOOLTIP_GET_LAST",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_LAST,
    "LISTS_GET_INDEX_TOOLTIP_GET_RANDOM",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_RANDOM,
    "LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST,
    "LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM,
    "LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST,
    "LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM",
    ()=>LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM,
    "LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST",
    ()=>LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST,
    "LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM",
    ()=>LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM,
    "LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST",
    ()=>LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST,
    "LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM",
    ()=>LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM,
    "LISTS_GET_SUBLIST_END_FROM_END",
    ()=>LISTS_GET_SUBLIST_END_FROM_END,
    "LISTS_GET_SUBLIST_END_FROM_START",
    ()=>LISTS_GET_SUBLIST_END_FROM_START,
    "LISTS_GET_SUBLIST_END_LAST",
    ()=>LISTS_GET_SUBLIST_END_LAST,
    "LISTS_GET_SUBLIST_HELPURL",
    ()=>LISTS_GET_SUBLIST_HELPURL,
    "LISTS_GET_SUBLIST_INPUT_IN_LIST",
    ()=>LISTS_GET_SUBLIST_INPUT_IN_LIST,
    "LISTS_GET_SUBLIST_START_FIRST",
    ()=>LISTS_GET_SUBLIST_START_FIRST,
    "LISTS_GET_SUBLIST_START_FROM_END",
    ()=>LISTS_GET_SUBLIST_START_FROM_END,
    "LISTS_GET_SUBLIST_START_FROM_START",
    ()=>LISTS_GET_SUBLIST_START_FROM_START,
    "LISTS_GET_SUBLIST_TAIL",
    ()=>LISTS_GET_SUBLIST_TAIL,
    "LISTS_GET_SUBLIST_TOOLTIP",
    ()=>LISTS_GET_SUBLIST_TOOLTIP,
    "LISTS_HUE",
    ()=>LISTS_HUE,
    "LISTS_INDEX_FROM_END_TOOLTIP",
    ()=>LISTS_INDEX_FROM_END_TOOLTIP,
    "LISTS_INDEX_FROM_START_TOOLTIP",
    ()=>LISTS_INDEX_FROM_START_TOOLTIP,
    "LISTS_INDEX_OF_FIRST",
    ()=>LISTS_INDEX_OF_FIRST,
    "LISTS_INDEX_OF_HELPURL",
    ()=>LISTS_INDEX_OF_HELPURL,
    "LISTS_INDEX_OF_INPUT_IN_LIST",
    ()=>LISTS_INDEX_OF_INPUT_IN_LIST,
    "LISTS_INDEX_OF_LAST",
    ()=>LISTS_INDEX_OF_LAST,
    "LISTS_INDEX_OF_TOOLTIP",
    ()=>LISTS_INDEX_OF_TOOLTIP,
    "LISTS_INLIST",
    ()=>LISTS_INLIST,
    "LISTS_ISEMPTY_HELPURL",
    ()=>LISTS_ISEMPTY_HELPURL,
    "LISTS_ISEMPTY_TITLE",
    ()=>LISTS_ISEMPTY_TITLE,
    "LISTS_ISEMPTY_TOOLTIP",
    ()=>LISTS_ISEMPTY_TOOLTIP,
    "LISTS_LENGTH_HELPURL",
    ()=>LISTS_LENGTH_HELPURL,
    "LISTS_LENGTH_TITLE",
    ()=>LISTS_LENGTH_TITLE,
    "LISTS_LENGTH_TOOLTIP",
    ()=>LISTS_LENGTH_TOOLTIP,
    "LISTS_REPEAT_HELPURL",
    ()=>LISTS_REPEAT_HELPURL,
    "LISTS_REPEAT_TITLE",
    ()=>LISTS_REPEAT_TITLE,
    "LISTS_REPEAT_TOOLTIP",
    ()=>LISTS_REPEAT_TOOLTIP,
    "LISTS_REVERSE_HELPURL",
    ()=>LISTS_REVERSE_HELPURL,
    "LISTS_REVERSE_MESSAGE0",
    ()=>LISTS_REVERSE_MESSAGE0,
    "LISTS_REVERSE_TOOLTIP",
    ()=>LISTS_REVERSE_TOOLTIP,
    "LISTS_SET_INDEX_HELPURL",
    ()=>LISTS_SET_INDEX_HELPURL,
    "LISTS_SET_INDEX_INPUT_IN_LIST",
    ()=>LISTS_SET_INDEX_INPUT_IN_LIST,
    "LISTS_SET_INDEX_INPUT_TO",
    ()=>LISTS_SET_INDEX_INPUT_TO,
    "LISTS_SET_INDEX_INSERT",
    ()=>LISTS_SET_INDEX_INSERT,
    "LISTS_SET_INDEX_SET",
    ()=>LISTS_SET_INDEX_SET,
    "LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST",
    ()=>LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST,
    "LISTS_SET_INDEX_TOOLTIP_INSERT_FROM",
    ()=>LISTS_SET_INDEX_TOOLTIP_INSERT_FROM,
    "LISTS_SET_INDEX_TOOLTIP_INSERT_LAST",
    ()=>LISTS_SET_INDEX_TOOLTIP_INSERT_LAST,
    "LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM",
    ()=>LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM,
    "LISTS_SET_INDEX_TOOLTIP_SET_FIRST",
    ()=>LISTS_SET_INDEX_TOOLTIP_SET_FIRST,
    "LISTS_SET_INDEX_TOOLTIP_SET_FROM",
    ()=>LISTS_SET_INDEX_TOOLTIP_SET_FROM,
    "LISTS_SET_INDEX_TOOLTIP_SET_LAST",
    ()=>LISTS_SET_INDEX_TOOLTIP_SET_LAST,
    "LISTS_SET_INDEX_TOOLTIP_SET_RANDOM",
    ()=>LISTS_SET_INDEX_TOOLTIP_SET_RANDOM,
    "LISTS_SORT_HELPURL",
    ()=>LISTS_SORT_HELPURL,
    "LISTS_SORT_ORDER_ASCENDING",
    ()=>LISTS_SORT_ORDER_ASCENDING,
    "LISTS_SORT_ORDER_DESCENDING",
    ()=>LISTS_SORT_ORDER_DESCENDING,
    "LISTS_SORT_TITLE",
    ()=>LISTS_SORT_TITLE,
    "LISTS_SORT_TOOLTIP",
    ()=>LISTS_SORT_TOOLTIP,
    "LISTS_SORT_TYPE_IGNORECASE",
    ()=>LISTS_SORT_TYPE_IGNORECASE,
    "LISTS_SORT_TYPE_NUMERIC",
    ()=>LISTS_SORT_TYPE_NUMERIC,
    "LISTS_SORT_TYPE_TEXT",
    ()=>LISTS_SORT_TYPE_TEXT,
    "LISTS_SPLIT_HELPURL",
    ()=>LISTS_SPLIT_HELPURL,
    "LISTS_SPLIT_LIST_FROM_TEXT",
    ()=>LISTS_SPLIT_LIST_FROM_TEXT,
    "LISTS_SPLIT_TEXT_FROM_LIST",
    ()=>LISTS_SPLIT_TEXT_FROM_LIST,
    "LISTS_SPLIT_TOOLTIP_JOIN",
    ()=>LISTS_SPLIT_TOOLTIP_JOIN,
    "LISTS_SPLIT_TOOLTIP_SPLIT",
    ()=>LISTS_SPLIT_TOOLTIP_SPLIT,
    "LISTS_SPLIT_WITH_DELIMITER",
    ()=>LISTS_SPLIT_WITH_DELIMITER,
    "LOGIC_BOOLEAN_FALSE",
    ()=>LOGIC_BOOLEAN_FALSE,
    "LOGIC_BOOLEAN_HELPURL",
    ()=>LOGIC_BOOLEAN_HELPURL,
    "LOGIC_BOOLEAN_TOOLTIP",
    ()=>LOGIC_BOOLEAN_TOOLTIP,
    "LOGIC_BOOLEAN_TRUE",
    ()=>LOGIC_BOOLEAN_TRUE,
    "LOGIC_COMPARE_HELPURL",
    ()=>LOGIC_COMPARE_HELPURL,
    "LOGIC_COMPARE_TOOLTIP_EQ",
    ()=>LOGIC_COMPARE_TOOLTIP_EQ,
    "LOGIC_COMPARE_TOOLTIP_GT",
    ()=>LOGIC_COMPARE_TOOLTIP_GT,
    "LOGIC_COMPARE_TOOLTIP_GTE",
    ()=>LOGIC_COMPARE_TOOLTIP_GTE,
    "LOGIC_COMPARE_TOOLTIP_LT",
    ()=>LOGIC_COMPARE_TOOLTIP_LT,
    "LOGIC_COMPARE_TOOLTIP_LTE",
    ()=>LOGIC_COMPARE_TOOLTIP_LTE,
    "LOGIC_COMPARE_TOOLTIP_NEQ",
    ()=>LOGIC_COMPARE_TOOLTIP_NEQ,
    "LOGIC_HUE",
    ()=>LOGIC_HUE,
    "LOGIC_NEGATE_HELPURL",
    ()=>LOGIC_NEGATE_HELPURL,
    "LOGIC_NEGATE_TITLE",
    ()=>LOGIC_NEGATE_TITLE,
    "LOGIC_NEGATE_TOOLTIP",
    ()=>LOGIC_NEGATE_TOOLTIP,
    "LOGIC_NULL",
    ()=>LOGIC_NULL,
    "LOGIC_NULL_HELPURL",
    ()=>LOGIC_NULL_HELPURL,
    "LOGIC_NULL_TOOLTIP",
    ()=>LOGIC_NULL_TOOLTIP,
    "LOGIC_OPERATION_AND",
    ()=>LOGIC_OPERATION_AND,
    "LOGIC_OPERATION_HELPURL",
    ()=>LOGIC_OPERATION_HELPURL,
    "LOGIC_OPERATION_OR",
    ()=>LOGIC_OPERATION_OR,
    "LOGIC_OPERATION_TOOLTIP_AND",
    ()=>LOGIC_OPERATION_TOOLTIP_AND,
    "LOGIC_OPERATION_TOOLTIP_OR",
    ()=>LOGIC_OPERATION_TOOLTIP_OR,
    "LOGIC_TERNARY_CONDITION",
    ()=>LOGIC_TERNARY_CONDITION,
    "LOGIC_TERNARY_HELPURL",
    ()=>LOGIC_TERNARY_HELPURL,
    "LOGIC_TERNARY_IF_FALSE",
    ()=>LOGIC_TERNARY_IF_FALSE,
    "LOGIC_TERNARY_IF_TRUE",
    ()=>LOGIC_TERNARY_IF_TRUE,
    "LOGIC_TERNARY_TOOLTIP",
    ()=>LOGIC_TERNARY_TOOLTIP,
    "LOOPS_HUE",
    ()=>LOOPS_HUE,
    "MAC_OS",
    ()=>MAC_OS,
    "MATH_ADDITION_SYMBOL",
    ()=>MATH_ADDITION_SYMBOL,
    "MATH_ARITHMETIC_HELPURL",
    ()=>MATH_ARITHMETIC_HELPURL,
    "MATH_ARITHMETIC_TOOLTIP_ADD",
    ()=>MATH_ARITHMETIC_TOOLTIP_ADD,
    "MATH_ARITHMETIC_TOOLTIP_DIVIDE",
    ()=>MATH_ARITHMETIC_TOOLTIP_DIVIDE,
    "MATH_ARITHMETIC_TOOLTIP_MINUS",
    ()=>MATH_ARITHMETIC_TOOLTIP_MINUS,
    "MATH_ARITHMETIC_TOOLTIP_MULTIPLY",
    ()=>MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
    "MATH_ARITHMETIC_TOOLTIP_POWER",
    ()=>MATH_ARITHMETIC_TOOLTIP_POWER,
    "MATH_ATAN2_HELPURL",
    ()=>MATH_ATAN2_HELPURL,
    "MATH_ATAN2_TITLE",
    ()=>MATH_ATAN2_TITLE,
    "MATH_ATAN2_TOOLTIP",
    ()=>MATH_ATAN2_TOOLTIP,
    "MATH_CHANGE_HELPURL",
    ()=>MATH_CHANGE_HELPURL,
    "MATH_CHANGE_TITLE",
    ()=>MATH_CHANGE_TITLE,
    "MATH_CHANGE_TITLE_ITEM",
    ()=>MATH_CHANGE_TITLE_ITEM,
    "MATH_CHANGE_TOOLTIP",
    ()=>MATH_CHANGE_TOOLTIP,
    "MATH_CONSTANT_HELPURL",
    ()=>MATH_CONSTANT_HELPURL,
    "MATH_CONSTANT_TOOLTIP",
    ()=>MATH_CONSTANT_TOOLTIP,
    "MATH_CONSTRAIN_HELPURL",
    ()=>MATH_CONSTRAIN_HELPURL,
    "MATH_CONSTRAIN_TITLE",
    ()=>MATH_CONSTRAIN_TITLE,
    "MATH_CONSTRAIN_TOOLTIP",
    ()=>MATH_CONSTRAIN_TOOLTIP,
    "MATH_DIVISION_SYMBOL",
    ()=>MATH_DIVISION_SYMBOL,
    "MATH_HUE",
    ()=>MATH_HUE,
    "MATH_IS_DIVISIBLE_BY",
    ()=>MATH_IS_DIVISIBLE_BY,
    "MATH_IS_EVEN",
    ()=>MATH_IS_EVEN,
    "MATH_IS_NEGATIVE",
    ()=>MATH_IS_NEGATIVE,
    "MATH_IS_ODD",
    ()=>MATH_IS_ODD,
    "MATH_IS_POSITIVE",
    ()=>MATH_IS_POSITIVE,
    "MATH_IS_PRIME",
    ()=>MATH_IS_PRIME,
    "MATH_IS_TOOLTIP",
    ()=>MATH_IS_TOOLTIP,
    "MATH_IS_WHOLE",
    ()=>MATH_IS_WHOLE,
    "MATH_MODULO_HELPURL",
    ()=>MATH_MODULO_HELPURL,
    "MATH_MODULO_TITLE",
    ()=>MATH_MODULO_TITLE,
    "MATH_MODULO_TOOLTIP",
    ()=>MATH_MODULO_TOOLTIP,
    "MATH_MULTIPLICATION_SYMBOL",
    ()=>MATH_MULTIPLICATION_SYMBOL,
    "MATH_NUMBER_HELPURL",
    ()=>MATH_NUMBER_HELPURL,
    "MATH_NUMBER_TOOLTIP",
    ()=>MATH_NUMBER_TOOLTIP,
    "MATH_ONLIST_HELPURL",
    ()=>MATH_ONLIST_HELPURL,
    "MATH_ONLIST_OPERATOR_AVERAGE",
    ()=>MATH_ONLIST_OPERATOR_AVERAGE,
    "MATH_ONLIST_OPERATOR_MAX",
    ()=>MATH_ONLIST_OPERATOR_MAX,
    "MATH_ONLIST_OPERATOR_MEDIAN",
    ()=>MATH_ONLIST_OPERATOR_MEDIAN,
    "MATH_ONLIST_OPERATOR_MIN",
    ()=>MATH_ONLIST_OPERATOR_MIN,
    "MATH_ONLIST_OPERATOR_MODE",
    ()=>MATH_ONLIST_OPERATOR_MODE,
    "MATH_ONLIST_OPERATOR_RANDOM",
    ()=>MATH_ONLIST_OPERATOR_RANDOM,
    "MATH_ONLIST_OPERATOR_STD_DEV",
    ()=>MATH_ONLIST_OPERATOR_STD_DEV,
    "MATH_ONLIST_OPERATOR_SUM",
    ()=>MATH_ONLIST_OPERATOR_SUM,
    "MATH_ONLIST_TOOLTIP_AVERAGE",
    ()=>MATH_ONLIST_TOOLTIP_AVERAGE,
    "MATH_ONLIST_TOOLTIP_MAX",
    ()=>MATH_ONLIST_TOOLTIP_MAX,
    "MATH_ONLIST_TOOLTIP_MEDIAN",
    ()=>MATH_ONLIST_TOOLTIP_MEDIAN,
    "MATH_ONLIST_TOOLTIP_MIN",
    ()=>MATH_ONLIST_TOOLTIP_MIN,
    "MATH_ONLIST_TOOLTIP_MODE",
    ()=>MATH_ONLIST_TOOLTIP_MODE,
    "MATH_ONLIST_TOOLTIP_RANDOM",
    ()=>MATH_ONLIST_TOOLTIP_RANDOM,
    "MATH_ONLIST_TOOLTIP_STD_DEV",
    ()=>MATH_ONLIST_TOOLTIP_STD_DEV,
    "MATH_ONLIST_TOOLTIP_SUM",
    ()=>MATH_ONLIST_TOOLTIP_SUM,
    "MATH_POWER_SYMBOL",
    ()=>MATH_POWER_SYMBOL,
    "MATH_RANDOM_FLOAT_HELPURL",
    ()=>MATH_RANDOM_FLOAT_HELPURL,
    "MATH_RANDOM_FLOAT_TITLE_RANDOM",
    ()=>MATH_RANDOM_FLOAT_TITLE_RANDOM,
    "MATH_RANDOM_FLOAT_TOOLTIP",
    ()=>MATH_RANDOM_FLOAT_TOOLTIP,
    "MATH_RANDOM_INT_HELPURL",
    ()=>MATH_RANDOM_INT_HELPURL,
    "MATH_RANDOM_INT_TITLE",
    ()=>MATH_RANDOM_INT_TITLE,
    "MATH_RANDOM_INT_TOOLTIP",
    ()=>MATH_RANDOM_INT_TOOLTIP,
    "MATH_ROUND_HELPURL",
    ()=>MATH_ROUND_HELPURL,
    "MATH_ROUND_OPERATOR_ROUND",
    ()=>MATH_ROUND_OPERATOR_ROUND,
    "MATH_ROUND_OPERATOR_ROUNDDOWN",
    ()=>MATH_ROUND_OPERATOR_ROUNDDOWN,
    "MATH_ROUND_OPERATOR_ROUNDUP",
    ()=>MATH_ROUND_OPERATOR_ROUNDUP,
    "MATH_ROUND_TOOLTIP",
    ()=>MATH_ROUND_TOOLTIP,
    "MATH_SINGLE_HELPURL",
    ()=>MATH_SINGLE_HELPURL,
    "MATH_SINGLE_OP_ABSOLUTE",
    ()=>MATH_SINGLE_OP_ABSOLUTE,
    "MATH_SINGLE_OP_ROOT",
    ()=>MATH_SINGLE_OP_ROOT,
    "MATH_SINGLE_TOOLTIP_ABS",
    ()=>MATH_SINGLE_TOOLTIP_ABS,
    "MATH_SINGLE_TOOLTIP_EXP",
    ()=>MATH_SINGLE_TOOLTIP_EXP,
    "MATH_SINGLE_TOOLTIP_LN",
    ()=>MATH_SINGLE_TOOLTIP_LN,
    "MATH_SINGLE_TOOLTIP_LOG10",
    ()=>MATH_SINGLE_TOOLTIP_LOG10,
    "MATH_SINGLE_TOOLTIP_NEG",
    ()=>MATH_SINGLE_TOOLTIP_NEG,
    "MATH_SINGLE_TOOLTIP_POW10",
    ()=>MATH_SINGLE_TOOLTIP_POW10,
    "MATH_SINGLE_TOOLTIP_ROOT",
    ()=>MATH_SINGLE_TOOLTIP_ROOT,
    "MATH_SUBTRACTION_SYMBOL",
    ()=>MATH_SUBTRACTION_SYMBOL,
    "MATH_TRIG_ACOS",
    ()=>MATH_TRIG_ACOS,
    "MATH_TRIG_ASIN",
    ()=>MATH_TRIG_ASIN,
    "MATH_TRIG_ATAN",
    ()=>MATH_TRIG_ATAN,
    "MATH_TRIG_COS",
    ()=>MATH_TRIG_COS,
    "MATH_TRIG_HELPURL",
    ()=>MATH_TRIG_HELPURL,
    "MATH_TRIG_SIN",
    ()=>MATH_TRIG_SIN,
    "MATH_TRIG_TAN",
    ()=>MATH_TRIG_TAN,
    "MATH_TRIG_TOOLTIP_ACOS",
    ()=>MATH_TRIG_TOOLTIP_ACOS,
    "MATH_TRIG_TOOLTIP_ASIN",
    ()=>MATH_TRIG_TOOLTIP_ASIN,
    "MATH_TRIG_TOOLTIP_ATAN",
    ()=>MATH_TRIG_TOOLTIP_ATAN,
    "MATH_TRIG_TOOLTIP_COS",
    ()=>MATH_TRIG_TOOLTIP_COS,
    "MATH_TRIG_TOOLTIP_SIN",
    ()=>MATH_TRIG_TOOLTIP_SIN,
    "MATH_TRIG_TOOLTIP_TAN",
    ()=>MATH_TRIG_TOOLTIP_TAN,
    "MOVE_BLOCK",
    ()=>MOVE_BLOCK,
    "NEW_COLOUR_VARIABLE",
    ()=>NEW_COLOUR_VARIABLE,
    "NEW_NUMBER_VARIABLE",
    ()=>NEW_NUMBER_VARIABLE,
    "NEW_STRING_VARIABLE",
    ()=>NEW_STRING_VARIABLE,
    "NEW_VARIABLE",
    ()=>NEW_VARIABLE,
    "NEW_VARIABLE_TITLE",
    ()=>NEW_VARIABLE_TITLE,
    "NEW_VARIABLE_TYPE_TITLE",
    ()=>NEW_VARIABLE_TYPE_TITLE,
    "OPTION_KEY",
    ()=>OPTION_KEY,
    "ORDINAL_NUMBER_SUFFIX",
    ()=>ORDINAL_NUMBER_SUFFIX,
    "PASTE_SHORTCUT",
    ()=>PASTE_SHORTCUT,
    "PROCEDURES_ALLOW_STATEMENTS",
    ()=>PROCEDURES_ALLOW_STATEMENTS,
    "PROCEDURES_BEFORE_PARAMS",
    ()=>PROCEDURES_BEFORE_PARAMS,
    "PROCEDURES_CALLNORETURN_HELPURL",
    ()=>PROCEDURES_CALLNORETURN_HELPURL,
    "PROCEDURES_CALLNORETURN_TOOLTIP",
    ()=>PROCEDURES_CALLNORETURN_TOOLTIP,
    "PROCEDURES_CALLRETURN_HELPURL",
    ()=>PROCEDURES_CALLRETURN_HELPURL,
    "PROCEDURES_CALLRETURN_TOOLTIP",
    ()=>PROCEDURES_CALLRETURN_TOOLTIP,
    "PROCEDURES_CALL_BEFORE_PARAMS",
    ()=>PROCEDURES_CALL_BEFORE_PARAMS,
    "PROCEDURES_CALL_DISABLED_DEF_WARNING",
    ()=>PROCEDURES_CALL_DISABLED_DEF_WARNING,
    "PROCEDURES_CREATE_DO",
    ()=>PROCEDURES_CREATE_DO,
    "PROCEDURES_DEFNORETURN_COMMENT",
    ()=>PROCEDURES_DEFNORETURN_COMMENT,
    "PROCEDURES_DEFNORETURN_DO",
    ()=>PROCEDURES_DEFNORETURN_DO,
    "PROCEDURES_DEFNORETURN_HELPURL",
    ()=>PROCEDURES_DEFNORETURN_HELPURL,
    "PROCEDURES_DEFNORETURN_PROCEDURE",
    ()=>PROCEDURES_DEFNORETURN_PROCEDURE,
    "PROCEDURES_DEFNORETURN_TITLE",
    ()=>PROCEDURES_DEFNORETURN_TITLE,
    "PROCEDURES_DEFNORETURN_TOOLTIP",
    ()=>PROCEDURES_DEFNORETURN_TOOLTIP,
    "PROCEDURES_DEFRETURN_COMMENT",
    ()=>PROCEDURES_DEFRETURN_COMMENT,
    "PROCEDURES_DEFRETURN_DO",
    ()=>PROCEDURES_DEFRETURN_DO,
    "PROCEDURES_DEFRETURN_HELPURL",
    ()=>PROCEDURES_DEFRETURN_HELPURL,
    "PROCEDURES_DEFRETURN_PROCEDURE",
    ()=>PROCEDURES_DEFRETURN_PROCEDURE,
    "PROCEDURES_DEFRETURN_RETURN",
    ()=>PROCEDURES_DEFRETURN_RETURN,
    "PROCEDURES_DEFRETURN_TITLE",
    ()=>PROCEDURES_DEFRETURN_TITLE,
    "PROCEDURES_DEFRETURN_TOOLTIP",
    ()=>PROCEDURES_DEFRETURN_TOOLTIP,
    "PROCEDURES_DEF_DUPLICATE_WARNING",
    ()=>PROCEDURES_DEF_DUPLICATE_WARNING,
    "PROCEDURES_HIGHLIGHT_DEF",
    ()=>PROCEDURES_HIGHLIGHT_DEF,
    "PROCEDURES_HUE",
    ()=>PROCEDURES_HUE,
    "PROCEDURES_IFRETURN_HELPURL",
    ()=>PROCEDURES_IFRETURN_HELPURL,
    "PROCEDURES_IFRETURN_TOOLTIP",
    ()=>PROCEDURES_IFRETURN_TOOLTIP,
    "PROCEDURES_IFRETURN_WARNING",
    ()=>PROCEDURES_IFRETURN_WARNING,
    "PROCEDURES_MUTATORARG_TITLE",
    ()=>PROCEDURES_MUTATORARG_TITLE,
    "PROCEDURES_MUTATORARG_TOOLTIP",
    ()=>PROCEDURES_MUTATORARG_TOOLTIP,
    "PROCEDURES_MUTATORCONTAINER_TITLE",
    ()=>PROCEDURES_MUTATORCONTAINER_TITLE,
    "PROCEDURES_MUTATORCONTAINER_TOOLTIP",
    ()=>PROCEDURES_MUTATORCONTAINER_TOOLTIP,
    "REDO",
    ()=>REDO,
    "REMOVE_COMMENT",
    ()=>REMOVE_COMMENT,
    "RENAME_VARIABLE",
    ()=>RENAME_VARIABLE,
    "RENAME_VARIABLE_TITLE",
    ()=>RENAME_VARIABLE_TITLE,
    "SHORTCUTS_CODE_NAVIGATION",
    ()=>SHORTCUTS_CODE_NAVIGATION,
    "SHORTCUTS_EDITING",
    ()=>SHORTCUTS_EDITING,
    "SHORTCUTS_GENERAL",
    ()=>SHORTCUTS_GENERAL,
    "TEXTS_HUE",
    ()=>TEXTS_HUE,
    "TEXT_APPEND_HELPURL",
    ()=>TEXT_APPEND_HELPURL,
    "TEXT_APPEND_TITLE",
    ()=>TEXT_APPEND_TITLE,
    "TEXT_APPEND_TOOLTIP",
    ()=>TEXT_APPEND_TOOLTIP,
    "TEXT_APPEND_VARIABLE",
    ()=>TEXT_APPEND_VARIABLE,
    "TEXT_CHANGECASE_HELPURL",
    ()=>TEXT_CHANGECASE_HELPURL,
    "TEXT_CHANGECASE_OPERATOR_LOWERCASE",
    ()=>TEXT_CHANGECASE_OPERATOR_LOWERCASE,
    "TEXT_CHANGECASE_OPERATOR_TITLECASE",
    ()=>TEXT_CHANGECASE_OPERATOR_TITLECASE,
    "TEXT_CHANGECASE_OPERATOR_UPPERCASE",
    ()=>TEXT_CHANGECASE_OPERATOR_UPPERCASE,
    "TEXT_CHANGECASE_TOOLTIP",
    ()=>TEXT_CHANGECASE_TOOLTIP,
    "TEXT_CHARAT_FIRST",
    ()=>TEXT_CHARAT_FIRST,
    "TEXT_CHARAT_FROM_END",
    ()=>TEXT_CHARAT_FROM_END,
    "TEXT_CHARAT_FROM_START",
    ()=>TEXT_CHARAT_FROM_START,
    "TEXT_CHARAT_HELPURL",
    ()=>TEXT_CHARAT_HELPURL,
    "TEXT_CHARAT_LAST",
    ()=>TEXT_CHARAT_LAST,
    "TEXT_CHARAT_RANDOM",
    ()=>TEXT_CHARAT_RANDOM,
    "TEXT_CHARAT_TAIL",
    ()=>TEXT_CHARAT_TAIL,
    "TEXT_CHARAT_TITLE",
    ()=>TEXT_CHARAT_TITLE,
    "TEXT_CHARAT_TOOLTIP",
    ()=>TEXT_CHARAT_TOOLTIP,
    "TEXT_COUNT_HELPURL",
    ()=>TEXT_COUNT_HELPURL,
    "TEXT_COUNT_MESSAGE0",
    ()=>TEXT_COUNT_MESSAGE0,
    "TEXT_COUNT_TOOLTIP",
    ()=>TEXT_COUNT_TOOLTIP,
    "TEXT_CREATE_JOIN_ITEM_TITLE_ITEM",
    ()=>TEXT_CREATE_JOIN_ITEM_TITLE_ITEM,
    "TEXT_CREATE_JOIN_ITEM_TOOLTIP",
    ()=>TEXT_CREATE_JOIN_ITEM_TOOLTIP,
    "TEXT_CREATE_JOIN_TITLE_JOIN",
    ()=>TEXT_CREATE_JOIN_TITLE_JOIN,
    "TEXT_CREATE_JOIN_TOOLTIP",
    ()=>TEXT_CREATE_JOIN_TOOLTIP,
    "TEXT_GET_SUBSTRING_END_FROM_END",
    ()=>TEXT_GET_SUBSTRING_END_FROM_END,
    "TEXT_GET_SUBSTRING_END_FROM_START",
    ()=>TEXT_GET_SUBSTRING_END_FROM_START,
    "TEXT_GET_SUBSTRING_END_LAST",
    ()=>TEXT_GET_SUBSTRING_END_LAST,
    "TEXT_GET_SUBSTRING_HELPURL",
    ()=>TEXT_GET_SUBSTRING_HELPURL,
    "TEXT_GET_SUBSTRING_INPUT_IN_TEXT",
    ()=>TEXT_GET_SUBSTRING_INPUT_IN_TEXT,
    "TEXT_GET_SUBSTRING_START_FIRST",
    ()=>TEXT_GET_SUBSTRING_START_FIRST,
    "TEXT_GET_SUBSTRING_START_FROM_END",
    ()=>TEXT_GET_SUBSTRING_START_FROM_END,
    "TEXT_GET_SUBSTRING_START_FROM_START",
    ()=>TEXT_GET_SUBSTRING_START_FROM_START,
    "TEXT_GET_SUBSTRING_TAIL",
    ()=>TEXT_GET_SUBSTRING_TAIL,
    "TEXT_GET_SUBSTRING_TOOLTIP",
    ()=>TEXT_GET_SUBSTRING_TOOLTIP,
    "TEXT_INDEXOF_HELPURL",
    ()=>TEXT_INDEXOF_HELPURL,
    "TEXT_INDEXOF_OPERATOR_FIRST",
    ()=>TEXT_INDEXOF_OPERATOR_FIRST,
    "TEXT_INDEXOF_OPERATOR_LAST",
    ()=>TEXT_INDEXOF_OPERATOR_LAST,
    "TEXT_INDEXOF_TITLE",
    ()=>TEXT_INDEXOF_TITLE,
    "TEXT_INDEXOF_TOOLTIP",
    ()=>TEXT_INDEXOF_TOOLTIP,
    "TEXT_ISEMPTY_HELPURL",
    ()=>TEXT_ISEMPTY_HELPURL,
    "TEXT_ISEMPTY_TITLE",
    ()=>TEXT_ISEMPTY_TITLE,
    "TEXT_ISEMPTY_TOOLTIP",
    ()=>TEXT_ISEMPTY_TOOLTIP,
    "TEXT_JOIN_HELPURL",
    ()=>TEXT_JOIN_HELPURL,
    "TEXT_JOIN_TITLE_CREATEWITH",
    ()=>TEXT_JOIN_TITLE_CREATEWITH,
    "TEXT_JOIN_TOOLTIP",
    ()=>TEXT_JOIN_TOOLTIP,
    "TEXT_LENGTH_HELPURL",
    ()=>TEXT_LENGTH_HELPURL,
    "TEXT_LENGTH_TITLE",
    ()=>TEXT_LENGTH_TITLE,
    "TEXT_LENGTH_TOOLTIP",
    ()=>TEXT_LENGTH_TOOLTIP,
    "TEXT_PRINT_HELPURL",
    ()=>TEXT_PRINT_HELPURL,
    "TEXT_PRINT_TITLE",
    ()=>TEXT_PRINT_TITLE,
    "TEXT_PRINT_TOOLTIP",
    ()=>TEXT_PRINT_TOOLTIP,
    "TEXT_PROMPT_HELPURL",
    ()=>TEXT_PROMPT_HELPURL,
    "TEXT_PROMPT_TOOLTIP_NUMBER",
    ()=>TEXT_PROMPT_TOOLTIP_NUMBER,
    "TEXT_PROMPT_TOOLTIP_TEXT",
    ()=>TEXT_PROMPT_TOOLTIP_TEXT,
    "TEXT_PROMPT_TYPE_NUMBER",
    ()=>TEXT_PROMPT_TYPE_NUMBER,
    "TEXT_PROMPT_TYPE_TEXT",
    ()=>TEXT_PROMPT_TYPE_TEXT,
    "TEXT_REPLACE_HELPURL",
    ()=>TEXT_REPLACE_HELPURL,
    "TEXT_REPLACE_MESSAGE0",
    ()=>TEXT_REPLACE_MESSAGE0,
    "TEXT_REPLACE_TOOLTIP",
    ()=>TEXT_REPLACE_TOOLTIP,
    "TEXT_REVERSE_HELPURL",
    ()=>TEXT_REVERSE_HELPURL,
    "TEXT_REVERSE_MESSAGE0",
    ()=>TEXT_REVERSE_MESSAGE0,
    "TEXT_REVERSE_TOOLTIP",
    ()=>TEXT_REVERSE_TOOLTIP,
    "TEXT_TEXT_HELPURL",
    ()=>TEXT_TEXT_HELPURL,
    "TEXT_TEXT_TOOLTIP",
    ()=>TEXT_TEXT_TOOLTIP,
    "TEXT_TRIM_HELPURL",
    ()=>TEXT_TRIM_HELPURL,
    "TEXT_TRIM_OPERATOR_BOTH",
    ()=>TEXT_TRIM_OPERATOR_BOTH,
    "TEXT_TRIM_OPERATOR_LEFT",
    ()=>TEXT_TRIM_OPERATOR_LEFT,
    "TEXT_TRIM_OPERATOR_RIGHT",
    ()=>TEXT_TRIM_OPERATOR_RIGHT,
    "TEXT_TRIM_TOOLTIP",
    ()=>TEXT_TRIM_TOOLTIP,
    "TODAY",
    ()=>TODAY,
    "UNDO",
    ()=>UNDO,
    "UNKNOWN",
    ()=>UNKNOWN,
    "UNNAMED_KEY",
    ()=>UNNAMED_KEY,
    "VARIABLES_DEFAULT_NAME",
    ()=>VARIABLES_DEFAULT_NAME,
    "VARIABLES_DYNAMIC_HUE",
    ()=>VARIABLES_DYNAMIC_HUE,
    "VARIABLES_GET_CREATE_SET",
    ()=>VARIABLES_GET_CREATE_SET,
    "VARIABLES_GET_HELPURL",
    ()=>VARIABLES_GET_HELPURL,
    "VARIABLES_GET_TOOLTIP",
    ()=>VARIABLES_GET_TOOLTIP,
    "VARIABLES_HUE",
    ()=>VARIABLES_HUE,
    "VARIABLES_SET",
    ()=>VARIABLES_SET,
    "VARIABLES_SET_CREATE_GET",
    ()=>VARIABLES_SET_CREATE_GET,
    "VARIABLES_SET_HELPURL",
    ()=>VARIABLES_SET_HELPURL,
    "VARIABLES_SET_TOOLTIP",
    ()=>VARIABLES_SET_TOOLTIP,
    "VARIABLE_ALREADY_EXISTS",
    ()=>VARIABLE_ALREADY_EXISTS,
    "VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE",
    ()=>VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE,
    "VARIABLE_ALREADY_EXISTS_FOR_A_PARAMETER",
    ()=>VARIABLE_ALREADY_EXISTS_FOR_A_PARAMETER,
    "WINDOWS",
    ()=>WINDOWS,
    "WORKSPACE_ARIA_LABEL",
    ()=>WORKSPACE_ARIA_LABEL,
    "WORKSPACE_COMMENT_DEFAULT_TEXT",
    ()=>WORKSPACE_COMMENT_DEFAULT_TEXT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$msg$2f$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/.pnpm/blockly@12.3.1/node_modules/blockly/msg/en.js [app-client] (ecmascript)");
;
const { LOGIC_HUE, LOOPS_HUE, MATH_HUE, TEXTS_HUE, LISTS_HUE, COLOUR_HUE, VARIABLES_HUE, VARIABLES_DYNAMIC_HUE, PROCEDURES_HUE, VARIABLES_DEFAULT_NAME, UNNAMED_KEY, TODAY, DUPLICATE_BLOCK, ADD_COMMENT, REMOVE_COMMENT, DUPLICATE_COMMENT, EXTERNAL_INPUTS, INLINE_INPUTS, DELETE_BLOCK, DELETE_X_BLOCKS, DELETE_ALL_BLOCKS, CLEAN_UP, CLOSE, COLLAPSE_BLOCK, COLLAPSE_ALL, EXPAND_BLOCK, EXPAND_ALL, DISABLE_BLOCK, ENABLE_BLOCK, HELP, UNDO, REDO, CHANGE_VALUE_TITLE, RENAME_VARIABLE, RENAME_VARIABLE_TITLE, NEW_VARIABLE, NEW_STRING_VARIABLE, NEW_NUMBER_VARIABLE, NEW_COLOUR_VARIABLE, NEW_VARIABLE_TYPE_TITLE, NEW_VARIABLE_TITLE, VARIABLE_ALREADY_EXISTS, VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE, VARIABLE_ALREADY_EXISTS_FOR_A_PARAMETER, DELETE_VARIABLE_CONFIRMATION, CANNOT_DELETE_VARIABLE_PROCEDURE, DELETE_VARIABLE, COLOUR_PICKER_HELPURL, COLOUR_PICKER_TOOLTIP, COLOUR_RANDOM_HELPURL, COLOUR_RANDOM_TITLE, COLOUR_RANDOM_TOOLTIP, COLOUR_RGB_HELPURL, COLOUR_RGB_TITLE, COLOUR_RGB_RED, COLOUR_RGB_GREEN, COLOUR_RGB_BLUE, COLOUR_RGB_TOOLTIP, COLOUR_BLEND_HELPURL, COLOUR_BLEND_TITLE, COLOUR_BLEND_COLOUR1, COLOUR_BLEND_COLOUR2, COLOUR_BLEND_RATIO, COLOUR_BLEND_TOOLTIP, CONTROLS_REPEAT_HELPURL, CONTROLS_REPEAT_TITLE, CONTROLS_REPEAT_INPUT_DO, CONTROLS_REPEAT_TOOLTIP, CONTROLS_WHILEUNTIL_HELPURL, CONTROLS_WHILEUNTIL_INPUT_DO, CONTROLS_WHILEUNTIL_OPERATOR_WHILE, CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, CONTROLS_WHILEUNTIL_TOOLTIP_WHILE, CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL, CONTROLS_FOR_HELPURL, CONTROLS_FOR_TOOLTIP, CONTROLS_FOR_TITLE, CONTROLS_FOR_INPUT_DO, CONTROLS_FOREACH_HELPURL, CONTROLS_FOREACH_TITLE, CONTROLS_FOREACH_INPUT_DO, CONTROLS_FOREACH_TOOLTIP, CONTROLS_FLOW_STATEMENTS_HELPURL, CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK, CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE, CONTROLS_FLOW_STATEMENTS_WARNING, CONTROLS_IF_HELPURL, CONTROLS_IF_TOOLTIP_1, CONTROLS_IF_TOOLTIP_2, CONTROLS_IF_TOOLTIP_3, CONTROLS_IF_TOOLTIP_4, CONTROLS_IF_MSG_IF, CONTROLS_IF_MSG_ELSEIF, CONTROLS_IF_MSG_ELSE, CONTROLS_IF_MSG_THEN, CONTROLS_IF_IF_TITLE_IF, CONTROLS_IF_IF_TOOLTIP, CONTROLS_IF_ELSEIF_TITLE_ELSEIF, CONTROLS_IF_ELSEIF_TOOLTIP, CONTROLS_IF_ELSE_TITLE_ELSE, CONTROLS_IF_ELSE_TOOLTIP, LOGIC_COMPARE_HELPURL, LOGIC_COMPARE_TOOLTIP_EQ, LOGIC_COMPARE_TOOLTIP_NEQ, LOGIC_COMPARE_TOOLTIP_LT, LOGIC_COMPARE_TOOLTIP_LTE, LOGIC_COMPARE_TOOLTIP_GT, LOGIC_COMPARE_TOOLTIP_GTE, LOGIC_OPERATION_HELPURL, LOGIC_OPERATION_TOOLTIP_AND, LOGIC_OPERATION_AND, LOGIC_OPERATION_TOOLTIP_OR, LOGIC_OPERATION_OR, LOGIC_NEGATE_HELPURL, LOGIC_NEGATE_TITLE, LOGIC_NEGATE_TOOLTIP, LOGIC_BOOLEAN_HELPURL, LOGIC_BOOLEAN_TRUE, LOGIC_BOOLEAN_FALSE, LOGIC_BOOLEAN_TOOLTIP, LOGIC_NULL_HELPURL, LOGIC_NULL, LOGIC_NULL_TOOLTIP, LOGIC_TERNARY_HELPURL, LOGIC_TERNARY_CONDITION, LOGIC_TERNARY_IF_TRUE, LOGIC_TERNARY_IF_FALSE, LOGIC_TERNARY_TOOLTIP, MATH_NUMBER_HELPURL, MATH_NUMBER_TOOLTIP, MATH_ADDITION_SYMBOL, MATH_SUBTRACTION_SYMBOL, MATH_DIVISION_SYMBOL, MATH_MULTIPLICATION_SYMBOL, MATH_POWER_SYMBOL, MATH_TRIG_SIN, MATH_TRIG_COS, MATH_TRIG_TAN, MATH_TRIG_ASIN, MATH_TRIG_ACOS, MATH_TRIG_ATAN, MATH_ARITHMETIC_HELPURL, MATH_ARITHMETIC_TOOLTIP_ADD, MATH_ARITHMETIC_TOOLTIP_MINUS, MATH_ARITHMETIC_TOOLTIP_MULTIPLY, MATH_ARITHMETIC_TOOLTIP_DIVIDE, MATH_ARITHMETIC_TOOLTIP_POWER, MATH_SINGLE_HELPURL, MATH_SINGLE_OP_ROOT, MATH_SINGLE_TOOLTIP_ROOT, MATH_SINGLE_OP_ABSOLUTE, MATH_SINGLE_TOOLTIP_ABS, MATH_SINGLE_TOOLTIP_NEG, MATH_SINGLE_TOOLTIP_LN, MATH_SINGLE_TOOLTIP_LOG10, MATH_SINGLE_TOOLTIP_EXP, MATH_SINGLE_TOOLTIP_POW10, MATH_TRIG_HELPURL, MATH_TRIG_TOOLTIP_SIN, MATH_TRIG_TOOLTIP_COS, MATH_TRIG_TOOLTIP_TAN, MATH_TRIG_TOOLTIP_ASIN, MATH_TRIG_TOOLTIP_ACOS, MATH_TRIG_TOOLTIP_ATAN, MATH_CONSTANT_HELPURL, MATH_CONSTANT_TOOLTIP, MATH_IS_EVEN, MATH_IS_ODD, MATH_IS_PRIME, MATH_IS_WHOLE, MATH_IS_POSITIVE, MATH_IS_NEGATIVE, MATH_IS_DIVISIBLE_BY, MATH_IS_TOOLTIP, MATH_CHANGE_HELPURL, MATH_CHANGE_TITLE, MATH_CHANGE_TITLE_ITEM, MATH_CHANGE_TOOLTIP, MATH_ROUND_HELPURL, MATH_ROUND_TOOLTIP, MATH_ROUND_OPERATOR_ROUND, MATH_ROUND_OPERATOR_ROUNDUP, MATH_ROUND_OPERATOR_ROUNDDOWN, MATH_ONLIST_HELPURL, MATH_ONLIST_OPERATOR_SUM, MATH_ONLIST_TOOLTIP_SUM, MATH_ONLIST_OPERATOR_MIN, MATH_ONLIST_TOOLTIP_MIN, MATH_ONLIST_OPERATOR_MAX, MATH_ONLIST_TOOLTIP_MAX, MATH_ONLIST_OPERATOR_AVERAGE, MATH_ONLIST_TOOLTIP_AVERAGE, MATH_ONLIST_OPERATOR_MEDIAN, MATH_ONLIST_TOOLTIP_MEDIAN, MATH_ONLIST_OPERATOR_MODE, MATH_ONLIST_TOOLTIP_MODE, MATH_ONLIST_OPERATOR_STD_DEV, MATH_ONLIST_TOOLTIP_STD_DEV, MATH_ONLIST_OPERATOR_RANDOM, MATH_ONLIST_TOOLTIP_RANDOM, MATH_MODULO_HELPURL, MATH_MODULO_TITLE, MATH_MODULO_TOOLTIP, MATH_CONSTRAIN_HELPURL, MATH_CONSTRAIN_TITLE, MATH_CONSTRAIN_TOOLTIP, MATH_RANDOM_INT_HELPURL, MATH_RANDOM_INT_TITLE, MATH_RANDOM_INT_TOOLTIP, MATH_RANDOM_FLOAT_HELPURL, MATH_RANDOM_FLOAT_TITLE_RANDOM, MATH_RANDOM_FLOAT_TOOLTIP, MATH_ATAN2_HELPURL, MATH_ATAN2_TITLE, MATH_ATAN2_TOOLTIP, TEXT_TEXT_HELPURL, TEXT_TEXT_TOOLTIP, TEXT_JOIN_HELPURL, TEXT_JOIN_TITLE_CREATEWITH, TEXT_JOIN_TOOLTIP, TEXT_CREATE_JOIN_TITLE_JOIN, TEXT_CREATE_JOIN_TOOLTIP, TEXT_CREATE_JOIN_ITEM_TITLE_ITEM, TEXT_CREATE_JOIN_ITEM_TOOLTIP, TEXT_APPEND_HELPURL, TEXT_APPEND_TITLE, TEXT_APPEND_VARIABLE, TEXT_APPEND_TOOLTIP, TEXT_LENGTH_HELPURL, TEXT_LENGTH_TITLE, TEXT_LENGTH_TOOLTIP, TEXT_ISEMPTY_HELPURL, TEXT_ISEMPTY_TITLE, TEXT_ISEMPTY_TOOLTIP, TEXT_INDEXOF_HELPURL, TEXT_INDEXOF_TOOLTIP, TEXT_INDEXOF_TITLE, TEXT_INDEXOF_OPERATOR_FIRST, TEXT_INDEXOF_OPERATOR_LAST, TEXT_CHARAT_HELPURL, TEXT_CHARAT_TITLE, TEXT_CHARAT_FROM_START, TEXT_CHARAT_FROM_END, TEXT_CHARAT_FIRST, TEXT_CHARAT_LAST, TEXT_CHARAT_RANDOM, TEXT_CHARAT_TAIL, TEXT_CHARAT_TOOLTIP, TEXT_GET_SUBSTRING_TOOLTIP, TEXT_GET_SUBSTRING_HELPURL, TEXT_GET_SUBSTRING_INPUT_IN_TEXT, TEXT_GET_SUBSTRING_START_FROM_START, TEXT_GET_SUBSTRING_START_FROM_END, TEXT_GET_SUBSTRING_START_FIRST, TEXT_GET_SUBSTRING_END_FROM_START, TEXT_GET_SUBSTRING_END_FROM_END, TEXT_GET_SUBSTRING_END_LAST, TEXT_GET_SUBSTRING_TAIL, TEXT_CHANGECASE_HELPURL, TEXT_CHANGECASE_TOOLTIP, TEXT_CHANGECASE_OPERATOR_UPPERCASE, TEXT_CHANGECASE_OPERATOR_LOWERCASE, TEXT_CHANGECASE_OPERATOR_TITLECASE, TEXT_TRIM_HELPURL, TEXT_TRIM_TOOLTIP, TEXT_TRIM_OPERATOR_BOTH, TEXT_TRIM_OPERATOR_LEFT, TEXT_TRIM_OPERATOR_RIGHT, TEXT_PRINT_HELPURL, TEXT_PRINT_TITLE, TEXT_PRINT_TOOLTIP, TEXT_PROMPT_HELPURL, TEXT_PROMPT_TYPE_TEXT, TEXT_PROMPT_TYPE_NUMBER, TEXT_PROMPT_TOOLTIP_NUMBER, TEXT_PROMPT_TOOLTIP_TEXT, TEXT_COUNT_MESSAGE0, TEXT_COUNT_HELPURL, TEXT_COUNT_TOOLTIP, TEXT_REPLACE_MESSAGE0, TEXT_REPLACE_HELPURL, TEXT_REPLACE_TOOLTIP, TEXT_REVERSE_MESSAGE0, TEXT_REVERSE_HELPURL, TEXT_REVERSE_TOOLTIP, LISTS_CREATE_EMPTY_HELPURL, LISTS_CREATE_EMPTY_TITLE, LISTS_CREATE_EMPTY_TOOLTIP, LISTS_CREATE_WITH_HELPURL, LISTS_CREATE_WITH_TOOLTIP, LISTS_CREATE_WITH_INPUT_WITH, LISTS_CREATE_WITH_CONTAINER_TITLE_ADD, LISTS_CREATE_WITH_CONTAINER_TOOLTIP, LISTS_CREATE_WITH_ITEM_TITLE, LISTS_CREATE_WITH_ITEM_TOOLTIP, LISTS_REPEAT_HELPURL, LISTS_REPEAT_TOOLTIP, LISTS_REPEAT_TITLE, LISTS_LENGTH_HELPURL, LISTS_LENGTH_TITLE, LISTS_LENGTH_TOOLTIP, LISTS_ISEMPTY_HELPURL, LISTS_ISEMPTY_TITLE, LISTS_ISEMPTY_TOOLTIP, LISTS_INLIST, LISTS_INDEX_OF_HELPURL, LISTS_INDEX_OF_INPUT_IN_LIST, LISTS_INDEX_OF_FIRST, LISTS_INDEX_OF_LAST, LISTS_INDEX_OF_TOOLTIP, LISTS_GET_INDEX_HELPURL, LISTS_GET_INDEX_GET, LISTS_GET_INDEX_GET_REMOVE, LISTS_GET_INDEX_REMOVE, LISTS_GET_INDEX_FROM_START, LISTS_GET_INDEX_FROM_END, LISTS_GET_INDEX_FIRST, LISTS_GET_INDEX_LAST, LISTS_GET_INDEX_RANDOM, LISTS_GET_INDEX_TAIL, LISTS_GET_INDEX_INPUT_IN_LIST, LISTS_INDEX_FROM_START_TOOLTIP, LISTS_INDEX_FROM_END_TOOLTIP, LISTS_GET_INDEX_TOOLTIP_GET_FROM, LISTS_GET_INDEX_TOOLTIP_GET_FIRST, LISTS_GET_INDEX_TOOLTIP_GET_LAST, LISTS_GET_INDEX_TOOLTIP_GET_RANDOM, LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM, LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST, LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST, LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM, LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM, LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST, LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST, LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM, LISTS_SET_INDEX_HELPURL, LISTS_SET_INDEX_INPUT_IN_LIST, LISTS_SET_INDEX_SET, LISTS_SET_INDEX_INSERT, LISTS_SET_INDEX_INPUT_TO, LISTS_SET_INDEX_TOOLTIP_SET_FROM, LISTS_SET_INDEX_TOOLTIP_SET_FIRST, LISTS_SET_INDEX_TOOLTIP_SET_LAST, LISTS_SET_INDEX_TOOLTIP_SET_RANDOM, LISTS_SET_INDEX_TOOLTIP_INSERT_FROM, LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST, LISTS_SET_INDEX_TOOLTIP_INSERT_LAST, LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM, LISTS_GET_SUBLIST_HELPURL, LISTS_GET_SUBLIST_INPUT_IN_LIST, LISTS_GET_SUBLIST_START_FROM_START, LISTS_GET_SUBLIST_START_FROM_END, LISTS_GET_SUBLIST_START_FIRST, LISTS_GET_SUBLIST_END_FROM_START, LISTS_GET_SUBLIST_END_FROM_END, LISTS_GET_SUBLIST_END_LAST, LISTS_GET_SUBLIST_TAIL, LISTS_GET_SUBLIST_TOOLTIP, LISTS_SORT_HELPURL, LISTS_SORT_TITLE, LISTS_SORT_TOOLTIP, LISTS_SORT_ORDER_ASCENDING, LISTS_SORT_ORDER_DESCENDING, LISTS_SORT_TYPE_NUMERIC, LISTS_SORT_TYPE_TEXT, LISTS_SORT_TYPE_IGNORECASE, LISTS_SPLIT_HELPURL, LISTS_SPLIT_LIST_FROM_TEXT, LISTS_SPLIT_TEXT_FROM_LIST, LISTS_SPLIT_WITH_DELIMITER, LISTS_SPLIT_TOOLTIP_SPLIT, LISTS_SPLIT_TOOLTIP_JOIN, LISTS_REVERSE_HELPURL, LISTS_REVERSE_MESSAGE0, LISTS_REVERSE_TOOLTIP, ORDINAL_NUMBER_SUFFIX, VARIABLES_GET_HELPURL, VARIABLES_GET_TOOLTIP, VARIABLES_GET_CREATE_SET, VARIABLES_SET_HELPURL, VARIABLES_SET, VARIABLES_SET_TOOLTIP, VARIABLES_SET_CREATE_GET, PROCEDURES_DEFNORETURN_HELPURL, PROCEDURES_DEFNORETURN_TITLE, PROCEDURES_DEFNORETURN_PROCEDURE, PROCEDURES_BEFORE_PARAMS, PROCEDURES_CALL_BEFORE_PARAMS, PROCEDURES_CALL_DISABLED_DEF_WARNING, PROCEDURES_DEFNORETURN_DO, PROCEDURES_DEFNORETURN_TOOLTIP, PROCEDURES_DEFNORETURN_COMMENT, PROCEDURES_DEFRETURN_HELPURL, PROCEDURES_DEFRETURN_TITLE, PROCEDURES_DEFRETURN_PROCEDURE, PROCEDURES_DEFRETURN_DO, PROCEDURES_DEFRETURN_COMMENT, PROCEDURES_DEFRETURN_RETURN, PROCEDURES_DEFRETURN_TOOLTIP, PROCEDURES_ALLOW_STATEMENTS, PROCEDURES_DEF_DUPLICATE_WARNING, PROCEDURES_CALLNORETURN_HELPURL, PROCEDURES_CALLNORETURN_TOOLTIP, PROCEDURES_CALLRETURN_HELPURL, PROCEDURES_CALLRETURN_TOOLTIP, PROCEDURES_MUTATORCONTAINER_TITLE, PROCEDURES_MUTATORCONTAINER_TOOLTIP, PROCEDURES_MUTATORARG_TITLE, PROCEDURES_MUTATORARG_TOOLTIP, PROCEDURES_HIGHLIGHT_DEF, PROCEDURES_CREATE_DO, PROCEDURES_IFRETURN_TOOLTIP, PROCEDURES_IFRETURN_HELPURL, PROCEDURES_IFRETURN_WARNING, WORKSPACE_COMMENT_DEFAULT_TEXT, WORKSPACE_ARIA_LABEL, COLLAPSED_WARNINGS_WARNING, DIALOG_OK, DIALOG_CANCEL, EDIT_BLOCK_CONTENTS, MOVE_BLOCK, WINDOWS, MAC_OS, CHROME_OS, LINUX, UNKNOWN, CONTROL_KEY, COMMAND_KEY, OPTION_KEY, ALT_KEY, CUT_SHORTCUT, COPY_SHORTCUT, PASTE_SHORTCUT, HELP_PROMPT, SHORTCUTS_GENERAL, SHORTCUTS_EDITING, SHORTCUTS_CODE_NAVIGATION, KEYBOARD_NAV_UNCONSTRAINED_MOVE_HINT, KEYBOARD_NAV_CONSTRAINED_MOVE_HINT, KEYBOARD_NAV_COPIED_HINT, KEYBOARD_NAV_CUT_HINT } = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f2e$pnpm$2f$blockly$40$12$2e$3$2e$1$2f$node_modules$2f$blockly$2f$msg$2f$en$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
}),
]);

//# sourceMappingURL=99bbd_blockly_96716d41._.js.map