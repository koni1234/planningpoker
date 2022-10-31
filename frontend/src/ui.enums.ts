export enum FLEX_WRAP {
    WRAP = 'wrap',
    NOWRAP = 'nowrap',
    REVERSE = 'wrap-reverse',
}

export enum FLEX_JUSTIFY {
    FLEX_START = 'flex-start',
    FLEX_END = 'flex-end',
    CENTER = 'center',
    SPACE_BETWEEN = 'space-between',
    SPACE_AROUND = 'space-around',
}

export enum FLEX_CONTENT {
    FLEX_START = 'flex-start',
    FLEX_END = 'flex-end',
    CENTER = 'center',
    SPACE_BETWEEN = 'space-between',
    SPACE_AROUND = 'space-around',
}

export enum FLEX_ALIGN {
    FLEX_START = 'flex-start',
    FLEX_END = 'flex-end',
    CENTER = 'center',
    STRETCH = 'stretch',
    BASELINE = 'baseline',
}

export enum FLEX_DIRECTION {
    ROW = 'row',
    ROW_REVERSE = 'row-reverse',
    COLUMN = 'column',
    COLUMN_REVERSE = 'column-reverse',
}

export enum GRID_GUTTERS {
    SIZE_8 = '8',
    SIZE_16 = '16',
    SIZE_24 = '24',
    SIZE_32 = '32',
}

export enum GRID_BEHAVIORS {
    FIXED = 'fixed',
    STRETCH = 'stretch',
    NO_SHRINK = 'no-shrink',
}

export enum VERTICAL_ALIGNMENTS {
    TOP = 'top',
    MIDDLE = 'middle',
    BOTTOM = 'bottom',
}

export enum SIDES {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export enum BUTTON_SIZES {
    X_SMALL = 'xs',
    SMALL = 's',
    MEDIUM = 'm',
}

export enum BUTTON_VARIANTS {
    PRIMARY = 'primary',
    PRIMARY_OUTLINE = 'primary-outline',
    SECONDARY = 'secondary',
    SECONDARY_OUTLINE = 'secondary-outline',
    TERTIARY = 'tertiary',
    TERTIARY_OUTLINE = 'tertiary-outline',
    DANGER = 'danger',
    DANGER_OUTLINE = 'danger-outline',
    LINK = 'link',
}

export enum TEXT_ALIGNMENTS {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
}

export enum TEXT_SIZES {
    SIZE_10 = '10',
    SIZE_11 = '11',
    SIZE_12 = '12',
    SIZE_14 = '14',
    SIZE_16 = '16',
    SIZE_18 = '18',
    SIZE_20 = '20',
    SIZE_24 = '24',
    SIZE_28 = '28',
}

export enum TEXT_VARIANTS {
    HEADER_1 = 'header-1',
    HEADER_2 = 'header-2',
    HEADER_3 = 'header-3',
    HEADER_4 = 'header-4',
    HEADER_5 = 'header-5',
    HEADER_6 = 'header-6',
    TEXT_SMALL = 'text-small',
    TEXT = 'text',
    TEXT_LARGE = 'text-large',
    INPUT_LABEL = 'input-label',
}

export enum FONT_WEIGHTS {
    BOLD = 'bold',
    REGULAR = 'regular',
    LIGHT = 'light',
}

export const BASE_COLORS = {
    BLACK: 'black',
    BLUE: 'blue',
    GREEN: 'green',
    GREY: 'grey',
    ORANGE: 'orange',
    RED: 'red',
    WHITE: 'white',
    TRANSPARENT: 'transparent',
};

export const MAIN_COLORS = {
    PRIMARY: 'primary',
    PRIMARY_LIGHT: 'primary-light',
    PRIMARY_DARK: 'primary-dark',
    SECONDARY: 'secondary',
    SECONDARY_LIGHT: 'secondary-light',
    SECONDARY_DARK: 'secondary-dark',
    TERTIARY: 'tertiary',
    TERTIARY_LIGHT: 'tertiary-light',
    TERTIARY_DARK: 'tertiary-dark',
};

export const STATUS_COLORS = {
    DANGER: 'danger',
    DANGER_DARK: 'danger-dark',
    DANGER_LIGHT: 'danger-light',
    INFO: 'info',
    INFO_LIGHT: 'info-light',
    INFO_DARK: 'info-dark',
    SUCCESS: 'success',
    SUCCESS_LIGHT: 'success-light',
    SUCCESS_DARK: 'success-dark',
    WARNING: 'warning',
    WARNING_LIGHT: 'warning-light',
    WARNING_DARK: 'warning-dark',
};

export const GREYSCALE_COLORS = {
    WHITE: 'white',
    GREY_1: 'grey-1',
    GREY_2: 'grey-2',
    GREY_3: 'grey-3',
    GREY_4: 'grey-4',
    GREY_5: 'grey-5',
    GREY_6: 'grey-6',
    GREY_7: 'grey-7',
    BLACK: 'black',
};

export const ALL_COLORS = { ...BASE_COLORS, ...GREYSCALE_COLORS, ...MAIN_COLORS, ...STATUS_COLORS };
