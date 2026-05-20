export const GET_LISTINGS = `
  query GetListings($first: Int, $after: String, $taxQuery: [RootQueryToListingConnectionWhereArgsTaxArray]) {
    listings(first: $first, after: $after, where: { taxQuery: { taxArray: $taxQuery } }) {
      nodes {
        id
        slug
        title
        excerpt
        listingType
        acf {
          address
          city
          state
          zip
          phone
          email
          website
          geoLat
          geoLng
          logo { sourceUrl altText }
          businessHours
          featured
          claimed
          yearFounded
        }
        serviceTypes { nodes { slug name } }
        certifications { nodes { slug name } }
        locationState { nodes { slug name } }
        locationCity { nodes { slug name } }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const GET_LISTING = `
  query GetListing($slug: ID!) {
    listing(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      listingType
      acf {
        address
        city
        state
        zip
        phone
        email
        website
        geoLat
        geoLng
        logo { sourceUrl altText }
        photos { sourceUrl altText }
        businessHours
        featured
        claimed
        yearFounded
      }
      serviceTypes { nodes { slug name } }
      certifications { nodes { slug name } }
      locationState { nodes { slug name } }
      locationCity { nodes { slug name } }
    }
  }
`

export const GET_ARTICLES = `
  query GetArticles($first: Int, $after: String) {
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      nodes {
        id
        slug
        title
        excerpt
        date
        featuredImage { node { sourceUrl altText } }
        categories { nodes { name slug } }
        author { node { name } }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`

export const GET_ARTICLE = `
  query GetArticle($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      excerpt
      content
      date
      modified
      featuredImage { node { sourceUrl altText } }
      categories { nodes { name slug } }
      author { node { name } }
    }
  }
`
