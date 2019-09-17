module.exports = ({ description, name, color, tintedBlack, tintedGray, tintedWhite, version }) => (
  {
    manifest_version: 2,
    description,
    name,
    theme: {
      colors: {
        frame: tintedBlack,
        toolbar: tintedBlack,
        tab_text: color,
        tab_background_text: color,
        tab_background_separator: color,
        frame_inactive: tintedGray,
        icons: tintedWhite,

        toolbar_top_separator: color,
        toolbar_vertical_separator: color,
        toolbar_field_border: color,
        toolbar_field_border_focus: color,

        ntp_background: tintedBlack,
        ntp_text: tintedWhite,

        popup: tintedBlack,
        popup_text: tintedWhite,
        popup_highlight: color,
        popup_highlight_text: tintedBlack,

        sidebar: tintedBlack,
        sidebar_text: tintedWhite,
        sidebar_highlight: color,
        sidebar_highlight_text: tintedBlack,
        sidebar_border: color,
      },
    },
    version,
  }
);

