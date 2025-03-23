# API Resources for Aesthetic Suggestion Engine

## Music APIs

### Spotify Web API
- **Authentication**: OAuth 2.0
- **Rate Limits**: 25 requests/second (free tier)
- **Cost**: Free tier available
- **Key Endpoints**:
  - `/recommendations` - Get track recommendations based on seed values
  - `/audio-features` - Get audio analysis (tempo, energy, danceability)
  - `/me/top` - Get user's top artists and tracks
- **Documentation**: [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- **JS Library**: [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node)

### Last.fm API
- **Authentication**: API key-based
- **Rate Limits**: 5 requests/second
- **Cost**: Free
- **Key Endpoints**:
  - `user.getTopArtists` - Get a user's top artists
  - `track.getSimilar` - Get similar tracks
  - `artist.getSimilar` - Get similar artists
- **Documentation**: [Last.fm API](https://www.last.fm/api/)
- **JS Library**: [lastfm-node-client](https://github.com/jamesmcnamara/lastfm-node-client)

## Art APIs

### Unsplash API
- **Authentication**: OAuth and API key
- **Rate Limits**: 50 requests/hour (demo)
- **Cost**: Free for most uses
- **Key Endpoints**:
  - `/photos` - Get photos with filtering options
  - `/search/photos` - Search photos by query
  - `/collections` - Get photo collections
- **Documentation**: [Unsplash API](https://unsplash.com/documentation)
- **JS Library**: [@unsplash/js](https://github.com/unsplash/unsplash-js)

### Art Institute of Chicago API
- **Authentication**: Open access
- **Rate Limits**: 60 requests/minute
- **Cost**: Free
- **Key Endpoints**:
  - `/artworks` - Search artworks
  - `/artists` - Search artists
  - `/artwork-types` - Get artwork types
- **Documentation**: [AIC API](https://api.artic.edu/docs/)

## Fashion APIs

### Pinterest API
- **Authentication**: OAuth 2.0
- **Rate Limits**: 1,000 requests/hour
- **Cost**: Free
- **Key Endpoints**:
  - `/pins` - Get pins data
  - `/boards` - Get board data
  - `/search` - Search pins
- **Documentation**: [Pinterest API](https://developers.pinterest.com/docs/api/overview/)

### ShopStyle Collective API
- **Authentication**: API key
- **Rate Limits**: 10,000 requests/day
- **Cost**: Free for affiliates
- **Key Endpoints**:
  - `/products` - Search products
  - `/brands` - Get brand information
  - `/categories` - Get category information
- **Documentation**: [ShopStyle API](https://shopstyle.readme.io/docs)

## Recommendation Algorithm Resources

### JavaScript Libraries
- [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning library
- [Brain.js](https://brain.js.org/) - Neural network library
- [Surprise.js](https://github.com/amgoodfellow/surprise.js) - Recommendation system library

### Implementation References
- [Building a Recommendation System with TensorFlow.js](https://www.tensorflow.org/recommenders)
- [Content-Based Filtering Algorithm Implementation](https://github.com/javascript-machine-learning/content-based-recommender)
- [Collaborative Filtering in JavaScript](https://github.com/benfred/implicit-js)

## Frontend Tools for Visual Experience

### React + Animation
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Spring](https://react-spring.io/) - Physics-based animation library
- [Chakra UI](https://chakra-ui.com/) - Component library with good animations

### UI Design Resources
- [Card Swiping UX References](https://dribbble.com/tags/card_swipe)
- [Recommendation UI Patterns](https://mobbin.design/patterns/recommendation)
- [Mood Board UI Examples](https://www.behance.net/search/projects?tracking_source=typeahead_search_direct&search=mood%20board%20app)