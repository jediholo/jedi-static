# JEDI Static Assets

**JEDI static assets** include the main design, scripts and libraries used by web sites of the [JEDI](https://www.jediholo.net) role-playing clan.

## Development

To make local development easier, you can use [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/):

```
# Pull and start container
docker compose up -d
```

Then, point your browser to http://static.dev.jediholo.net/layout.htm and you should see a sample page. Other services running locally can also use assets from this domain.

To stop all containers, run `docker compose stop`. \
To remove containers, run `docker compose down`.

## Credits

- **Lead developer:** Fabien Crespel (a.k.a. Soh Raun)
- **Original design:** Jesse Smith (a.k.a. Ctathos Ederoi)
- **Other contributions:** the JEDI Community
