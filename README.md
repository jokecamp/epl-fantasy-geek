# English Premier League Fantasy Stats for Geeks

By Joe Kampschmidt

See Demo at <http://www.jokecamp.com/lab/epl-fantasy/#/players>

## About

I've will try to update the stats every week after the matches. However, since its open source feel free to update the stats yourself.

Also pull requests highly recommended.

Please use this project/page to crush your friends in fantasy football.

## Technology

- Angular JS
- nodejs for the local development server

## To Run

To install all dependencies and run a local web server run `npm start`

## To Deploy

Use git subtree to just deploy the app directory

- develop normally
- commit master branch to github 'git commit -m "message" '
- push to github with 'git push origin'
- then push the subtree to the gh-pages branch with `git subtree push --prefix app origin gh-pages`
  - or use the ./deploy-app.sh script


### Resources

- <https://help.github.com/articles/creating-project-pages-manually>
