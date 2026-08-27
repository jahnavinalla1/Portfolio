# Portfolio

## Chat widget

The site has a floating chat widget ([src/components/ChatBot.jsx](src/components/ChatBot.jsx))
that answers visitor questions about the resume content. It runs entirely in the
browser — a local keyword-matching engine in
[src/chatKnowledge.js](src/chatKnowledge.js) matches the question against topics
(AWS/cloud, frontend, backend, AI/ML, experience, projects, education, contact,
availability, etc.) and assembles an answer from real resume data. No API, no key,
no server, no cost.

Its knowledge comes entirely from [src/data.js](src/data.js) — the same data the
rest of the site renders — plus a few recruiter-facing extras (location, open-to,
relocation, availability, work authorization) at the top of `chatKnowledge.js`.
Edit either file and the bot's answers update automatically. Compensation questions
are always deflected to your email rather than answered, by design.

Works out of the box with `npm run dev` — nothing else to configure.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
