# ═══════════════════════════════════════════════════════════════════
#  react-native-boilerplate — Project Makefile
#  Run `make help` to see all available commands.
# ═══════════════════════════════════════════════════════════════════

.DEFAULT_GOAL := help

# ─── Colors ──────────────────────────────────────────────────────────────────
BOLD  := \033[1m
RESET := \033[0m
GREEN := \033[32m
CYAN  := \033[36m
YELLOW := \033[33m

# ─── Help ─────────────────────────────────────────────────────────────────────

.PHONY: help
help: ## Show this help message
	@echo ""
	@echo "  $(BOLD)react-native-boilerplate — Available Commands$(RESET)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ \
		{ printf "  $(CYAN)%-20s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

# ─── Install ──────────────────────────────────────────────────────────────────

.PHONY: install
install: ## Install all dependencies
	npm install --legacy-peer-deps

.PHONY: install-clean
install-clean: ## Remove node_modules and reinstall from scratch
	rm -rf node_modules
	npm install --legacy-peer-deps

# ─── Dev Servers ──────────────────────────────────────────────────────────────

.PHONY: start
start: ## Start Expo dev server (tunnel mode)
	npx expo start

.PHONY: ios
ios: ## Start and open in iOS Simulator
	npx expo start --ios

.PHONY: ios-clear
ios-clear: ## Start iOS Simulator with cleared Metro cache
	npx expo start --ios --clear

.PHONY: ios-logs
ios-logs: ## Start iOS + filter terminal to show only [API] log lines
	npx expo start --ios 2>&1 | grep --line-buffered "\[API\]" || true

.PHONY: android
android: ## Start and open in Android Emulator
	npx expo start --android

.PHONY: android-clear
android-clear: ## Start Android Emulator with cleared Metro cache
	npx expo start --android --clear

.PHONY: web
web: ## Start and open in browser
	npx expo start --web

.PHONY: clear
clear: ## Start Expo with cleared cache
	npx expo start --clear

# ─── Code Quality ─────────────────────────────────────────────────────────────

.PHONY: lint
lint: ## Run ESLint across all .ts/.tsx files
	npm run lint

.PHONY: lint-fix
lint-fix: ## Run ESLint and auto-fix all fixable issues
	npm run lint:fix

.PHONY: format
format: ## Format all files with Prettier
	npm run format

.PHONY: format-check
format-check: ## Check formatting without writing changes
	npm run format:check

.PHONY: check
check: lint format-check ## Run lint + format check (CI-safe, no writes)
	@echo "$(GREEN)✓ All checks passed$(RESET)"

.PHONY: fix
fix: lint-fix format ## Auto-fix lint issues and format everything
	@echo "$(GREEN)✓ Done — lint fixed and formatted$(RESET)"

# ─── Feature Scaffolding ──────────────────────────────────────────────────────

# Usage: make feature name=orders
.PHONY: feature
feature: ## Scaffold a new feature folder  [name=<feature-name>]
	@if [ -z "$(name)" ]; then \
		echo "$(YELLOW)Usage: make feature name=<feature-name>$(RESET)"; \
		exit 1; \
	fi
	@echo "  Scaffolding feature: $(BOLD)$(name)$(RESET)"
	@mkdir -p \
		src/features/$(name)/components \
		src/features/$(name)/constants \
		src/features/$(name)/hooks \
		src/features/$(name)/screens \
		src/features/$(name)/services \
		src/features/$(name)/store \
		src/features/$(name)/types \
		src/features/$(name)/locales
	@echo '{}' > src/features/$(name)/locales/en.json
	@printf '/**\n * $(name) feature barrel export.\n *\n * RULE: Other features may ONLY import from this file.\n */\n\nexport { $(shell echo $(name) | tr '[:lower:]' '[:upper:]')_ROUTES } from '"'"'./constants/routes'"'"';\nexport type { $(shell python3 -c "print('"'"'$(name)'"'"'.capitalize())")Route } from '"'"'./constants/routes'"'"';\n' \
		> src/features/$(name)/index.ts
	@printf 'export const $(shell echo $(name) | tr '"'"'[:lower:]'"'"' '"'"'[:upper:]'"'"')_ROUTES = {\n  INDEX: '"'"'/(app)/$(name)'"'"',\n} as const;\n\nexport type $(shell python3 -c "print('"'"'$(name)'"'"'.capitalize())")Route = (typeof $(shell echo $(name) | tr '"'"'[:lower:]'"'"' '"'"'[:upper:]'"'"')_ROUTES)[keyof typeof $(shell echo $(name) | tr '"'"'[:lower:]'"'"' '"'"'[:upper:]'"'"')_ROUTES];\n' \
		> src/features/$(name)/constants/routes.ts
	@echo "$(GREEN)  ✓ src/features/$(name)/ created$(RESET)"
	@echo "$(YELLOW)  Next steps:$(RESET)"
	@echo "    1. Add translations to src/features/$(name)/locales/en.json"
	@echo "    2. Register namespace in src/i18n/index.ts and src/i18n/types.ts"
	@echo "    3. Add slice to src/store/rootReducer.ts"

# ─── Expo Tooling ─────────────────────────────────────────────────────────────

.PHONY: prebuild
prebuild: ## Run Expo prebuild (generate native projects)
	npx expo prebuild

.PHONY: prebuild-clean
prebuild-clean: ## Run Expo prebuild with --clean flag
	npx expo prebuild --clean

.PHONY: doctor
doctor: ## Run Expo Doctor to check for configuration issues
	npx expo-doctor

.PHONY: upgrade
upgrade: ## Upgrade all Expo SDK packages to compatible versions
	npx expo install --fix

# ─── Build ────────────────────────────────────────────────────────────────────

.PHONY: build-ios
build-ios: ## Build iOS app via EAS
	npx eas build --platform ios

.PHONY: build-android
build-android: ## Build Android app via EAS
	npx eas build --platform android

.PHONY: build-all
build-all: ## Build both iOS and Android via EAS
	npx eas build --platform all

.PHONY: submit-ios
submit-ios: ## Submit iOS build to App Store via EAS
	npx eas submit --platform ios

.PHONY: submit-android
submit-android: ## Submit Android build to Google Play via EAS
	npx eas submit --platform android

# ─── Utilities ────────────────────────────────────────────────────────────────

.PHONY: ts-check
ts-check: ## Run TypeScript compiler check (no emit)
	npx tsc --noEmit

.PHONY: clean-cache
clean-cache: ## Clear Metro bundler cache
	npx expo start --clear --non-interactive & sleep 3 && kill %1

.PHONY: reset
reset: install-clean clear ## Full reset: reinstall deps + clear cache
