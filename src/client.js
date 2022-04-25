import sanityClient from '@sanity/client'

export default sanityClient({
    projectId: "6v3w42bf",
    dataset: "production",
    useCdn: true
})