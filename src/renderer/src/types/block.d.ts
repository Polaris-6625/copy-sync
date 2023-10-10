interface BlockData {
    id: number;
    value: any;
    type: "TEXT" | "LINK" | "PIC" | "FILE" | "NOTE" | "ELSE" | "EMAIL";
}

export type { BlockData };