# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語設定

**必ず日本語で回答してください。** すべての応答は日本語で行い、コメントや説明も日本語で記述してください。

## Project Overview

This is a Next.js study project using the **Pages Router** architecture (not App Router), focused on advanced form handling patterns with TanStack Form and Valibot validation.

## Development Commands

```bash
npm run dev      # Start development server on port 3001
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

**Note**: This project runs on port 3001 instead of the default 3000.

## Architecture

### Form Management System
The project centers around a custom form architecture built on TanStack Form:

- **Custom Hook**: `useAppForm` in `/src/libs/tanStackForm/form.tsx` provides pre-configured field and form components
- **Context Pattern**: Uses compound component pattern with custom contexts for form and field communication
- **Schema Validation**: Valibot integration for type-safe form validation
- **Component Composition**: Reusable form components with TypeScript generics

### Directory Structure
- `/src/components/` - React components, organized by features and date-based folders
- `/src/components/ui/` - Reusable UI components (TextField, SubscribeButton)
- `/src/libs/tanStackForm/` - Custom form management setup
- `/src/pages/` - Next.js pages using Pages Router
- Path alias: `@/*` maps to `./src/*`

### Key Technologies
- **Next.js 14** with Pages Router
- **TypeScript** with strict configuration
- **TailwindCSS** for styling
- **TanStack Form** for form state management
- **Valibot** for schema validation

## Code Patterns

### Form Components
When working with forms, use the established pattern:
- Import `useAppForm` from `@/libs/tanStackForm/form`
- Define Valibot schemas for validation
- Use compound components (Form, Field) provided by the custom hook
- Leverage TypeScript generics for type safety

### Component Organization
- Feature-based components in dated folders (e.g., `/components/250417/`)
- Reusable UI components in `/components/ui/`
- Multiple TanStack form examples showing different implementation patterns

## Important Notes

- **No Testing Framework**: This project doesn't have Jest, Vitest, or other testing frameworks configured
- **Study Focus**: The codebase demonstrates advanced form handling, array field management, and dynamic field switching
- **TypeScript Heavy**: Extensive use of TypeScript generics and advanced typing patterns