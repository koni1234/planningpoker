const VOTING_SCALE_TSHIRT = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];
const VOTING_SCALE_FIBONACCI = ['1', '2', '3', '5', '8', '13', '21'];

export const VOTING_SCALES_VALUES = {
    fibonacci: VOTING_SCALE_FIBONACCI,
    tshirt: VOTING_SCALE_TSHIRT,
};

export const GRAPH_URL = `${import.meta.env.VITE_GRAPHQL_HOST}:${
    import.meta.env.VITE_GRAPHQL_PORT
}/graphql`;
