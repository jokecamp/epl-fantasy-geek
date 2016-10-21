# English Premier League Fantasy Stats for Geeks

By Joe Kampschmidt

See Demo at <http://jokecamp.github.io/epl-fantasy-geek/#/players>

More information at [jokecamp.com/projects](http://www.jokecamp.com/projects)

**An AngularJS website to emulate an interactive spreadsheet to help manage your fantasy football/soccer team at <http://fantasy.premierleague.com>.** Please use this project/page to crush your friends in fantasy football. Only data for the 2014-2015 is available.

I've will try to update the stats from <fantasy.premierleague.com> after every round of fixtures.

Also pull requests highly recommended. Below is a good place to start contributing.

### Todo - How to contribute

 - Add more filters
 - Add ability to toggle what columns to view
 - clean up UI
 - Find new ways to display the data. graphs?

## To Run

To install all dependencies and run a local web server use the command `npm start`

To contribute make a fork and submit a pull request. Or create a fork and setup your own gh-pages branch to host your own version of the project.

Use git subtree to just deploy the app directory to your gh-pages branch. This will allow you to host at http://username.github.com/epl-fantasy-geek

Once setup you can just commit like normal to your main branch then just push the `app` directory as a `git subtree` to the gh-pages branch. Use the following command `git subtree push --prefix app` or use the `./deploy-app.sh script` file

## Download Fantasy JSON Data

Dependencies:
- `gem install mechanize`

In a shell scrip run the following with your own Fantasy Premier League Credentials

```
./getJson.sh user@gmail.com password
```

### Resources

- <https://help.github.com/articles/creating-project-pages-manually>
- <https://fantasy.premierleague.com/drf/bootstrap-static> - once logged in you can access data here
- <https://fantasy.premierleague.com/drf/bootstrap-dynamic> - once logged in you can access player/stats data here
- <https://fantasy.premierleague.com/drf/elements/> - once logged in
- <https://fantasy.premierleague.com/drf/transfers> - logged in user's fantasy team roster
