import breakpoints from '~/utils/themes/breakpoints';

const media = {
  mobile: `@media (max-width:${breakpoints.values?.sm}px)`,
  desktop: `@media (min-width:${breakpoints.values?.sm}px)`,
};

export default media;
