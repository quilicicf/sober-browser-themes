module.exports = ({ description, name, shortName, color, tintedBlack, version }) => (
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
        // Templated
        tab_background_text: color,
        tab_text: color,

        button_background: tintedBlack,
        control_background: tintedBlack,
        frame: tintedBlack,
        frame_incognito: tintedBlack,
        ntp_background: tintedBlack,
        ntp_header: tintedBlack,
        toolbar: tintedBlack,

        // Shamelessly copied elsewhere
        bookmark_text: [ 232, 232, 232 ],
        frame_inactive: [ 71, 71, 71 ],
        frame_incognito_inactive: [ 71, 71, 71 ],
        ntp_link: [ 255, 255, 255 ],
        ntp_link_underline: [ 255, 255, 255 ],
        ntp_section: [ 74, 74, 74 ],
        ntp_section_link: [ 6, 55, 116 ],
        ntp_section_link_underline: [ 255, 255, 255 ],
        ntp_section_text: [ 255, 255, 255 ],
        ntp_text: [ 255, 255, 255 ],
      },
      tints: {
        background_tab: [ -1.0, 0.5, 0.53 ]
      }
    },
    version
  }
);
