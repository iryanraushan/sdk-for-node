const Service = require('../service.js');

class Database extends Service {

    /**
     * List Collections
     *
     * Get a list of all the user collections. You can use the query params to
     * filter your results. On admin mode, this endpoint will return a list of all
     * of the project collections. [Learn more about different API
     * modes](/docs/modes).
     *
     * @param string search
     * @param number limit
     * @param number offset
     * @param string orderType
     * @throws Exception
     * @return {}
     */
    async listCollections(search = '', limit = 25, offset = 0, orderType = 'ASC')
    {
        let path = '/database';
        
        return await this.client.call('get', path, {'Content-type': 'application/json'},
            {
                'search': search, 
                'limit': limit, 
                'offset': offset, 
                'orderType': orderType
            });
    }

    /**
     * Create Collection
     *
     * Create a new Collection.
     *
     * @param string name
     * @param array read
     * @param array write
     * @param array rules
     * @throws Exception
     * @return {}
     */
    async createCollection(name, read = [], write = [], rules = [])
    {
        let path = '/database';
        
        return await this.client.call('post', path, {'Content-type': 'application/json'},
            {
                'name': name, 
                'read': read, 
                'write': write, 
                'rules': rules
            });
    }

    /**
     * List Documents
     *
     * Get a list of all the user documents. You can use the query params to
     * filter your results. On admin mode, this endpoint will return a list of all
     * of the project documents. [Learn more about different API
     * modes](/docs/modes).
     *
     * @param string collectionId
     * @param array filters
     * @param number offset
     * @param number limit
     * @param string orderField
     * @param string orderType
     * @param string orderCast
     * @param string search
     * @param number first
     * @param number last
     * @throws Exception
     * @return {}
     */
    async listDocuments(collectionId, filters = [], offset = 0, limit = 50, orderField = '$uid', orderType = 'ASC', orderCast = 'string', search = '', first = 0, last = 0)
    {
        let path = '/database/{collectionId}'.replace(new RegExp('{collectionId}', 'g'), collectionId);
        
        return await this.client.call('get', path, {'Content-type': 'application/json'},
            {
                'filters': filters, 
                'offset': offset, 
                'limit': limit, 
                'order-field': orderField, 
                'order-type': orderType, 
                'order-cast': orderCast, 
                'search': search, 
                'first': first, 
                'last': last
            });
    }

    /**
     * Create Document
     *
     * Create a new Document.
     *
     * @param string collectionId
     * @param string data
     * @param array read
     * @param array write
     * @param string parentDocument
     * @param string parentProperty
     * @param string parentPropertyType
     * @throws Exception
     * @return {}
     */
    async createDocument(collectionId, data, read = [], write = [], parentDocument = '', parentProperty = '', parentPropertyType = 'assign')
    {
        let path = '/database/{collectionId}'.replace(new RegExp('{collectionId}', 'g'), collectionId);
        
        return await this.client.call('post', path, {'Content-type': 'application/json'},
            {
                'data': data, 
                'read': read, 
                'write': write, 
                'parentDocument': parentDocument, 
                'parentProperty': parentProperty, 
                'parentPropertyType': parentPropertyType
            });
    }

    /**
     * Delete Collection
     *
     * Delete a collection by its unique ID. Only users with write permissions
     * have access to delete this resource.
     *
     * @param string collectionId
     * @throws Exception
     * @return {}
     */
    async deleteCollection(collectionId)
    {
        let path = '/database/{collectionId}'.replace(new RegExp('{collectionId}', 'g'), collectionId);
        
        return await this.client.call('delete', path, {'Content-type': 'application/json'},
            {
            });
    }

    /**
     * Get Document
     *
     * Get document by its unique ID. This endpoint response returns a JSON object
     * with the document data.
     *
     * @param string collectionId
     * @param string documentId
     * @throws Exception
     * @return {}
     */
    async getDocument(collectionId, documentId)
    {
        let path = '/database/{collectionId}/{documentId}'.replace(new RegExp('{collectionId}', 'g'), collectionId).replace(new RegExp('{documentId}', 'g'), documentId);
        
        return await this.client.call('get', path, {'Content-type': 'application/json'},
            {
            });
    }

    /**
     * Update Document
     *
     * @param string collectionId
     * @param string documentId
     * @param string data
     * @param array read
     * @param array write
     * @throws Exception
     * @return {}
     */
    async updateDocument(collectionId, documentId, data, read = [], write = [])
    {
        let path = '/database/{collectionId}/{documentId}'.replace(new RegExp('{collectionId}', 'g'), collectionId).replace(new RegExp('{documentId}', 'g'), documentId);
        
        return await this.client.call('patch', path, {'Content-type': 'application/json'},
            {
                'data': data, 
                'read': read, 
                'write': write
            });
    }

    /**
     * Delete Document
     *
     * Delete document by its unique ID. This endpoint deletes only the parent
     * documents, his attributes and relations to other documents. Child documents
     * **will not** be deleted.
     *
     * @param string collectionId
     * @param string documentId
     * @throws Exception
     * @return {}
     */
    async deleteDocument(collectionId, documentId)
    {
        let path = '/database/{collectionId}/{documentId}'.replace(new RegExp('{collectionId}', 'g'), collectionId).replace(new RegExp('{documentId}', 'g'), documentId);
        
        return await this.client.call('delete', path, {'Content-type': 'application/json'},
            {
            });
    }
}

module.exports = Database;