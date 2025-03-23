# Aesthetic Suggestion Engine Project

## Project Overview
An application that recommends music, art, and fashion based on existing aesthetic preferences while pushing users slightly out of their comfort zone.

## Implementation Plan

### Step 1: Start with a Music-Only MVP
- Use Spotify API (free tier) for recommendations
- Build a simple web app with React + Framer Motion for visual appeal
- Store user preferences in MongoDB with this schema:
  - Genres, artists, tracks they like
  - "Adventure level" (how far outside comfort zone)

### Step 2: Create the Algorithm
- Start with Spotify's recommendation API
- Modify results using a "comfort zone expansion" formula:
  - 70% similarity to preferences + 30% novelty
  - Adjust based on user feedback

### Step 3: Build a Simple UI
- Onboarding flow to collect initial preferences
- Card-based interface showing recommendations
- Swipe/like/save mechanics for feedback

### Step 4: Deploy and Test
- Host on Heroku (free tier) for early testing
- Get feedback from small user group
- Refine algorithm based on interactions

### Step 5: Expand to Art/Fashion
- Add Unsplash API (free) for visual art
- Integrate Pinterest API for fashion
- Create cross-domain recommendations (music that matches art)

## Technical Details

### APIs
- **Music**: Spotify Web API, Last.fm API
- **Art**: Unsplash API, Art Institute of Chicago API
- **Fashion**: Pinterest API, ShopStyle Collective API

### Frontend
- React + Framer Motion for animations
- Card-based interface for recommendations
- Mobile-first responsive design

### Backend
- Node.js with Express
- MongoDB for user preferences
- Algorithm using collaborative and content-based filtering

### Database Schema

#### User Preferences
```javascript
{
  userId: String,
  musicPreferences: {
    genres: [String],
    favoriteArtists: [String],
    listeningHistory: [{
      trackId: String,
      timestamp: Date,
      listenerReaction: String
    }],
    adventureLevel: Number // 0-100
  },
  visualPreferences: {
    colors: [String],
    styles: [String],
    favoriteArtists: [String]
  },
  fashionPreferences: {
    preferredColors: [String],
    styleCategories: [String]
  }
}
```

## Development Timeline

### Phase 1: Foundation (4 weeks)
- Week 1-2: Setup project, implement auth, design database
- Week 3-4: Connect to Spotify API, build basic UI

### Phase 2: Core Engine (4 weeks)
- Week 5-6: Implement basic recommendation algorithm
- Week 7-8: Develop preference collection and storage

### Phase 3: MVP Release (4 weeks)
- Week 9-10: Build feedback mechanisms and refine UI
- Week 11-12: Testing, bug fixes, and MVP deployment

### Phase 4: Iteration (ongoing)
- Analytics integration
- User feedback collection
- Gradual expansion to art and fashion domains