export const colors = [
  '#ef4444', // Red
  '#f97316', // Orange
  '#d97706', // Amber (darker for light theme)
  '#ca8a04', // Yellow (darker for light theme)
  '#65a30d', // Lime (darker)
  '#16a34a', // Green (darker)
  '#059669', // Emerald
  '#0d9488', // Teal
  '#0891b2', // Cyan
  '#0284c7', // Sky
  '#2563eb', // Blue
  '#4f46e5', // Indigo
  '#7c3aed', // Violet
  '#9333ea', // Purple
  '#c026d3', // Fuchsia
  '#db2777', // Pink
  '#e11d48', // Rose
];

export const getSkillColor = (skillName) => {
  let hash = 0;
  for (let i = 0; i < skillName.length; i++) {
    hash = skillName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
