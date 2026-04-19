# WordPress Setup Guide for deathcare.live

This guide configures the headless WordPress backend that powers the deathcare.live directory.
Complete every section before connecting the Next.js frontend.

---

## 1. Install Plugins

Install and activate all of these from the WordPress plugin directory or zip upload:

| Plugin | Where to get it | Purpose |
|---|---|---|
| **WPGraphQL** | wordpress.org/plugins/wp-graphql | GraphQL API at `/graphql` |
| **CPT UI** | wordpress.org/plugins/custom-post-type-ui | Register custom post types |
| **WPGraphQL for CPT UI** | wordpress.org/plugins/wpgraphql-for-cpt-ui | Auto-wires CPT UI types into GraphQL |
| **Advanced Custom Fields (ACF)** | wordpress.org/plugins/advanced-custom-fields | Custom fields per CPT |
| **WPGraphQL for ACF** | github.com/wp-graphql/wpgraphql-acf | Exposes ACF fields through GraphQL |
| **FacetWP** | facetwp.com (paid) | Faceted filtering |
| **WPGraphQL for FacetWP** | github.com/FacetWP/facetwp-wpgraphql | Exposes facets through GraphQL |
| **WPGraphQL Smart Cache** | wordpress.org/plugins/wpgraphql-smart-cache | On-demand ISR cache invalidation |

---

## 2. Register Custom Post Types (via CPT UI)

For **each** CPT below, create it in CPT UI → Add/Edit Post Types with these settings:

### Required settings for all CPTs:
- **Show in REST API**: `true`
- **Show in GraphQL**: `true`
- **GraphQL Single Name**: see column below
- **GraphQL Plural Name**: see column below
- **Has Archive**: `true`
- **Public**: `true`
- **Supports**: Title, Editor, Excerpt, Thumbnail

| Slug | Label | GraphQL Single | GraphQL Plural |
|---|---|---|---|
| `funeral_home` | Funeral Home | `funeralHome` | `funeralHomes` |
| `crematorium` | Crematorium | `crematorium` | `crematoria` |
| `cemetery` | Cemetery | `cemetery` | `cemeteries` |
| `supplier` | Supplier | `supplier` | `suppliers` |
| `tech_vendor` | Tech Vendor | `techVendor` | `techVendors` |
| `grief_resource` | Grief Resource | `griefResource` | `griefResources` |

---

## 3. Register Taxonomies (via CPT UI)

For each taxonomy, go to CPT UI → Add/Edit Taxonomies:

### Required settings for all taxonomies:
- **Show in REST API**: `true`
- **Show in GraphQL**: `true`
- **Attach to all 6 CPTs above**

| Slug | Label | GraphQL Single | GraphQL Plural |
|---|---|---|---|
| `service_type` | Service Type | `serviceType` | `serviceTypes` |
| `location_state` | State | `locationState` | `locationStates` |
| `location_city` | City | `locationCity` | `locationCities` |
| `certification` | Certification | `certification` | `certifications` |
| `listing_category` | Listing Category | `listingCategory` | `listingCategories` |

### Add taxonomy terms

**service_type** terms (slug → label):
- `traditional-burial` → Traditional Burial
- `cremation` → Cremation
- `direct-cremation` → Direct Cremation
- `green-burial` → Green Burial
- `conservation-burial` → Conservation Burial
- `aquamation` → Aquamation / Water Cremation
- `pre-planning` → Pre-planning / Preneed
- `grief-counseling` → Grief Counseling
- `support-groups` → Support Groups
- `online-therapy` → Online Therapy
- `funeral-home-software` → Funeral Home Software
- `online-memorials` → Online Memorials

**certification** terms (slug → label):
- `nfda-member` → NFDA Member
- `iccfa-member` → ICCFA Member
- `cana-member` → CANA Member
- `green-burial-certified` → Green Burial Certified
- `veteran-services` → Veteran Services
- `licensed-therapist` → Licensed Therapist

