import { traditions } from '../data/mockTraditions';
import { categories } from '../data/categories';

/**
 * Service Layer for Dastur Project.
 * This simulates backend calls. In the future, replace the return implementation 
 * with actual fetch/axios calls to your API.
 */
export const TraditionService = {
  // Get all traditions (for lists)
  getAllTraditions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(traditions), 100);
    });
  },

  // Get tradition by ID with rich details
  getTraditionById: async (id) => {
    return new Promise((resolve, reject) => {
      const tradition = traditions.find(t => t.id === Number(id));
      if (tradition) {
        setTimeout(() => resolve(tradition), 100);
      } else {
        reject(new Error('Tradition not found'));
      }
    });
  },

  // Get all categories
  getCategories: async () => {
    return new Promise((resolve) => resolve(categories));
  },

  // Enhanced search traditions - searches all fields
  searchTraditions: async (query) => {
    return new Promise((resolve) => {
      const lowerQuery = query.toLowerCase().trim();
      if (!lowerQuery) {
        resolve([]);
        return;
      }

      // Split query into words for better matching
      const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 1);

      const results = traditions
        .map(t => {
          let score = 0;
          
          // Title match (highest priority)
          if (t.title.toLowerCase().includes(lowerQuery)) {
            score += 100;
          }
          queryWords.forEach(word => {
            if (t.title.toLowerCase().includes(word)) score += 20;
          });

          // Category match
          if (t.category?.toLowerCase().includes(lowerQuery)) {
            score += 30;
          }
          queryWords.forEach(word => {
            if (t.category?.toLowerCase().includes(word)) score += 10;
          });

          // Short description match
          if (t.shortDesc?.toLowerCase().includes(lowerQuery)) {
            score += 50;
          }
          queryWords.forEach(word => {
            if (t.shortDesc?.toLowerCase().includes(word)) score += 5;
          });

          // Content blocks search
          if (t.content) {
            t.content.forEach(block => {
              // Text content (intro, section)
              if (block.text?.toLowerCase().includes(lowerQuery)) {
                score += 20;
              }
              queryWords.forEach(word => {
                if (block.text?.toLowerCase().includes(word)) score += 3;
              });

              // Section titles
              if (block.title?.toLowerCase().includes(lowerQuery)) {
                score += 25;
              }

              // Howto steps
              if (block.steps) {
                block.steps.forEach(step => {
                  if (step.toLowerCase().includes(lowerQuery)) {
                    score += 15;
                  }
                  queryWords.forEach(word => {
                    if (step.toLowerCase().includes(word)) score += 2;
                  });
                });
              }

              // List items
              if (block.items) {
                block.items.forEach(item => {
                  if (item.toLowerCase().includes(lowerQuery)) {
                    score += 10;
                  }
                  queryWords.forEach(word => {
                    if (item.toLowerCase().includes(word)) score += 2;
                  });
                });
              }

              // Quotes
              if (block.type === 'quote' && block.text?.toLowerCase().includes(lowerQuery)) {
                score += 15;
              }
            });
          }

          return { tradition: t, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.tradition);

      resolve(results);
    });
  },

  // Get traditions by category
  getTraditionsByCategory: async (categoryId) => {
    return new Promise((resolve) => {
      const filtered = traditions.filter(t => t.categoryId === categoryId);
      resolve(filtered);
    });
  },

  // Get traditions by life stage
  getTraditionsByLifeStage: async (stageId) => {
    return new Promise((resolve) => {
      const filtered = traditions.filter(t => t.lifeStages?.includes(stageId));
      resolve(filtered);
    });
  }
};
