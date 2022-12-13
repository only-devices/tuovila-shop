import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useLocation } from "@reach/router"

export function Seo({
  title = "",
  description = "",
  pathname = "",
  image = "",
  children = null,
}) {
  const location = useLocation()
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteTitleDefault
          siteUrl
          siteDescription
          siteImage
        }
      }
    }
  `)

  const {
    siteTitle,
    siteTitleDefault,
    siteUrl,
    siteDescription,
    siteImage,
  } = siteMetadata

  const seo = {
    title: title || siteTitleDefault,
    description: description || siteDescription,
    url: pathname ? `${siteUrl}${pathname}` : location.href,
    image: `${siteUrl}${image || siteImage}`,
  }

  return (
    <>
      <title> {title ? `${title} | ${siteTitle}`: siteTitleDefault}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content="website" />
    </>
  )
}
