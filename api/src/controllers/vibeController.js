const Vibe = require('../models/Vibe');

// Get all vibes with pagination and filtering
exports.getVibes = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search,
      tag,
      dimension 
    } = req.query;
    
    const query = {};
    
    // Apply search if provided
    if (search) {
      query.$text = { $search: search };
    }
    
    // Apply tag filtering if provided
    if (tag) {
      const [category, value] = tag.split(':');
      if (category && value && ['aestheticMovements', 'emotionalKeywords', 'contextualSettings', 'culturalReferences'].includes(category)) {
        query[`tags.${category}`] = value;
      }
    }
    
    // Apply dimension filtering if provided
    if (dimension) {
      const [category, property, value] = dimension.split(':');
      if (category && property && value && 
          ['sensoryProfile', 'emotionalValence', 'culturalPosition', 'functionality'].includes(category)) {
        const min = parseInt(value) - 10;
        const max = parseInt(value) + 10;
        query[`dimensions.${category}.${property}`] = { $gte: min, $lte: max };
      }
    }
    
    // Handle only publicly visible vibes for regular users
    if (!req.user || req.user.role !== 'admin') {
      query.publiclyVisible = true;
    }
    
    // Fetch vibes with pagination
    const vibes = await Vibe.find(query)
      .sort({ lastUpdated: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      
    // Get total count
    const count = await Vibe.countDocuments(query);
    
    res.json({
      vibes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vibes', error: error.message });
  }
};

// Get a single vibe
exports.getVibe = async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    
    if (!vibe) {
      return res.status(404).json({ message: 'Vibe not found' });
    }
    
    // Check if vibe is publicly visible or belongs to the user
    if (!vibe.publiclyVisible && 
        (!req.user || (req.user.role !== 'admin' && vibe.createdBy.toString() !== req.user._id.toString()))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(vibe);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vibe', error: error.message });
  }
};

// Create a new vibe
exports.createVibe = async (req, res) => {
  try {
    const vibeData = {
      ...req.body,
      createdBy: req.user._id
    };
    
    const vibe = new Vibe(vibeData);
    await vibe.save();
    
    res.status(201).json(vibe);
  } catch (error) {
    res.status(400).json({ message: 'Error creating vibe', error: error.message });
  }
};

// Update a vibe
exports.updateVibe = async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    
    if (!vibe) {
      return res.status(404).json({ message: 'Vibe not found' });
    }
    
    // Check if user is authorized to update the vibe
    if (req.user.role !== 'admin' && vibe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'createdBy' && key !== 'created') {
        vibe[key] = req.body[key];
      }
    });
    
    vibe.lastUpdated = Date.now();
    await vibe.save();
    
    res.json(vibe);
  } catch (error) {
    res.status(400).json({ message: 'Error updating vibe', error: error.message });
  }
};

// Delete a vibe
exports.deleteVibe = async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    
    if (!vibe) {
      return res.status(404).json({ message: 'Vibe not found' });
    }
    
    // Check if user is authorized to delete the vibe
    if (req.user.role !== 'admin' && vibe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await vibe.remove();
    
    res.json({ message: 'Vibe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vibe', error: error.message });
  }
};

// Get similar vibes
exports.getSimilarVibes = async (req, res) => {
  try {
    const vibe = await Vibe.findById(req.params.id);
    
    if (!vibe) {
      return res.status(404).json({ message: 'Vibe not found' });
    }
    
    const similarVibes = await vibe.findSimilar();
    
    res.json(similarVibes);
  } catch (error) {
    res.status(500).json({ message: 'Error finding similar vibes', error: error.message });
  }
};

// Search vibes
exports.searchVibes = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const query = {
      $text: { $search: q },
      publiclyVisible: true
    };
    
    const vibes = await Vibe.find(query)
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);
      
    res.json(vibes);
  } catch (error) {
    res.status(500).json({ message: 'Error searching vibes', error: error.message });
  }
};