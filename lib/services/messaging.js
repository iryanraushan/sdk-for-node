const Service = require('../service.js');
const AppwriteException = require('../exception.js');
const InputFile = require('../inputFile.js');
const client = require('../client.js');
const Stream = require('stream');
const { promisify } = require('util');
const fs = require('fs');
const { File } = require('undici');
const Query = require('../query.js');

class Messaging extends Service {

     constructor(client)
     {
        super(client);
     }


    /**
     * List messages
     *
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listMessages(queries, search) {
        const apiPath = '/messaging/messages';
        let payload = {};

        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create an email.
     *
     * @param {string} messageId
     * @param {string} subject
     * @param {string} content
     * @param {string[]} topics
     * @param {string[]} users
     * @param {string[]} targets
     * @param {string[]} cc
     * @param {string[]} bcc
     * @param {MessageStatus} status
     * @param {boolean} html
     * @param {string} scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createEmail(messageId, subject, content, topics, users, targets, cc, bcc, status, html, scheduledAt) {
        const apiPath = '/messaging/messages/email';
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }

        if (typeof subject === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subject"');
        }

        if (typeof content === 'undefined') {
            throw new AppwriteException('Missing required parameter: "content"');
        }


        if (typeof messageId !== 'undefined') {
            payload['messageId'] = messageId;
        }

        if (typeof subject !== 'undefined') {
            payload['subject'] = subject;
        }

        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }

        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }

        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }

        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }

        if (typeof cc !== 'undefined') {
            payload['cc'] = cc;
        }

        if (typeof bcc !== 'undefined') {
            payload['bcc'] = bcc;
        }

        if (typeof status !== 'undefined') {
            payload['status'] = status;
        }

        if (typeof html !== 'undefined') {
            payload['html'] = html;
        }

        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update an email.
     *
     * @param {string} messageId
     * @param {string[]} topics
     * @param {string[]} users
     * @param {string[]} targets
     * @param {string} subject
     * @param {string} content
     * @param {MessageStatus} status
     * @param {boolean} html
     * @param {string[]} cc
     * @param {string[]} bcc
     * @param {string} scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateEmail(messageId, topics, users, targets, subject, content, status, html, cc, bcc, scheduledAt) {
        const apiPath = '/messaging/messages/email/{messageId}'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }

        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }

        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }

        if (typeof subject !== 'undefined') {
            payload['subject'] = subject;
        }

        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }

        if (typeof status !== 'undefined') {
            payload['status'] = status;
        }

        if (typeof html !== 'undefined') {
            payload['html'] = html;
        }

        if (typeof cc !== 'undefined') {
            payload['cc'] = cc;
        }

        if (typeof bcc !== 'undefined') {
            payload['bcc'] = bcc;
        }

        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create a push notification.
     *
     * @param {string} messageId
     * @param {string} title
     * @param {string} body
     * @param {string[]} topics
     * @param {string[]} users
     * @param {string[]} targets
     * @param {object} data
     * @param {string} action
     * @param {string} icon
     * @param {string} sound
     * @param {string} color
     * @param {string} tag
     * @param {string} badge
     * @param {MessageStatus} status
     * @param {string} scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createPush(messageId, title, body, topics, users, targets, data, action, icon, sound, color, tag, badge, status, scheduledAt) {
        const apiPath = '/messaging/messages/push';
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }

        if (typeof title === 'undefined') {
            throw new AppwriteException('Missing required parameter: "title"');
        }

        if (typeof body === 'undefined') {
            throw new AppwriteException('Missing required parameter: "body"');
        }


        if (typeof messageId !== 'undefined') {
            payload['messageId'] = messageId;
        }

        if (typeof title !== 'undefined') {
            payload['title'] = title;
        }

        if (typeof body !== 'undefined') {
            payload['body'] = body;
        }

        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }

        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }

        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }

        if (typeof data !== 'undefined') {
            payload['data'] = data;
        }

        if (typeof action !== 'undefined') {
            payload['action'] = action;
        }

        if (typeof icon !== 'undefined') {
            payload['icon'] = icon;
        }

        if (typeof sound !== 'undefined') {
            payload['sound'] = sound;
        }

        if (typeof color !== 'undefined') {
            payload['color'] = color;
        }

        if (typeof tag !== 'undefined') {
            payload['tag'] = tag;
        }

        if (typeof badge !== 'undefined') {
            payload['badge'] = badge;
        }

        if (typeof status !== 'undefined') {
            payload['status'] = status;
        }

        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update a push notification.
     *
     * @param {string} messageId
     * @param {string[]} topics
     * @param {string[]} users
     * @param {string[]} targets
     * @param {string} title
     * @param {string} body
     * @param {object} data
     * @param {string} action
     * @param {string} icon
     * @param {string} sound
     * @param {string} color
     * @param {string} tag
     * @param {number} badge
     * @param {MessageStatus} status
     * @param {string} scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updatePush(messageId, topics, users, targets, title, body, data, action, icon, sound, color, tag, badge, status, scheduledAt) {
        const apiPath = '/messaging/messages/push/{messageId}'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }

        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }

        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }

        if (typeof title !== 'undefined') {
            payload['title'] = title;
        }

        if (typeof body !== 'undefined') {
            payload['body'] = body;
        }

        if (typeof data !== 'undefined') {
            payload['data'] = data;
        }

        if (typeof action !== 'undefined') {
            payload['action'] = action;
        }

        if (typeof icon !== 'undefined') {
            payload['icon'] = icon;
        }

        if (typeof sound !== 'undefined') {
            payload['sound'] = sound;
        }

        if (typeof color !== 'undefined') {
            payload['color'] = color;
        }

        if (typeof tag !== 'undefined') {
            payload['tag'] = tag;
        }

        if (typeof badge !== 'undefined') {
            payload['badge'] = badge;
        }

        if (typeof status !== 'undefined') {
            payload['status'] = status;
        }

        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create an SMS.
     *
     * @param {string} messageId
     * @param {string} content
     * @param {string[]} topics
     * @param {string[]} users
     * @param {string[]} targets
     * @param {MessageStatus} status
     * @param {string} scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createSMS(messageId, content, topics, users, targets, status, scheduledAt) {
        const apiPath = '/messaging/messages/sms';
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }

        if (typeof content === 'undefined') {
            throw new AppwriteException('Missing required parameter: "content"');
        }


        if (typeof messageId !== 'undefined') {
            payload['messageId'] = messageId;
        }

        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }

        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }

        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }

        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }

        if (typeof status !== 'undefined') {
            payload['status'] = status;
        }

        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update an SMS.
     *
     * @param {string} messageId
     * @param {string[]} topics
     * @param {string[]} users
     * @param {string[]} targets
     * @param {string} content
     * @param {MessageStatus} status
     * @param {string} scheduledAt
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateSMS(messageId, topics, users, targets, content, status, scheduledAt) {
        const apiPath = '/messaging/messages/sms/{messageId}'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        if (typeof topics !== 'undefined') {
            payload['topics'] = topics;
        }

        if (typeof users !== 'undefined') {
            payload['users'] = users;
        }

        if (typeof targets !== 'undefined') {
            payload['targets'] = targets;
        }

        if (typeof content !== 'undefined') {
            payload['content'] = content;
        }

        if (typeof status !== 'undefined') {
            payload['status'] = status;
        }

        if (typeof scheduledAt !== 'undefined') {
            payload['scheduledAt'] = scheduledAt;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Get a message
     *
     * @param {string} messageId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async getMessage(messageId) {
        const apiPath = '/messaging/messages/{messageId}'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Delete a message
     *
     * @param {string} messageId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async delete(messageId) {
        const apiPath = '/messaging/messages/{messageId}'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        return await this.client.call('delete', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List message logs
     *
     * @param {string} messageId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listMessageLogs(messageId, queries) {
        const apiPath = '/messaging/messages/{messageId}/logs'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List message targets
     *
     * List the targets associated with a message as set via the targets
     * attribute.
     *
     * @param {string} messageId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listTargets(messageId, queries) {
        const apiPath = '/messaging/messages/{messageId}/targets'.replace('{messageId}', messageId);
        let payload = {};
        if (typeof messageId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "messageId"');
        }


        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List providers
     *
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listProviders(queries, search) {
        const apiPath = '/messaging/providers';
        let payload = {};

        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create APNS provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} authKey
     * @param {string} authKeyId
     * @param {string} teamId
     * @param {string} bundleId
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createAPNSProvider(providerId, name, authKey, authKeyId, teamId, bundleId, enabled) {
        const apiPath = '/messaging/providers/apns';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }

        if (typeof authKeyId !== 'undefined') {
            payload['authKeyId'] = authKeyId;
        }

        if (typeof teamId !== 'undefined') {
            payload['teamId'] = teamId;
        }

        if (typeof bundleId !== 'undefined') {
            payload['bundleId'] = bundleId;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update APNS provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} authKey
     * @param {string} authKeyId
     * @param {string} teamId
     * @param {string} bundleId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateAPNSProvider(providerId, name, enabled, authKey, authKeyId, teamId, bundleId) {
        const apiPath = '/messaging/providers/apns/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }

        if (typeof authKeyId !== 'undefined') {
            payload['authKeyId'] = authKeyId;
        }

        if (typeof teamId !== 'undefined') {
            payload['teamId'] = teamId;
        }

        if (typeof bundleId !== 'undefined') {
            payload['bundleId'] = bundleId;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create FCM provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {object} serviceAccountJSON
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createFCMProvider(providerId, name, serviceAccountJSON, enabled) {
        const apiPath = '/messaging/providers/fcm';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof serviceAccountJSON !== 'undefined') {
            payload['serviceAccountJSON'] = serviceAccountJSON;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update FCM provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {object} serviceAccountJSON
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateFCMProvider(providerId, name, enabled, serviceAccountJSON) {
        const apiPath = '/messaging/providers/fcm/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof serviceAccountJSON !== 'undefined') {
            payload['serviceAccountJSON'] = serviceAccountJSON;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Mailgun provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} apiKey
     * @param {string} domain
     * @param {boolean} isEuRegion
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} replyToName
     * @param {string} replyToEmail
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createMailgunProvider(providerId, name, apiKey, domain, isEuRegion, fromName, fromEmail, replyToName, replyToEmail, enabled) {
        const apiPath = '/messaging/providers/mailgun';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }

        if (typeof isEuRegion !== 'undefined') {
            payload['isEuRegion'] = isEuRegion;
        }

        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }

        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }

        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }

        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Mailgun provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} apiKey
     * @param {string} domain
     * @param {boolean} isEuRegion
     * @param {boolean} enabled
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} replyToName
     * @param {string} replyToEmail
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateMailgunProvider(providerId, name, apiKey, domain, isEuRegion, enabled, fromName, fromEmail, replyToName, replyToEmail) {
        const apiPath = '/messaging/providers/mailgun/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof domain !== 'undefined') {
            payload['domain'] = domain;
        }

        if (typeof isEuRegion !== 'undefined') {
            payload['isEuRegion'] = isEuRegion;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }

        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }

        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }

        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Msg91 provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} from
     * @param {string} senderId
     * @param {string} authKey
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createMsg91Provider(providerId, name, from, senderId, authKey, enabled) {
        const apiPath = '/messaging/providers/msg91';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        if (typeof senderId !== 'undefined') {
            payload['senderId'] = senderId;
        }

        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Msg91 provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} senderId
     * @param {string} authKey
     * @param {string} from
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateMsg91Provider(providerId, name, enabled, senderId, authKey, from) {
        const apiPath = '/messaging/providers/msg91/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof senderId !== 'undefined') {
            payload['senderId'] = senderId;
        }

        if (typeof authKey !== 'undefined') {
            payload['authKey'] = authKey;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Sendgrid provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} apiKey
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} replyToName
     * @param {string} replyToEmail
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createSendgridProvider(providerId, name, apiKey, fromName, fromEmail, replyToName, replyToEmail, enabled) {
        const apiPath = '/messaging/providers/sendgrid';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }

        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }

        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }

        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Sendgrid provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} apiKey
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} replyToName
     * @param {string} replyToEmail
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateSendgridProvider(providerId, name, enabled, apiKey, fromName, fromEmail, replyToName, replyToEmail) {
        const apiPath = '/messaging/providers/sendgrid/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }

        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }

        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }

        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create SMTP provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} host
     * @param {number} port
     * @param {string} username
     * @param {string} password
     * @param {SMTPEncryption} encryption
     * @param {boolean} autoTLS
     * @param {string} mailer
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} replyToName
     * @param {string} replyToEmail
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createSMTPProvider(providerId, name, host, port, username, password, encryption, autoTLS, mailer, fromName, fromEmail, replyToName, replyToEmail, enabled) {
        const apiPath = '/messaging/providers/smtp';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }

        if (typeof host === 'undefined') {
            throw new AppwriteException('Missing required parameter: "host"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof host !== 'undefined') {
            payload['host'] = host;
        }

        if (typeof port !== 'undefined') {
            payload['port'] = port;
        }

        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }

        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }

        if (typeof encryption !== 'undefined') {
            payload['encryption'] = encryption;
        }

        if (typeof autoTLS !== 'undefined') {
            payload['autoTLS'] = autoTLS;
        }

        if (typeof mailer !== 'undefined') {
            payload['mailer'] = mailer;
        }

        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }

        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }

        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }

        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update SMTP provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} host
     * @param {number} port
     * @param {string} username
     * @param {string} password
     * @param {SMTPEncryption} encryption
     * @param {boolean} autoTLS
     * @param {string} mailer
     * @param {string} fromName
     * @param {string} fromEmail
     * @param {string} replyToName
     * @param {string} replyToEmail
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateSMTPProvider(providerId, name, host, port, username, password, encryption, autoTLS, mailer, fromName, fromEmail, replyToName, replyToEmail, enabled) {
        const apiPath = '/messaging/providers/smtp/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof host !== 'undefined') {
            payload['host'] = host;
        }

        if (typeof port !== 'undefined') {
            payload['port'] = port;
        }

        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }

        if (typeof password !== 'undefined') {
            payload['password'] = password;
        }

        if (typeof encryption !== 'undefined') {
            payload['encryption'] = encryption;
        }

        if (typeof autoTLS !== 'undefined') {
            payload['autoTLS'] = autoTLS;
        }

        if (typeof mailer !== 'undefined') {
            payload['mailer'] = mailer;
        }

        if (typeof fromName !== 'undefined') {
            payload['fromName'] = fromName;
        }

        if (typeof fromEmail !== 'undefined') {
            payload['fromEmail'] = fromEmail;
        }

        if (typeof replyToName !== 'undefined') {
            payload['replyToName'] = replyToName;
        }

        if (typeof replyToEmail !== 'undefined') {
            payload['replyToEmail'] = replyToEmail;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Telesign provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} from
     * @param {string} customerId
     * @param {string} apiKey
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createTelesignProvider(providerId, name, from, customerId, apiKey, enabled) {
        const apiPath = '/messaging/providers/telesign';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        if (typeof customerId !== 'undefined') {
            payload['customerId'] = customerId;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Telesign provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} customerId
     * @param {string} apiKey
     * @param {string} from
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateTelesignProvider(providerId, name, enabled, customerId, apiKey, from) {
        const apiPath = '/messaging/providers/telesign/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof customerId !== 'undefined') {
            payload['customerId'] = customerId;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Textmagic provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} from
     * @param {string} username
     * @param {string} apiKey
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createTextmagicProvider(providerId, name, from, username, apiKey, enabled) {
        const apiPath = '/messaging/providers/textmagic';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Textmagic provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} username
     * @param {string} apiKey
     * @param {string} from
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateTextmagicProvider(providerId, name, enabled, username, apiKey, from) {
        const apiPath = '/messaging/providers/textmagic/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof username !== 'undefined') {
            payload['username'] = username;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Twilio provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} from
     * @param {string} accountSid
     * @param {string} authToken
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createTwilioProvider(providerId, name, from, accountSid, authToken, enabled) {
        const apiPath = '/messaging/providers/twilio';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        if (typeof accountSid !== 'undefined') {
            payload['accountSid'] = accountSid;
        }

        if (typeof authToken !== 'undefined') {
            payload['authToken'] = authToken;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Twilio provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} accountSid
     * @param {string} authToken
     * @param {string} from
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateTwilioProvider(providerId, name, enabled, accountSid, authToken, from) {
        const apiPath = '/messaging/providers/twilio/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof accountSid !== 'undefined') {
            payload['accountSid'] = accountSid;
        }

        if (typeof authToken !== 'undefined') {
            payload['authToken'] = authToken;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create Vonage provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {string} from
     * @param {string} apiKey
     * @param {string} apiSecret
     * @param {boolean} enabled
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createVonageProvider(providerId, name, from, apiKey, apiSecret, enabled) {
        const apiPath = '/messaging/providers/vonage';
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof providerId !== 'undefined') {
            payload['providerId'] = providerId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof apiSecret !== 'undefined') {
            payload['apiSecret'] = apiSecret;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update Vonage provider
     *
     * @param {string} providerId
     * @param {string} name
     * @param {boolean} enabled
     * @param {string} apiKey
     * @param {string} apiSecret
     * @param {string} from
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateVonageProvider(providerId, name, enabled, apiKey, apiSecret, from) {
        const apiPath = '/messaging/providers/vonage/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof enabled !== 'undefined') {
            payload['enabled'] = enabled;
        }

        if (typeof apiKey !== 'undefined') {
            payload['apiKey'] = apiKey;
        }

        if (typeof apiSecret !== 'undefined') {
            payload['apiSecret'] = apiSecret;
        }

        if (typeof from !== 'undefined') {
            payload['from'] = from;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Get provider
     *
     * @param {string} providerId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async getProvider(providerId) {
        const apiPath = '/messaging/providers/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Delete provider
     *
     * @param {string} providerId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async deleteProvider(providerId) {
        const apiPath = '/messaging/providers/{providerId}'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        return await this.client.call('delete', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List provider logs
     *
     * @param {string} providerId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listProviderLogs(providerId, queries) {
        const apiPath = '/messaging/providers/{providerId}/logs'.replace('{providerId}', providerId);
        let payload = {};
        if (typeof providerId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "providerId"');
        }


        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List subscriber logs
     *
     * @param {string} subscriberId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listSubscriberLogs(subscriberId, queries) {
        const apiPath = '/messaging/subscribers/{subscriberId}/logs'.replace('{subscriberId}', subscriberId);
        let payload = {};
        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }


        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List topics.
     *
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listTopics(queries, search) {
        const apiPath = '/messaging/topics';
        let payload = {};

        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create a topic.
     *
     * @param {string} topicId
     * @param {string} name
     * @param {string[]} subscribe
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createTopic(topicId, name, subscribe) {
        const apiPath = '/messaging/topics';
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }

        if (typeof name === 'undefined') {
            throw new AppwriteException('Missing required parameter: "name"');
        }


        if (typeof topicId !== 'undefined') {
            payload['topicId'] = topicId;
        }

        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        if (typeof subscribe !== 'undefined') {
            payload['subscribe'] = subscribe;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Get a topic.
     *
     * @param {string} topicId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async getTopic(topicId) {
        const apiPath = '/messaging/topics/{topicId}'.replace('{topicId}', topicId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }


        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Update a topic.
     *
     * @param {string} topicId
     * @param {string} name
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async updateTopic(topicId, name) {
        const apiPath = '/messaging/topics/{topicId}'.replace('{topicId}', topicId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }


        if (typeof name !== 'undefined') {
            payload['name'] = name;
        }

        return await this.client.call('patch', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Delete a topic.
     *
     * @param {string} topicId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async deleteTopic(topicId) {
        const apiPath = '/messaging/topics/{topicId}'.replace('{topicId}', topicId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }


        return await this.client.call('delete', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List topic logs
     *
     * @param {string} topicId
     * @param {string[]} queries
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listTopicLogs(topicId, queries) {
        const apiPath = '/messaging/topics/{topicId}/logs'.replace('{topicId}', topicId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }


        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * List subscribers.
     *
     * @param {string} topicId
     * @param {string[]} queries
     * @param {string} search
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async listSubscribers(topicId, queries, search) {
        const apiPath = '/messaging/topics/{topicId}/subscribers'.replace('{topicId}', topicId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }


        if (typeof queries !== 'undefined') {
            payload['queries'] = queries;
        }

        if (typeof search !== 'undefined') {
            payload['search'] = search;
        }

        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Create a subscriber.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @param {string} targetId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async createSubscriber(topicId, subscriberId, targetId) {
        const apiPath = '/messaging/topics/{topicId}/subscribers'.replace('{topicId}', topicId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }

        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }

        if (typeof targetId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "targetId"');
        }


        if (typeof subscriberId !== 'undefined') {
            payload['subscriberId'] = subscriberId;
        }

        if (typeof targetId !== 'undefined') {
            payload['targetId'] = targetId;
        }

        return await this.client.call('post', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Get a subscriber.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async getSubscriber(topicId, subscriberId) {
        const apiPath = '/messaging/topics/{topicId}/subscribers/{subscriberId}'.replace('{topicId}', topicId).replace('{subscriberId}', subscriberId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }

        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }


        return await this.client.call('get', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }

    /**
     * Delete a subscriber.
     *
     * @param {string} topicId
     * @param {string} subscriberId
     * @throws {AppwriteException}
     * @returns {Promise}
     */
    async deleteSubscriber(topicId, subscriberId) {
        const apiPath = '/messaging/topics/{topicId}/subscribers/{subscriberId}'.replace('{topicId}', topicId).replace('{subscriberId}', subscriberId);
        let payload = {};
        if (typeof topicId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "topicId"');
        }

        if (typeof subscriberId === 'undefined') {
            throw new AppwriteException('Missing required parameter: "subscriberId"');
        }


        return await this.client.call('delete', apiPath, {
            'content-type': 'application/json',
        }, payload);
    }
}

module.exports = Messaging;