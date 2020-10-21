import { createGlobalStyle } from "styled-components";

require("typeface-poppins");
require("typeface-space-mono");

const Globals = createGlobalStyle`
    :root {
      --font-primary: "Poppins";
      --font-mono: "Space Mono";

      --color-bg: #002232;
      --color-title: #ffffff;
      --color-text: #192030;
      --color-text-light: #838995;
      --color-accent: #19ae98;
      --color-element: #ffffff;
      --color-grey: #e2e8f0;

      --ratio: 1.61803398875;
      --lh: 1.8;
      --s-1: 16px;
      --s0: 20px;
      --s1: calc(var(--s0) * var(--ratio));
      --s2: calc(var(--s1) * var(--ratio));
      --s3: calc(var(--s2) * var(--ratio));
      --s4: calc(var(--s3) * var(--ratio));
      --rhythm: calc(var(--s0) * var(--lh));
    }

    @media (max-width: 1200px) {
      :root {
        --s0: 16px;
      }
    }

    @media (max-width: 896px) {
      :root {
        --s0: 14px;
      }
    }

    @media (max-width: 600px) {
      :root {
        --s-1: 12px;
        --s0: 12px;
      }
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
      scroll-padding-top: 107px;
    }

    body {
      position: relative;
      background-color: var(--color-bg);
      overflow-x: hidden;
      transition: background-color 0.5s ease-out;
    }

    ul {
      list-style: none;
    }

    button {
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Globals />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
