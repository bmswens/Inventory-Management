import custom from './custom'
import documents from './documents'
import manifests from './manifests'
import kit from './kit'

const api = {
    driver: "custom",
    ...custom,
    documents,
    manifests,
    kit
}

export default api