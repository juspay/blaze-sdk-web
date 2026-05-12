# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [Unreleased](https://github.com/juspay/blaze-sdk-web/compare/HEAD..0.5.10)

Bump atoms CDN version to 240.0.1 which includes the checkout
navigation interceptor fix for bank redirect URLs in portal context.

Co-Authored-By: Claude Opus 4.6 (1M context) &lt;noreply@anthropic.com&gt;

- BZ-2891: chore: bump electron version to 240.0.1 ([](https://juspay.atlassian.net/browse/BZ-2891))

## [0.5.10](https://github.com/juspay/blaze-sdk-web/compare/0.5.10..0.5.9) - 2026-05-11

- BZ-2923: chore: Bump Electron SDK to v233.0.0 ([](https://juspay.atlassian.net/browse/BZ-2923))
- chore(release): 0.5.10 ([f2bac2c](https://github.com/juspay/blaze-sdk-web/commit/f2bac2cbb353fd8406967729cc4758c60e8a6dde))

## [0.5.9](https://github.com/juspay/blaze-sdk-web/compare/0.5.9..0.5.8) - 2026-03-31

- BZN-49112: fix: multi initiate flow ([](https://juspay.atlassian.net/browse/BZN-49112))
- chore(release): 0.5.9 ([a5fcfe5](https://github.com/juspay/blaze-sdk-web/commit/a5fcfe5a90b2a3673729d7081044294198924aeb))

## [0.5.8](https://github.com/juspay/blaze-sdk-web/compare/0.5.8..0.5.3) - 2026-03-30

- BZN-49110: ci: add github release notes & pnpm bump ([](https://juspay.atlassian.net/browse/BZN-49110))
- BZN-49109: ci: fix release triggers ([](https://juspay.atlassian.net/browse/BZN-49109))
- BZN-49108: feat: enhance terminate call ([](https://juspay.atlassian.net/browse/BZN-49108))
- BZ-48611: feat: based sdk update & platorm key support ([](https://juspay.atlassian.net/browse/BZ-48611))
- chore(release): 0.5.4 ([1404006](https://github.com/juspay/blaze-sdk-web/commit/1404006bcc885dec893af82c83f9eebc30ef5533))
- chore(release): 0.5.6 ([f9b9768](https://github.com/juspay/blaze-sdk-web/commit/f9b9768e3d72dbe01a48bd3a5fec2cafc4c8afd4))
- chore(release): 0.5.8 ([f141355](https://github.com/juspay/blaze-sdk-web/commit/f141355fcd3703f834576bb0da0766091e17fe7c))
- chore(release): 0.5.7 ([9b0b220](https://github.com/juspay/blaze-sdk-web/commit/9b0b22083fb824aeb71d07f66331d6e49b1aafb5))

## [0.5.3](https://github.com/juspay/blaze-sdk-web/compare/0.5.3..0.5.2) - 2025-12-01

- BZ-46552: feat: increase support for app endpoints ([](https://juspay.atlassian.net/browse/BZ-46552))
- chore(release): 0.5.3 ([33f7758](https://github.com/juspay/blaze-sdk-web/commit/33f7758c4ebd467d96bba9918ca97d02bed0b7bf))

## [0.5.2](https://github.com/juspay/blaze-sdk-web/compare/0.5.2..0.5.1) - 2025-11-19

- BZ-46061: feat: Add Backend SDK for server-side payment integrations ([](https://juspay.atlassian.net/browse/BZ-46061))
- chore(release): 0.5.2 ([514cf1a](https://github.com/juspay/blaze-sdk-web/commit/514cf1a77098292d15be95fcdc67355e67b42042))

## [0.5.1](https://github.com/juspay/blaze-sdk-web/compare/0.5.1..0.0.2) - 2025-09-22

- BZ-44387: feat: added callback loading from window in cdn ([](https://juspay.atlassian.net/browse/BZ-44387))
- BZ-39631: feat: Expose terminate via CDN sdk ([](https://juspay.atlassian.net/browse/BZ-39631))
- BZ-39230: feat: disable overlay click ([](https://juspay.atlassian.net/browse/BZ-39230))
- BZ-37825: feat: added support for specify the container layout ([](https://juspay.atlassian.net/browse/BZ-37825))
- BZ-36920: feat: expose terminate ([](https://juspay.atlassian.net/browse/BZ-36920))
- BZ-36858: feat: upgraded core sdk version to stable version ([](https://juspay.atlassian.net/browse/BZ-36858))
- BZ-36722: feat: add support for single script CDN runtime ([](https://juspay.atlassian.net/browse/BZ-36722))
- BZ-35533: feat: added support for reading shop id from init payload ([](https://juspay.atlassian.net/browse/BZ-35533))
- VERSION-0.0.3: chore: released 0.0.3 ([](https://juspay.atlassian.net/browse/VERSION-0))
- BZ-35506: fix: reader for environment in init payload ([](https://juspay.atlassian.net/browse/BZ-35506))
- Build(deps): bump nanoid in /examples/blaze-sdk-web-example ([e93e46d](https://github.com/juspay/blaze-sdk-web/commit/e93e46db91e676ca0cc80b64fe4876adfbb7189b))
- Build(deps-dev): bump bun from 1.1.7 to 1.1.30 ([1f19e82](https://github.com/juspay/blaze-sdk-web/commit/1f19e82c2a0031e7d972a6874266f3afb9ba1886))
- chore(release): 0.5.1 ([2f68e47](https://github.com/juspay/blaze-sdk-web/commit/2f68e472b446f4e8802b3f5f88a7dc107189b5ff))
- Build(deps): bump micromatch from 4.0.5 to 4.0.8 ([8ec352a](https://github.com/juspay/blaze-sdk-web/commit/8ec352a5c294c6b160b4a58d68e6ae76bbe3274c))
- Build(deps): bump cross-spawn from 7.0.3 to 7.0.6 ([43aef9d](https://github.com/juspay/blaze-sdk-web/commit/43aef9daf5ec282e94ab1ae3d229f5d60c7ab3ad))

## 0.0.2 - 2024-10-08

- updated SDK interfaces & core sdk version
- updated README to match up with latest standard interfaces
- updated docs & package deps

- BZ-33677: feat: updated sdk interfaces & core sdk version ([](https://juspay.atlassian.net/browse/BZ-33677))
- BZ-33675: refactor: rebranded sdk to Blaze ([](https://juspay.atlassian.net/browse/BZ-33675))
- BZ-24052: feat: add support for signature based integration ([](https://juspay.atlassian.net/browse/BZ-24052))
- BZ-23987: fix: support for passing environment params ([](https://juspay.atlassian.net/browse/BZ-23987))
- BZ-23980: feat: added basic interfaces for integ ([](https://juspay.atlassian.net/browse/BZ-23980))
- BZ-20093: chore: initialised project ([](https://juspay.atlassian.net/browse/BZ-20093))
