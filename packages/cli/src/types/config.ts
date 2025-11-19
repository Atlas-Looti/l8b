export interface LootiConfig {
    name: string;
    orientation: 'portrait' | 'landscape' | 'any';
    aspect: string;
    canvas?: {
        id?: string;
        width?: number;
        height?: number;
    };
    width?: number;
    height?: number;
    url?: string;
    dev?: {
        port?: number;
        host?: string | boolean;
        watch?: boolean;
        hotReload?: boolean;
    };
}

