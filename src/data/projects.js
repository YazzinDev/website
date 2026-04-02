import gameJamPhoto from '../assets/gamejamwinnerphoto.jpeg';
import exambytePhoto from '../assets/exambyte.jpg';

export const projectConfigs = {
  terrafix: {
    heroImage: gameJamPhoto,
    stack: {
      unreal: { icon: 'view_in_ar', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' },
      perforce: { icon: 'groups', color: 'rgba(166, 230, 255, 0.15)', accent: 'secondary' },
      figma: { icon: 'design_services', color: 'rgba(255, 182, 139, 0.15)', accent: 'tertiary' },
      shaders: { icon: 'flare', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' }
    },
    visionIcons: {
      growth: { icon: 'biotech', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' },
      defense: { icon: 'shield', color: 'rgba(166, 230, 255, 0.15)', accent: 'secondary' },
      visual: { icon: 'palette', color: 'rgba(255, 182, 139, 0.15)', accent: 'tertiary' },
      research: { icon: 'inventory_2', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' }
    }
  },
  exambyte: {
    heroImage: exambytePhoto,
    stack: {
      spring: { icon: 'bolt', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' },
      auth: { icon: 'lock', color: 'rgba(166, 230, 255, 0.15)', accent: 'secondary' },
      architecture: { icon: 'account_tree', color: 'rgba(255, 182, 139, 0.15)', accent: 'tertiary' },
      deployment: { icon: 'terminal', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' }
    },
    visionIcons: {
      automatic: { icon: 'settings_suggest', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' },
      manual: { icon: 'rate_review', color: 'rgba(166, 230, 255, 0.15)', accent: 'secondary' },
      admission: { icon: 'dashboard_customize', color: 'rgba(255, 182, 139, 0.15)', accent: 'tertiary' },
      reporting: { icon: 'insights', color: 'rgba(93, 63, 211, 0.15)', accent: 'primary' }
    }
  }
};
