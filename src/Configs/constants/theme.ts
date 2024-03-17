import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    base: '#FFFFFF',
    base1: '#E0E1DD',
    primary: "#24C16B", // verde
    secondary: "#0C381F", // verde oscuro

    green: "#66D59A",
    lightGreen: "#E6FEF0",

    lime: "#00BA63",
    emerald: "#2BC978",

    red: "#FF4134",
    lightRed: "#FFF1F0",

    purple: "#6B3CE9",
    lightPurple: "#F3EFFF",

    yellow: "#FFC664",
    lightYellow: "#FFF9EC",

    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#FCFBFC",
    gray: "#C1C3C5",
    darkGray: "#C3C6C7",
    blue:'#0066CC',

    transparent: "transparent",
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

export const ThemeStyles = StyleSheet.create({
    container: {
        flex: 1,

    },
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    HomeContainer:{
        paddingHorizontal: SIZES.padding * 3
    },
    globalMargin: {
        marginHorizontal: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8
    },
    title: {
        ...FONTS.h1
    },
    bannerImg: {
        width: "100%",
        height: "100%",
        borderRadius: 20
    },
    bannerContainer: {
        height: 120,
        borderRadius: 20,
    },
    swicheText: {
        fontSize: 25,
        margin: 6
    },
    swichRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
   
    
})



const appTheme = { COLORS, SIZES, FONTS,ThemeStyles };

export default appTheme;