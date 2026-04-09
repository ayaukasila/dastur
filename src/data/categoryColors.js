/** Единая цветовая система по категориям (акцент, фон тега, цвет текста тега) */
export const categoryColorMap = {
  wedding: { accent: '#D4537E', bg: '#FBEAF0', text: '#993556' },
  childhood: { accent: '#3B8BD4', bg: '#E6F1FB', text: '#185FA5' },
  hospitality: { accent: '#1D9E75', bg: '#E1F5EE', text: '#0F6E56' },
  holidays: { accent: '#BA7517', bg: '#FAEEDA', text: '#854F0B' },
  funeral: { accent: '#888780', bg: '#F1EFE8', text: '#5F5E5A' },
  oraza: { accent: '#534AB7', bg: '#EEEDFE', text: '#3C3489' },
};

export function getCategoryColors(categoryId) {
  return categoryColorMap[categoryId] || {
    accent: 'var(--color-gold)',
    bg: 'rgba(230, 184, 0, 0.15)',
    text: 'var(--color-gold)',
  };
}
