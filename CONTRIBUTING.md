# Contributing to Terminal Setup Style

First off, thank you for considering contributing to Terminal Setup Style! It's people like you that make Terminal Setup Style such a great tool.

## Where do I go from here?

If you've noticed a bug or have a question that doesn't belong on the Support channels, search the issue tracker to see if someone else in the community has already created a ticket. If not, go ahead and make one!

## Adding New Themes

The easiest way to contribute is by adding a new theme! 

1. Create your custom theme in Oh My Posh JSON format (`.omp.json`).
2. Add your `theme_name.omp.json` file inside the `themes/` directory of this repository.
3. Take a screenshot of your theme in action and add it to the `assets/img/` folder with the same name (`theme_name.png`).
4. Add your theme to the visual gallery in the `README.md`.
5. Submit a Pull Request!

## Development Setup

1. Clone the repository: `git clone https://github.com/angeltarcayadev/terminal-setup-style.git`
2. Run `npm install` to install dependencies.
3. Press `F5` in VS Code to run the extension in Debug Mode.
4. Run `npm run compile` to build the TypeScript files.

## Code Style

- Write clean, modern TypeScript.
- Ensure there are no warnings or linting errors before submitting your PR.
