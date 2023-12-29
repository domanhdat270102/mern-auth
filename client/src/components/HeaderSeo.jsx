import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

function HeaderSeo({ title, description }) {
  const location = useLocation();
  const mainUrl = "https://mern-real-estate-tgnu.onrender.com";
  const url = `${mainUrl}${location.pathname}${location.search}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${mainUrl}/MPB Logo-03.png`} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

export default HeaderSeo;
