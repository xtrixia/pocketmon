![Pockétmon](https://github.com/xtrixia/pocketmon/blob/master/src/assets/logo.svg?raw=true)

Your pocket-size Pokémon website. Built with ❤️

- Project bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
- Styles written with CSS-in-JS library [Emotion](https://emotion.sh/)
- Data fetched with GraphQL using [Apollo Client](https://www.apollographql.com/docs/react/)

## **Getting Started**

### Folder Structure

```bash
.
├ public/           # serve public files
├ src/              # contain all sources used
│ ├ assets/         # sources (e.g svg, png)
│ ├ components/     # reusable components
│ ├ graphql/        # queries and mutations gql
│ ├ helpers/        # helper functions
│ ├ pages/          # components per route
│ ├ root/           # palette configuration for theming, etc
│ ├ index.js        # setup main DOM and routes
│ └ setupTests.js   # setup test file
└ package.json      # contains dependencies used
```

### Available Scripts

```bash
npm start           # run app in the development mode, PORT=7000
npm run test        # test app with jest watch
npm run build       # build app for production
```

## **Credits**

- Datasource by GraphQL [PokeAPI](https://github.com/mazipan/graphql-pokeapi)
- Icons made by [Roundicons Freebies](https://www.flaticon.com/authors/roundicons-freebies)
