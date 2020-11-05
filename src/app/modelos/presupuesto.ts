export interface Presupuesto {
    key?: string;
    proveedor: string;
    fecha: string;
    concepto: string;
    base: number;
    iva: number;
    tipo: string;
    total: number;
}
