<p align="center">
  <a href="https://github.com/grienz/eva"><img src="public/assets/logo.png?raw=true" alt="Logo"></a>
</p>

# Uses 💯

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: [Sanity](https://sanity.io)
- **Deployment**: [Vercel](https://vercel.com)
- **Analytics**: [SplitBee](https://splitbee.io/)
- **Logging**: [LogFlare](https://logflare.aoo/)

# Features ⚓

- Performant by default
- SEO
- Internationalization
- Responsive
- Dark Mode Support

# Local Development ⚡

### Sanity (Back End)

`sanity start` in the `/studio` folder to start the studio locally

- Your Sanity Studio should be running on [http://localhost:3333](http://localhost:3333)

### Next (Front End)

`yarn dev` in the project folder to start the front end locally

- Your front end should be running on [http://localhost:3000](http://localhost:3000)

<br />

### 1) Sanity

1. If you don't have the [Sanity CLI](https://www.sanity.io/docs/getting-started-with-sanity-cli) installed, first run `yarn global add @sanity/cli` to install it globally
2. `yarn install && sanity init` in the `/studio` folder
3. During Sanity's initalization it will warn you, type `Y` and hit `enter`:

```
? The current folder contains a configured Sanity studio. Would you like to reconfigure it? (Y/n)
```

4. When it asks you what dataset configuration to use, go with the `default`
5. Add CORS Origins to your newly created Sanity project (visit: [manage.sanity.io](https://manage.sanity.io) and go to Settings > API): - Add your Studio URLs **_with_** credentials: `http://localhost:3333` and `[subdomain].sanity.studio` - Add your front-end URLs **_without_** credentials: `http://localhost:3000` and `https://[subdomain].vercel.app`
   > ⚠️ **Important!** <br />For "singleton" documents, like settings sections, the schema uses a combination of `__experimental_actions` and the new [actions resolver](https://www.sanity.io/docs/document-actions). If you are using this outside of the official Sanity Starter, you will need to comment out the `__experimental_actions` line in "singleton" schemas to publish settings for the first time. This is because a singleton is still a document type, and one needs to exist first before it can be edited. Additionally, if you want to create additional "singleton" schemas, be sure to edit the `singletons` array in the following file: `/studio/parts/resolve-actions.js`.

### 2) NextJS

1. `yarn install` in the project root folder on local
2. Create an `.env.local` file in the project folder, and add the following variables:

```
NEXT_PUBLIC_SANITY_DATASET=production

NEXT_PUBLIC_SANITY_PROJECT_ID=XXXXXX

SANITY_API_TOKEN=XXXXXX

```

3. Update all the `XXXXXX` values, here's where to find each:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - You can grab this after you've initalized Sanity, either from the `studio/sanity.json` file, or from your Sanity Manage dashboard
- `SANITY_API_TOKEN` - Generate an API token for your Sanity project. Access your project from the Sanity Manage dashboard, and navigate to: "Settings" -> "API" -> "Add New Token" button. Make sure you give `read + write` access!

<br />

```shell
.
├── README.md                       # README file
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── studio                          # Sanity
├── src                             # Source
│   ├── config                      # Global configs
│   ├── pages                       # Next JS Pages
│   ├── styles                      # Styles folder
│   ├── mesages                     # i18n translates
│   └── lib                         # Api queries
│   └── components                  # Components
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

# Deploy to Vercel 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fgrienz%2Feva)

This is setup to work seamlessly with Vercel, which I highly recommend as your hosting provider of choice. Simply follow the on-screen instructions to setup your new project, and be sure to **add the same `.env.local` variables to your Vercel Project**
You can see the results locally in production mode with:

```shell
$ yarn build
```

You can create an optimized production build with:

```shell
yarn build-prod
```

Now, your site is ready to be deployed. All generated files are located at `out` folder, which you can deploy with any hosting service.

## License 🤝

## [MIT](LICENSE)
