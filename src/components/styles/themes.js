export const constants = {
    lightBlue: '#e6f0f5',
    mediumLightBlue: '#dae2e6',
    mediumBlue: '#31baf0',
    blue: '#1fa7dd',
    darkWhite: '#fcfbfb',
    lightGrey: '#f8f9fa',
    mediumLightGrey: '#ededee',
    mediumLightGreyDarker: '#e7e7e9',
    mediumGreyLighter: '#e0e0e2',
    mediumGrey: '#dbd9d9',
    mediumDarkGrey: '#b8b4b4',
    darkGrey: '#9b9999',
    lightBlack: '#5a5858',
    mediumBlack: '#454849',
    black: '#333232',
    red: '#d61851',
    
    radiusLarge: '100px',

    smallFont: '14px',
    mediumSmallFont: '16px',
    mediumFont: '18px',
    mediumLargeFont: '20px',
    largeFont: '22px',
    headerFontSize: '25px',

    boldFont: '600', 

    lightShadow: '0px 5px 10px -1px rgba(83, 84, 85, 0.105)',
    mediumLightShadow: '0px 5px 10px -1px rgba(83, 84, 85, 0.15)',
    mediumDarkShadow: '0px 5px 10px -1px rgba(83, 84, 85, 0.388)',
    darkShadow: '0px 5px 10px -1px rgba(83, 84, 85, 0.452)',
    blurredMediumShadow: '0px 11px 31px -15px rgba(62, 63, 65, 0.230)',
    bottomLightShadow: '-1px 15px 9px -9px rgba(83, 84, 85, 0.13)',
}
//0px 5px 10px -1px rgba(62, 63, 65, 0.230)
//c0b9b9

export const light = {
    mainColor: constants.black,
    invertedMainColor: 'white',

    lightMainColor: constants.lightBlack,
    secondaryTextColor: constants.darkGrey,
    secondaryTextSize: constants.smallFont,
    blue: constants.blue,
    mediumBlue: constants.mediumBlue,
    mediumGrey: constants.mediumDarkGrey,
    hoverLinkColor: constants.blue,
    hoverOnLightBackground: constants.lightBlue,
    hoverOnDarkBackground: constants.mediumLightBlue,
    entityBorder: constants.mediumLightGreyDarker,
    entityHoverBorder: constants.mediumDarkGrey,
    entityHoverBackground: constants.darkWhite,
    entityShadow: constants.mediumLightShadow,
    entityContainerBackground: constants.lightGrey,
    entityContainerBorder: constants.mediumLightGrey,
    entityContainerShadow: constants.blurredMediumShadow,
    navShadow: constants.bottomLightShadow,
    modalBackground: constants.mediumLightGrey,
    backgroundBehindModal: 'rgba(0,0,0,0.4)',
    modalShadow: '10px 10px 30px -7px rgb(80, 81, 82)',
    modalHeaderBackground: constants.black,
    inputShadow: constants.lightShadow,
    inputBackground: 'white',
    formaLabelColor: constants.mediumDarkGrey,
    formLabelFontSize: '13px',
    paleIcon: constants.mediumDarkGrey,
    profileNavBackground: '#e8eaeca8',
    profileSidebarBackgroundHover: constants.mediumLightGreyDarker,
    profileSidebarBackgroundActive: constants.darkGrey,

    maxEntityWidth: '600px',
    minModalHeight: '150px',
}

export const dark = {
    mainColor: constants.mediumLightGrey,
    invertedMainColor: constants.black,

    secondaryTextColor: constants.darkGrey,
    secondaryTextSize: constants.smallFont,

    lightMainColor: constants.lightGrey,
    blue: constants.blue,
    mediumBlue: constants.mediumBlue,
    hoverLinkColor: '#7dd8ff',
    hoverOnLightBackground: constants.lightBlack,
    hoverOnDarkBackground: constants.lightBlack,

    maxEntityWidth: '600px',

    formLabelFontSize: '13px',
    inputBackground: '#ffffff2a',

}
