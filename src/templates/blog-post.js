import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Img from "gatsby-image"
import SEO from "../components/seo"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
export const query = graphql`
query ($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      publishedDate(formatString: "")
      fearturedImage{
        gatsbyImageData
        contentful_id
        title
      }
      body {
        raw
      }
    }
  }
`

const BlogPost = props => {
  return (
    <Layout>
      <SEO title={props.data.contentfulBlogPost.title} />
      <Link to="/blog/">Visit the Blog Page</Link>
      <div className="content">
        <h1>{props.data.contentfulBlogPost.title}</h1>
        <span className="meta">
          Posted on {props.data.contentfulBlogPost.publishedDate}
        </span>
      <GatsbyImage image={getImage(props.data.contentfulBlogPost.fearturedImage)} alt={getImage(props.data.contentfulBlogPost.fearturedImage)} /> 
        <h1>{props.data.contentfulBlogPost.fearturedImage.title}</h1>
        {documentToReactComponents(JSON.parse(props.data.contentfulBlogPost.body.raw))}
      </div>
    </Layout>
  )
}

export default BlogPost