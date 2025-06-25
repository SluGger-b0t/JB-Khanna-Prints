// ./sanity/env.js
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID
export const dataset = process.env.SANITY_STUDIO_DATASET
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2023-01-01'

console.log('projectId:', projectId)
console.log('dataset:', dataset)
console.log('apiVersion:', apiVersion)