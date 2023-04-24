import custom from './custom'
import documents from './documents'
import manifests from './manifests'

const api = {
    driver: "custom",
    ...custom,
    documents,
    manifests
}

export default api