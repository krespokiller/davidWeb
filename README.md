# David Santiago Vargas - Portfolio

A modern, responsive portfolio website built with RedwoodJS SDK, React, TypeScript, Tailwind CSS, and Storybook. Features Atomic Design architecture for scalability and maintainability.

## Features

- **Atomic Design**: Organized components following Atomic Design principles (atoms, molecules, organisms)
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Smooth animations and transitions
- **Professional Experience**: Detailed showcase of work history from CV
- **Contact Section**: Integrated contact form with GitHub and LinkedIn links
- **Frontend Only**: No backend dependencies for simple deployment

## Tech Stack

- **Framework**: RedwoodJS SDK
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom color palette
- **Component Library**: Storybook for development
- **Build Tool**: Vite

## Color Palette

- Primary: #448C42
- Secondary: #6ED96A
- Accent: #7DF279
- Dark: #0C2604
- Light: #F2F2F2

## Getting Started

### Prerequisites

- Node.js v22+ (due to Promise.withResolvers requirement)
- pnpm

### Installation

```shell
pnpm install
```

### Development

```shell
pnpm dev
```

### Build for Production

```shell
pnpm build
```

### Storybook

```shell
pnpm run storybook
```

## Deployment to GitHub Pages

1. Ensure Node.js v22+ is installed
2. Build the project: `pnpm build`
3. The `dist` folder contains the static files
4. Deploy the `dist` folder to GitHub Pages

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── atoms/          # Basic UI elements (Button, Input, Heading)
│   │   ├── molecules/      # Combinations of atoms (ExperienceItem, ContactForm)
│   │   └── organisms/      # Complex sections (Header, Footer, ExperienceSection)
│   ├── pages/              # Page components
│   └── shared/             # Shared utilities
├── client.tsx             # Main entry point
└── index.css              # Global styles
```

## Contact

David Santiago Vargas
- Email: davidsantiagovargas1234@gmail.com
- GitHub: [davidsantiagovargas1234](https://github.com/davidsantiagovargas1234)
- LinkedIn: [David Santiago Vargas](https://linkedin.com/in/david-santiago-vargas)
