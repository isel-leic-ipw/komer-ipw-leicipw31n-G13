const URI_PREFIX = 'htpp://localhost:9200'
    
export default function(index) {

    return {
        getAll: () => `${URI_PREFIX}${index}/_search`,
        get: (id) => `${URI_PREFIX}${index}/_doc/${id}`,
        create: () => `${URI_PREFIX}${index}/_doc/`,
        update: (id) => `${URI_PREFIX}${index}/_docs/${id}`,
        delete: (id) => `${URI_PREFIX}${index}/_docs/${id}`,
    }
    }