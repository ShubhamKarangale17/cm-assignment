import type { FormField } from "./blueprint.types";

export interface Contract {
    id: string;
    blueprintId: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'created' | 'approved' | 'sent' | 'signed' | 'locked' | 'revoked';
    fields: FormField[];
}