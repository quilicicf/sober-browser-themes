module.exports = ({ description, name, shortName, color, tintedBlack, tintedGray, tintedWhite, version }) => (
  {
    manifest_version: 2,
    description,
    name,
    short_name: shortName,
    icons: {
      16: 'icon-16.png',
      48: 'icon-48.png',
      128: 'icon-128.png',
    },
    theme: {
      colors: {
        frame: tintedBlack,
        toolbar: tintedBlack,
        tab_text: color,
        tab_background_text: color,
        tab_background_separator: color,
        background_tab: tintedGray,
        frame_inactive: tintedGray,
        frame_incognito: tintedBlack,
        frame_incognito_inactive: tintedGray,
        bookmark_text: tintedWhite,
        button_background: tintedBlack,
        control_background: tintedBlack,

        toolbar_button_icon: tintedWhite,

        ntp_background: tintedBlack,
        ntp_header: tintedBlack,
        ntp_text: tintedWhite,
        ntp_link: color,
      }
    },
    version
  }
);
