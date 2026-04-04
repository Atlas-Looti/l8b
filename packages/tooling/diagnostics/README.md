# @al8b/diagnostics

Central diagnostics package for the L8B ecosystem. It standardizes error codes, message templates, severity categories, and formatter output for CLI, browser, and language tooling.

## Public API

- Codes: `APIErrorCode`, `CLIErrorCode`, `CompilationErrorCode`, `RuntimeErrorCode`, `SceneErrorCode`, `SyntaxErrorCode`, `WarningCode`
- Formatter helpers: `createDiagnostic`, `formatForBrowser`, `formatForCLI`, `formatForLSP`, `formatSimple`, `reportRuntimeError`
- Message helpers: `formatMessage`, `getMessageTemplate`, `getSuggestions`, `MESSAGES`
- Types: `Diagnostic`, `DiagnosticCode`, `ErrorCode`, `DiagnosticCategory`, `DiagnosticSeverity`, `CallFrame`, `MessageArgs`, `MessageTemplate`, `RelatedLocation`

## Notes

- This package should remain the single source of truth for diagnostic identity and formatting.
- Runtime, compiler, and tooling packages should depend on it rather than inventing local error strings.

## Scripts

```bash
bun run build
bun run test
bun run typecheck
bun run clean
```
