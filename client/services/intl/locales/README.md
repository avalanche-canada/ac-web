# How to translate the application?

The translation still involves a bit of manual work.

1) Extract the messages from the codebase:
`npm run i18n:extract`
2) Commit to repository. Lokalize is currently hooked to `i18n` branch.
3) Translate messages
4) Export translated messages from Lokalize (see image for optoins)
5) Review, accept and merge PR pushed to the `i18n` branch by Lokalize
6) Compile exported messages:
`npm run i18n:compile`
7) Commit and push everything!
