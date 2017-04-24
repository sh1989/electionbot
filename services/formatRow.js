'use strict';

function formatRow(result, accessor, emoji) {
  const percentage = `${emoji} ${result.data[accessor]}%`;
  const change = result.diff[accessor];
  if (change > 0) {
    return `${percentage}\t:small_red_triangle: ${change}`;
  } else if (change < 0) {
    return `${percentage}\t:small_red_triangle_down: ${change * -1}`;
  }

  return percentage;
}

module.exports = formatRow;
