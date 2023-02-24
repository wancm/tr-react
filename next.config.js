/** @type {import('next').NextConfig} */

// https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
// strict mode might caused some effect in DEV mode, one of the thing is useEffect() might run twice
// StrictMode renders components twice (on dev but not production) in order to detect any problems with your code and warn you about them (which can be quite useful).

// https://beta.reactjs.org/reference/react/StrictMode
//
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
