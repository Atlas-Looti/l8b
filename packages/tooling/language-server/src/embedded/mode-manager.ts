import type {
	Position,
	TextDocument,
} from "vscode-languageserver-textdocument";
import {
	DocumentRegions,
	type LanguageMode,
} from "./language-modes";

/**
 * Cache for document regions to avoid re-scanning
 */
class LanguageModelCache<
	T,
> {
	private cache: Map<
		string,
		{
			version: number;
			value: T;
		}
	> =
		new Map();
	private maxEntries: number;

	constructor(
		maxEntries: number = 10,
	) {
		this.maxEntries =
			maxEntries;
	}

	get(
		document: TextDocument,
	): T {
		const key =
			document.uri;
		const entry =
			this.cache.get(
				key,
			);

		if (
			entry &&
			entry.version ===
				document.version
		) {
			return entry.value;
		}

		// Create new entry
		const value =
			this.create(
				document,
			);
		this.cache.set(
			key,
			{
				version:
					document.version,
				value,
			},
		);

		// Cleanup old entries
		if (
			this
				.cache
				.size >
			this
				.maxEntries
		) {
			const firstKey =
				this.cache
					.keys()
					.next().value;
			if (
				firstKey !==
				undefined
			) {
				this.cache.delete(
					firstKey,
				);
			}
		}

		return value;
	}

	protected create(
		_document: TextDocument,
	): T {
		throw new Error(
			"Must be implemented by subclass",
		);
	}
}

/**
 * Cache for document regions
 */
export class DocumentRegionsCache extends LanguageModelCache<DocumentRegions> {
	constructor() {
		super(
			10,
		);
	}

	protected create(
		document: TextDocument,
	): DocumentRegions {
		return new DocumentRegions(
			document,
		);
	}
}

/**
 * Manages language modes for embedded languages
 */
export class LanguageModes {
	private modes: Map<
		string,
		LanguageMode
	> =
		new Map();
	private documentRegions: DocumentRegionsCache;

	constructor(
		documentRegions: DocumentRegionsCache,
	) {
		this.documentRegions =
			documentRegions;
	}

	/**
	 * Register a language mode
	 */
	registerMode(
		mode: LanguageMode,
	): void {
		this.modes.set(
			mode.getId(),
			mode,
		);
	}

	/**
	 * Get language mode at a given position
	 */
	getModeAtPosition(
		document: TextDocument,
		position: Position,
	): LanguageMode | null {
		const regions =
			this.documentRegions.get(
				document,
			);
		const languageId =
			regions.getLanguageAtPosition(
				position,
			);

		if (
			languageId
		) {
			return (
				this.modes.get(
					languageId,
				) ||
				null
			);
		}

		// Return default LootiScript mode (null means use default)
		return null;
	}

	/**
	 * Get all registered modes
	 */
	getAllModes(): LanguageMode[] {
		return Array.from(
			this.modes.values(),
		);
	}

	/**
	 * Get mode by language ID
	 */
	getMode(
		languageId: string,
	): LanguageMode | null {
		return (
			this.modes.get(
				languageId,
			) ||
			null
		);
	}
}
