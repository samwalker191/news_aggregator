## Setup

1. Create a `.env` file and assign values to keys seen in `example.env`. You will need to provide your own api key from [NewsApi](https://newsapi.org/)
2. Create a `./prisma/dev.db` file
3. Run `npm run setup` to install dependencies. **NOTE**: `--force` flag is included in this script due to the shadcn package. More info [here](https://ui.shadcn.com/docs/react-19#upgrade-status)
4. Run `npm run seed` to seed the database with articles from NewsApi. This api has a free limit of 100 hits per day, but should be good enough to seed for dev purposes.
5. Run `npm run dev` and open up localhost:3000 in a browser to see web app. 

## System Design

### News Aggregation
 The current way this application aggregates news articles is via the NewsApi. This has some limitations due to the difficulty of labeling/identifying the state and topic of the article via the api. This app uses a naive approach of asking the api for articles that contain the state or topic word in the title, description, or content. This could lead to false positives or missing articles entirely. 

 One possible solution is to leverage an LLM to analyze an article and have it tell you what it's topic is. This can also be done for telling what state or geographical location the article is about. This could also be used to generate a summary to display on the web app, instead of the description value from the api which can be unreliable.

 This would allow a more programatical solution to keeping articles up to date and fresh. A script could be ran daily to look for new articles and filtered through an LLM to categorize them. 
 
 Alternatively, you could have a more human approach of adding articles to the database and have the content be more curated. You could expose an api or user interface. This web app exposes a POST endpoint to do this.

 Deduplication can be handled by having uniqueness contraints on the db level. This web app uses a constraint on the combination of author and title, thus preventing any article with the same title and author from being saved to the db more than once.

### Scalability
 Articles are being stored in a relational db. This sample app uses Sqlite due to simplicity, but would be better suited to use PostgreSQL or MySQL due to limitations of Sqlite. 

 Some indexes should be put on the articles table in order to improve some querying. Since we are assuming we are primarily going to be filtering by the title, state, and topic, we would want an index on a combination of those 3. Additionally, users might not always be filtering by all three, so it would be helpful to have indices on each on invidually, as with combinations of the two. You can see an example set of indices in `/prisma/schema.prisma`. 

 Assuming most users would generally only making read queries for article data, a leader/follower replication strategy could be used to horizontally scale the databases as total number of users increase.

 The indices that were mentioned earlier are a decent way to start making the search more efficient. However, if we want to make the description or content of the article also searchable then we could utilize the Full Text Search feature of PostgreSQL or MySQL. This would make searching through larger text fields more efficient. 

### Caching
 The react-query package was used in order to facilitate caching more easily. A lot of the work is done out of the box with that package. You can more easily see the effect by commenting in the `delay` function call in the `/app/page.tsx` and `app/article/[id]/page.tsx` files. You'll see the `Loading` message when intially loading a specific page/query, but when making the same query again, it should use the cached result.

### Security
 Using the Prisma ORM to interface with our db helps with ease of use as well as sanitizing any queries as long as raw sql is not being used.

## Improvements
 Some possible improvements have been mentioned regarding news aggregation. Below are a list of other improvements and features that could be made.

* Including some sort of user auth/identification to allow users to save articles, favorite filters or queries, and receive a newsletter/summary of new articles that have been posted.
* More details on the article details page. This page is limited due to the info provided from the free tier of the NewsApi. Further tiers provide more information that could be displayed here.
* The article details page could also include a section to display a list of related articles. 
* Could also add more data/metrics to be tracked for each article and user. For example: If we knew what types of users look at what type of articles then a feature could be developed to serve a user "recommended" articles that they might have missed. 