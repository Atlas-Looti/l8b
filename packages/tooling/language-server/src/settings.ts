import type { Connection } from "vscode-languageserver/node";
import type { LootiScriptSettings, PartialLootiScriptSettings } from "./types";

export const defaultSettings: LootiScriptSettings = {
    diagnostics: { enable: true },
    completion: { enable: true },
    signatureHelp: { enable: true },
    format: { enable: true, indentSize: 1 },
};

let globalSettings: LootiScriptSettings = defaultSettings;
const documentSettings: Map<string, LootiScriptSettings> = new Map();

export function getGlobalSettings(): LootiScriptSettings {
    return globalSettings;
}

export function setGlobalSettings(settings: LootiScriptSettings): void {
    globalSettings = settings;
}

export function clearDocumentSettings(): void {
    documentSettings.clear();
}

export function getDocumentSettingsMap(): Map<string, LootiScriptSettings> {
    return documentSettings;
}

export async function getDocumentSettings(connection: Connection, hasConfigurationCapability: boolean, resource: string): Promise<LootiScriptSettings> {
    if (!hasConfigurationCapability) {
        return globalSettings;
    }

    const cached = documentSettings.get(resource);
    if (cached) {
        return cached;
    }

    const configuration = await connection.workspace.getConfiguration({
        scopeUri: resource,
        section: "lootiscript",
    });
    const sanitized = sanitizeSettings(configuration as PartialLootiScriptSettings);
    documentSettings.set(resource, sanitized);
    return sanitized;
}

export function sanitizeSettings(settings?: PartialLootiScriptSettings): LootiScriptSettings {
    const merged = settings || {};
    const rawIndent = merged.format?.indentSize ?? defaultSettings.format.indentSize;
    const normalizedIndent = Math.min(Math.max(rawIndent, 1), 4);
    return {
        diagnostics: {
            enable: merged.diagnostics?.enable ?? defaultSettings.diagnostics.enable,
        },
        completion: {
            enable: merged.completion?.enable ?? defaultSettings.completion.enable,
        },
        signatureHelp: {
            enable: merged.signatureHelp?.enable ?? defaultSettings.signatureHelp.enable,
        },
        format: {
            enable: merged.format?.enable ?? defaultSettings.format.enable,
            indentSize: normalizedIndent,
        },
    };
}
