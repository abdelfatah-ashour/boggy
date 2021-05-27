import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="BOGGY E-commerce website for presenting products like as a mobile phones and technology or clothing"
          />
          <meta name="robots" content="noindex nofollow" />

          {/* Bootstrap CSS */}
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />

          {/* google font for links */}
          <link
            href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap"
            rel="stylesheet"></link>

          {/* google font for heading */}
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@1,600&display=swap"
            rel="stylesheet"
          />
          {/* google fonts for global */}
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap"
            rel="stylesheet"
          />

          {/* google font for name of brand */}
          <link
            href="https://fonts.googleapis.com/css2?family=Ceviche+One&display=swap"
            rel="stylesheet"></link>

          {/* Bootstrap JS */}
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
          {/* <!-- Include the PayPal JavaScript SDK --> */}
          <script src="https://www.paypal.com/sdk/js?client-id=AT6lXWBDMRdQNjZoPQ5pdUBzp5-tOcbn-PPxo58r8IGrBNYlZMBkENMt_hmWxU2mlr4eoyS7rTdkUnmk&currency=USD"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
