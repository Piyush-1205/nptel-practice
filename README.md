# Learning Lab — Psychology of Learning

A local practice website built from the supplied assignment PDF. Includes all 130 questions: Weeks 1–12 plus the introductory Week 0.

## Start on your Mac

1. Extract this ZIP into a folder you intend to keep.
2. Open **index.html** in Chrome, Safari, Firefox or another modern browser. This page is self-contained; no installation or internet connection is needed.
3. Pick a week and start practising.

For a stable localhost address, use the optional Python 3 server. Open Terminal, type `cd ` (with a trailing space), drag the extracted `learning-lab` folder into Terminal, and press Enter. Then run:

```bash
python3 server.py
```

Your browser opens at **http://localhost:8765/**. Keep Terminal running while you practise; Ctrl+C stops the server. You can also run `bash Start.command` from that folder. Python 3 is needed only for this optional server, not for opening index.html directly.

This project is prepared for local use. The included launcher starts it on your computer; no remote hosting or authentication is configured.

## How practice works

- Click an option to check it immediately. Checked answers stay locked until you reset that week.
- Correct answers turn green and show a check mark. A wrong selection turns red, and the key answer turns green.
- A short explanatory answer appears only when the selection is wrong.
- Each correct answer earns 1 mark, with no negative marks. The complete assignment score appears after all 10 questions are answered.
- Use the question navigator to jump between questions.
- **Reset assignment** clears just that week's selections and result, after confirmation. Other weeks retain their progress.
- Progress is automatically saved in this browser's localStorage. Refreshing, navigating between weeks, and closing/reopening preserve it.

Use the same browser and address when returning. Progress belongs to that browser profile, not to a user account. Private browsing or clearing site data can erase it. Opening a moved file or switching from file:// to localhost may create a separate storage location. Prefer the stable localhost address if your browser blocks storage for local files. A visible notice appears when saving is unavailable.

## Answer key and study notes

The questions, option order and grading keys match the supplied PDF, including its quick answer table. Short explanations were added as study aids and are not NPTEL's official explanations.

**Week 12 is provisional.** The source PDF says grading was not visible and its answers were selected options. Week 12 Q1 selects C (unidimensional), while the PDF itself flags this as doubtful. The app preserves that selection and displays the uncertainty before practice, at Q1 and in the score. Obtain the official key before treating the Week 12 result as final.

A few source claims are phrased narrowly or use model-dependent details. The explanations identify these where relevant: Week 6 Q1 (empathy), Week 6 Q6 (Bar-On component count), and Week 9 Q9 (36,000 visual cues per hour). Matching a supplied practice key is not independent verification of every claim.

Public references consulted for sustainability explanations:

- [UNESCO: HESI and the 2020 Global Education Meeting](https://www.unesco.org/en/articles/hesi-highlights-role-higher-education-building-better-world-current-and-future-generations)
- [UNESCO: Education for Sustainable Development Goals — learning objectives](https://www.unesco.org/en/articles/education-sustainable-development-goals-learning-objectives)

## Editing and rebuilding

- `questions.json`: all questions, options, key answers and short explanations.
- `styles.css`: responsive design.
- `core.js`: grading, sanitizing saved answers, and assignment resets.
- `app.js`: interface and persistence.
- `shell.html`: page structure.
- `build.py`: combines these files into the standalone `index.html`.
- `server.py` and `Start.command`: optional local launcher.
- `tests.cjs`: data integrity and application behaviour checks, using Node.js only.

After editing source files:

```bash
python3 build.py
node tests.cjs
```

The shipped index.html has already been built. No Node.js, Python or build tools are required to open it directly.

## Verification

130 questions and individual key entries were cross-checked against the PDF's quick key. Automated checks cover all correct and incorrect choices, answer locking, scoring, final results, wrong-only explanations, storage round-trips, corrupted saved data and reset isolation. Browser rendering was not available in the build environment; responsive and accessibility styles are included, but real-browser visual QA remains a verification limit.
