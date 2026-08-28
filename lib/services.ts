/**
 * The six services, each with its own photograph.
 *
 * Photography is licensed stock used as atmosphere. No image is captioned as a
 * Primestone project — see PRODUCT.md.
 */
export type Service = {
  id: string
  name: string
  note: string
  image: string
  position: string
}

export const SERVICES: Service[] = [
  { id: "residential", name: "Residential construction", note: "Family homes, from foundations on an empty plot through to handover.", image: "panel-distance", position: "50% 60%" },
  { id: "commercial", name: "Commercial construction", note: "Offices, retail units and mixed-use buildings.", image: "panel-services", position: "50% 40%" },
  { id: "renovation", name: "Renovation and remodelling", note: "Extending, reworking or finishing a building that already stands.", image: "panel-projects", position: "50% 45%" },
  { id: "civil", name: "Civil engineering", note: "Roads, drainage and infrastructure works.", image: "svc-civil", position: "50% 50%" },
  { id: "site", name: "Site development", note: "Clearing, levelling and preparing land before a build begins.", image: "panel-build", position: "50% 55%" },
  { id: "custom", name: "Custom builds", note: "Work that does not fit a standard shape.", image: "panel-people", position: "50% 45%" },
]
