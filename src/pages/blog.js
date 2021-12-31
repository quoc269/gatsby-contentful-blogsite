import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Blog = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allContentfulBlogPost(sort: {fields: publishedDate, order: ASC}) {
            edges {
              node {
                body {
                  raw
                }
                excerpt {
                  raw
                }
                fearturedImage {
                  gatsbyImageData
                  contentful_id
                  title                  
                }
                id
                title
                slug
                publishedDate(formatString: "")
              }
            }
        }
      }
    `
  )
  return (
    <Layout>
      <SEO title="Blog" />
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
      <ul className="posts">
        {data.allContentfulBlogPost.edges.map(edge => {
          return (
            <li className="post" key={edge.node.id}>
              <h2>
                <Link to={`/blog/${edge.node.slug}/`}>{edge.node.title}</Link>
              </h2>
              <div className="meta">
                <span>Posted on {edge.node.publishedDate}</span>
              </div>
              {edge.node.fearturedImage && (
                <Img
                  className="featured"
                  fluid={edge.node.fearturedImage.contentful_id}
                  alt={edge.node.fearturedImage.title}                  
                />
              )} 
              <GatsbyImage image={getImage(edge.node.fearturedImage.gatsbyImageData)} alt={getImage(edge.node.fearturedImage.gatsbyImageData)} /> 
              <h1>{edge.node.fearturedImage.gatsbyImageData.images.fallback.src}</h1>           
              <div className="button">
                <Link to={`/blog/${edge.node.slug}/`}>Read More</Link>
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default Blog