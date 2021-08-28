# Next steps:
The jyi-components library should be where you make most of your changes, then you just reinstall the library to the actual applications (lang-previewer and switcher react apps).

Steps:
1. Make a change to a component in jyi-components (say, refactor lang-previewer to use createRef.)
2. Run "tsc" in the command line to compile the library.
3. Run the usual commands to add the changes to git, commit them, and push to GitHub.
4. Switch over the the create-react-app (this repo for lang-previewer for instance), and run "npm i https://github.com/Journal-of-Young-Investigators/jyi-components.git" to update to the newest version of the library.
5. Develop your app using the library.
e
# Requirements:

### In jyi-component library:
* Consider separating the interfaces and other things you use across components into their own folder in the library. Make sure to export them from the file they're in AND from the folder they're in (from index.ts).
* Refactor lang-previewer component to leverage createRef for the form and live-reloading of preview.
  * Examples: https://reactjs.org/docs/refs-and-the-dom.html
* Refactor lang-previewer component to have tabs or a dropdown to add a new translation to the preview.
  * Tip: When adding a new language, you'll basically need a whole "new" form - at least for the title and body - to populate the language specific stuff. Treat the form like a mapped component (vaguely like: articleTranslations.map(() => <Form>), since the number of translations will be dynamic. You will run into a problem where multiple copies of the form rendered on the page, when really you only want one at a time. Solve this with CSS - add a prop to show which form is active, and use "display: none" to hide the others (similar to how lang-switcher only displays the active language).
* Refactor lang-switcher component to use a button dropdown to select language instead of multiple buttons per language.

### In lang-previewer app (this repo):
* Refactor to use jyi-component library (already done for you - check out index.ts to see how it's done).
* Remove extraneous code.

### In lang-switcher app:
* Refactor to use jyi-component library and remove extraneous code.


