

export interface FormField {
    label?: string;
    type: 'text' | 'date' | 'checkbox' | 'signature' | 'fixed';
    position: {
        x: number;
        y: number;
        w: number; // width
        h: number; // height
    }; // {x , y, width, height}
    value?: any; // blueprint - null, contract - filled value
}

export interface Blueprint {
    id: string;
    name: string;
    description?: string;
    totalFields: number;
    createdAt: Date;
    updatedAt: Date;
    fields: FormField[];
}