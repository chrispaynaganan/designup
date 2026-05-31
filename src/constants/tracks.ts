import { Track } from '../types'

export const TRACKS: Track[] = [
  {
    id: 'ui-design',
    name: 'UI design',
    description: 'Components, grids, visual systems',
    color: '#534AB7',
    icon: 'devices',
    totalDays: 28,
  },
  {
    id: 'ux-design',
    name: 'UX design',
    description: 'Research, flows, wireframes',
    color: '#1D9E75',
    icon: 'user-search',
    totalDays: 28,
  },
  {
    id: 'web-design',
    name: 'Web design',
    description: 'Layouts, type, responsive',
    color: '#BA7517',
    icon: 'world',
    totalDays: 28,
  },
  {
    id: 'graphic-design',
    name: 'Graphic design',
    description: 'Composition, colour, type',
    color: '#D85A30',
    icon: 'pentagon',
    totalDays: 28,
  },
  {
    id: 'motion-graphics',
    name: 'Motion graphics',
    description: 'Animation, timing, transitions',
    color: '#D4537E',
    icon: 'arrows-move',
    totalDays: 28,
  },
  {
    id: '3d-design',
    name: '3D design',
    description: 'Modelling, lighting, render',
    color: '#378ADD',
    icon: 'box',
    totalDays: 28,
  },
]

export const XP_PER_DAY = 100
export const TOTAL_DAYS = 28
export const APP_PRICE_PHP = 250
export const CERTIFICATE_PRICE_PHP = 50