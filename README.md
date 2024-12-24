# URL Shortener

## Available scripts
#### Clone the github repo
```
git clone https://github.com/maximhorse314/url-shortener

cd url-shortener
```
#### Build docker images
```
docker compose build
```

#### Start containers
```
docker compose up
```

## Access the services
- Frontend: Access at http://localhost:3000
- Backend: Access API endpoints at http://localhost:4000

## Finished extra features
- Validate the URL provided is an actual URL
- Display an error message if invalid
- Make it easy to copy the shortened URL to the clipboard
- Track visits to the shortened URL
- Add rate-limiting to prevent bad-actors from spamming the service
