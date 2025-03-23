const mongoose = require('mongoose');

const vibeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  alternateNames: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    required: true
  },
  dimensions: {
    sensoryProfile: {
      colorTemperature: { type: Number, min: 0, max: 100, default: 50 },
      textureDensity: { type: Number, min: 0, max: 100, default: 50 },
      lightQuality: { type: Number, min: 0, max: 100, default: 50 },
      soundProfile: { type: Number, min: 0, max: 100, default: 50 },
      spatialDensity: { type: Number, min: 0, max: 100, default: 50 }
    },
    emotionalValence: {
      pleasure: { type: Number, min: 0, max: 100, default: 50 },
      arousal: { type: Number, min: 0, max: 100, default: 50 },
      depth: { type: Number, min: 0, max: 100, default: 50 },
      familiarity: { type: Number, min: 0, max: 100, default: 50 },
      safety: { type: Number, min: 0, max: 100, default: 50 }
    },
    culturalPosition: {
      mainstreamAlignment: { type: Number, min: 0, max: 100, default: 50 },
      historicalOrientation: { type: Number, min: 0, max: 100, default: 50 },
      geographicAssociation: { type: Number, min: 0, max: 100, default: 50 },
      socioeconomicMarkers: { type: Number, min: 0, max: 100, default: 50 },
      culturalSophistication: { type: Number, min: 0, max: 100, default: 50 }
    },
    functionality: {
      activitySupport: { type: Number, min: 0, max: 100, default: 50 },
      socialStructure: { type: Number, min: 0, max: 100, default: 50 },
      attentionQuality: { type: Number, min: 0, max: 100, default: 50 },
      durationDesign: { type: Number, min: 0, max: 100, default: 50 },
      adaptability: { type: Number, min: 0, max: 100, default: 50 }
    }
  },
  tags: {
    aestheticMovements: [String],
    emotionalKeywords: [String],
    contextualSettings: [String],
    culturalReferences: [String]
  },
  examples: [{
    type: { type: String, enum: ['image', 'video', 'audio', 'text'] },
    url: String,
    description: String
  }],
  relationships: [{
    vibeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vibe'
    },
    relationType: {
      type: String,
      enum: ['similar', 'opposite', 'derivative', 'inspiration', 'complement']
    },
    strength: {
      type: Number,
      min: 0,
      max: 100
    }
  }],
  created: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  publiclyVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'lastUpdated' }
});

// Add text index for searching
vibeSchema.index({ 
  name: 'text', 
  description: 'text', 
  alternateNames: 'text',
  'tags.aestheticMovements': 'text',
  'tags.emotionalKeywords': 'text',
  'tags.contextualSettings': 'text',
  'tags.culturalReferences': 'text'
});

// Method to find similar vibes
vibeSchema.methods.findSimilar = async function() {
  return this.model('Vibe').find({
    _id: { $ne: this._id },
    $or: [
      { 'relationships.vibeId': this._id },
      { _id: { $in: this.relationships.map(r => r.vibeId) } }
    ]
  });
};

const Vibe = mongoose.model('Vibe', vibeSchema);

module.exports = Vibe;