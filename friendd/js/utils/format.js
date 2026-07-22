/* Formatting Utilities */
function formatDistance(km) {
  if (km === undefined || km === null) return 'Unknown distance';
  if (km < 1) {
    return Math.round(km * 1000) + 'm';
  }
  return km.toFixed(1) + 'km';
}
