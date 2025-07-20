import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "dashboard_title": "Canadian University Enrolment Dashboard",
      "dashboard_subtitle": "An interactive look at student enrolment data across Canada.",
      "province_select_label": "Select a Province",
      "all_provinces": "All Provinces",
      "bar_chart_title": "Full-Time Enrolment in {{province}}",
      "pie_chart_title": "Enrolment Breakdown for {{university}}",
      "full_time_undergrad": "FT Undergrad",
      "full_time_grad": "FT Graduate",
      "part_time_undergrad": "PT Undergrad",
      "footer_note": "Note: All data is synthetically generated for demonstration purposes only.",
      "controls_title": "Dashboard Controls",
      "click_for_details": "Click a bar to see details"
    }
  },
  fr: {
    translation: {
      "dashboard_title": "Tableau de Bord des Inscriptions Universitaires",
      "dashboard_subtitle": "Aperçu interactif des données sur les inscriptions étudiantes.",
      "province_select_label": "Sélectionnez une province",
      "all_provinces": "Toutes les provinces",
      "bar_chart_title": "Inscriptions à temps plein en {{province}}",
      "pie_chart_title": "Répartition des inscriptions pour {{university}}",
      "full_time_undergrad": "1er cycle TP",
      "full_time_grad": "Cycles sup. TP",
      "part_time_undergrad": "1er cycle TPartiel",
      "footer_note": "Note : Toutes les données sont générées synthétiquement à des fins de démonstration.",
      "controls_title": "Contrôles du tableau de bord",
      "click_for_details": "Cliquez sur une barre pour voir les détails"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;