export default {
  supportedLanguages: [
    {id: 'tr', title: 'Türkçe'},
    {id: 'en', title: 'İngilizce'},
  ],
  defaultLanguages: ['tr'],
  documentTypes: ['product', 'tag', 'model', 'page'],
  filterField: (enclosingType, field, selectedLanguageIds) =>
    !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name),
}