**location_state** terms: Create one term per US state using the 2-letter state code as the slug (e.g., `mi` → Michigan, `oh` → Ohio).

---

## 4. Configure ACF Field Groups

Go to ACF → Add New and create **one field group** with the title "Listing Details".

Set **Location Rule**: Show if `Post Type` is any of the 6 CPTs.

Add these fields:

| Field Label | Field Name | Type | Notes |
|---|---|---|---|
| Address | `address` | Text | Street address |
| City | `city` | Text | |
| State | `state` | Text | 2-letter code (MI, OH…) |
| ZIP Code | `zip` | Text | |
| Phone | `phone` | Text | Include area code |
| Email | `email` | Email | |
| Website | `website` | URL | |
| Latitude | `geo_lat` | Number | For proximity search |
| Longitude | `geo_lng` | Number | For proximity search |
| Logo | `logo` | Image | Returns image object |
| Photos | `photos` | Gallery | Additional photos |
| Business Hours | `business_hours` | Textarea | e.g. "Mon–Fri 9am–5pm, Sat 10am–2pm" |
| Featured | `featured` | True/False | Paid featured listing |
| Claimed | `claimed` | True/False | Owner has claimed this listing |
| Year Founded | `year_founded` | Number | |

### Enable ACF fields in GraphQL

In each field's settings, scroll to **GraphQL** → enable "Show in GraphQL".

---

## 5. Configure FacetWP

Go to FacetWP → Facets → Add New. Create these facets:

| Facet Name | Type | Data Source |
|---|---|---|
| State | Checkboxes | Taxonomy: `location_state` |
| City | Checkboxes | Taxonomy: `location_city` |
| Service Type | Checkboxes | Taxonomy: `service_type` |
| Certification | Checkboxes | Taxonomy: `certification` |
| Featured | Radio | Post field: `featured` (ACF) |
| Proximity | Proximity | Post fields: `geo_lat`, `geo_lng` |

Go to FacetWP → Settings → enable "WPGraphQL Integration".

---

## 6. Configure WPGraphQL Smart Cache

Go to WPGraphQL → Smart Cache Settings:

1. Enable smart cache
2. Set the **revalidation webhook URL** to:
   ```
   https://deathcare.live/api/revalidate
   ```
3. Generate a secret token and copy it
4. Set that token as `REVALIDATION_SECRET` in your Next.js `.env.local`

---

## 7. Verify the GraphQL Endpoint

Test the endpoint at `https://deathcare.live/graphql` with this query:

```graphql
{
  funeralHomes(first: 3) {
    nodes {
      id
      slug
      title
      acf {
        city
        state
        phone
        featured
      }
    }
  }
}
```

If you see data, the backend is configured correctly.

---

## 8. Connect the Frontend

In your Next.js project:

1. Copy `.env.example` → `.env.local`
2. Set `NEXT_PUBLIC_WP_GRAPHQL_URL=https://deathcare.live/graphql`
3. Set `REVALIDATION_SECRET` to match the token you created in step 6
4. Run `npm run codegen` to generate TypeScript types from your live schema
5. Run `npm run dev` — the directory now loads real data

---

## 9. Index Listings in Typesense (optional but recommended)

Install Typesense locally or use Typesense Cloud (typesense.io).

Create a collection named `listings` with this schema:

```json
{
  "name": "listings",
  "fields": [
    { "name": "id", "type": "string" },
    { "name": "slug", "type": "string" },
    { "name": "title", "type": "string" },
    { "name": "excerpt", "type": "string", "optional": true },
    { "name": "listingType", "type": "string", "facet": true },
    { "name": "city", "type": "string", "optional": true },
    { "name": "state", "type": "string", "facet": true },
    { "name": "geo", "type": "geopoint", "optional": true }
  ],
  "default_sorting_field": "title"
}
```

Index your listings by querying WPGraphQL for all CPTs and POSTing each to the Typesense collection. Re-index nightly or on listing update via WP hook.
