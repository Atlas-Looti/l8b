# error-tests

Fixture package for validating diagnostics, parser failures, warnings, and other error-reporting behavior across the L8B toolchain.

## Purpose

- Keep intentionally broken source files in one place
- Exercise diagnostic codes and message formatting
- Support manual debugging and automated regression tests

## Notes

- This is not a publishable runtime package.
- Treat files here as test fixtures; readability of failure scenarios matters more than production-style code structure.
