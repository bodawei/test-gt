'use strict';

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

const stub = (res) => res.status(200).json({ status: 'ok', data: {} });

// API Keys
app.post('/internal/api/v2/apiKeys', (req, res) => stub(res));
app.delete('/internal/api/v2/apiKeys/:apiKeyId', (req, res) => stub(res));

// Schema / Traffic Type Attributes
app.get('/internal/api/v2/schema/ws/:workspaceId/trafficTypes/:trafficTypeId', (req, res) => stub(res));
app.post('/internal/api/v2/schema/ws/:workspaceId/trafficTypes/:trafficTypeId', (req, res) => stub(res));
app.put('/internal/api/v2/schema/ws/:workspaceId/trafficTypes/:trafficTypeId', (req, res) => stub(res));
app.delete('/internal/api/v2/schema/ws/:workspaceId/trafficTypes/:trafficTypeId/:attributeId', (req, res) => stub(res));
app.patch('/internal/api/v2/schema/ws/:workspaceId/trafficTypes/:trafficTypeId/:attributeId', (req, res) => stub(res));

// Change Requests
app.get('/internal/api/v2/changeRequests/', (req, res) => stub(res));
app.get('/internal/api/v2/changeRequests/:changeRequestId', (req, res) => stub(res));
app.put('/internal/api/v2/changeRequests/:changeRequestId', (req, res) => stub(res));
app.post('/internal/api/v2/changeRequests/ws/:workspaceId/environments/:environmentId', (req, res) => stub(res));
app.post('/internal/api/v2/changeRequests/ws/:workspaceId/environments/:environmentId/file', (req, res) => stub(res));

// Environments
app.get('/internal/api/v2/environments/ws/:workspaceId', (req, res) => stub(res));
app.post('/internal/api/v2/environments/ws/:workspaceId', (req, res) => stub(res));
app.delete('/internal/api/v2/environments/ws/:workspaceId/:environmentNameOrId', (req, res) => stub(res));
app.patch('/internal/api/v2/environments/ws/:workspaceId/:environmentNameOrId', (req, res) => stub(res));

// Events
app.post('/api/events', (req, res) => stub(res));
app.post('/api/events/bulk', (req, res) => stub(res));

// Splits / Feature Flags
app.get('/internal/api/v2/splits/ws/:workspaceId', (req, res) => stub(res));
app.get('/internal/api/v2/splits/ws/:workspaceId/environments/:environmentId', (req, res) => stub(res));
app.post('/internal/api/v2/splits/ws/:workspaceId/trafficTypes/:trafficTypeIdOrName', (req, res) => stub(res));
app.get('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName', (req, res) => stub(res));
app.patch('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName', (req, res) => stub(res));
app.put('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/updateDescription', (req, res) => stub(res));
app.delete('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName', (req, res) => stub(res));
app.get('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId', (req, res) => stub(res));
app.post('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId', (req, res) => stub(res));
app.put('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId', (req, res) => stub(res));
app.patch('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId', (req, res) => stub(res));
app.delete('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId', (req, res) => stub(res));
app.put('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId/kill', (req, res) => stub(res));
app.put('/internal/api/v2/splits/ws/:workspaceId/:featureFlagName/environments/:environmentId/restore', (req, res) => stub(res));

// Groups
app.get('/internal/api/v2/groups', (req, res) => stub(res));
app.get('/internal/api/v2/groups/:groupId', (req, res) => stub(res));
app.post('/internal/api/v2/groups', (req, res) => stub(res));
app.put('/internal/api/v2/groups/:groupId', (req, res) => stub(res));
app.delete('/internal/api/v2/groups/:groupId', (req, res) => stub(res));

// Users
app.get('/internal/api/v2/users', (req, res) => stub(res));
app.post('/internal/api/v2/users', (req, res) => stub(res));
app.get('/internal/api/v2/users/:userId', (req, res) => stub(res));
app.put('/internal/api/v2/users', (req, res) => stub(res));
app.patch('/internal/api/v2/users/:userId', (req, res) => stub(res));
app.delete('/internal/api/v2/users/:userId', (req, res) => stub(res));

// Traffic Type Identities
app.get('/internal/api/v2/trafficTypes/:trafficTypeId/environments/:environmentId/identities', (req, res) => stub(res));
app.put('/internal/api/v2/trafficTypes/:trafficTypeId/environments/:environmentId/identities/:key', (req, res) => stub(res));
app.patch('/internal/api/v2/trafficTypes/:trafficTypeId/environments/:environmentId/identities', (req, res) => stub(res));
app.delete('/internal/api/v2/trafficTypes/:trafficTypeId/environments/:environmentId/identities/:key', (req, res) => stub(res));

// Restrictions
app.get('/internal/api/v2/restrictions', (req, res) => stub(res));
app.put('/internal/api/v2/restrictions', (req, res) => stub(res));

// Rollout Statuses
app.get('/internal/api/v2/rolloutStatuses', (req, res) => stub(res));

// Segments
app.get('/internal/api/v2/segments/ws/:workspaceId', (req, res) => stub(res));
app.get('/internal/api/v2/segments/ws/:workspaceId/environments/:environmentId', (req, res) => stub(res));
app.post('/internal/api/v2/segments/ws/:workspaceId/trafficTypes/:trafficTypeIdOrName', (req, res) => stub(res));
app.delete('/internal/api/v2/segments/ws/:workspaceId/:segmentName', (req, res) => stub(res));
app.post('/internal/api/v2/segments/:environmentId/:segmentName', (req, res) => stub(res));
app.delete('/internal/api/v2/segments/:environmentId/:segmentName', (req, res) => stub(res));
app.get('/internal/api/v2/segments/:environmentId/:segmentName/keys', (req, res) => stub(res));
app.put('/internal/api/v2/segments/:environmentId/:segmentName/upload', (req, res) => stub(res));
app.put('/internal/api/v2/segments/:environmentId/:segmentName/deleteKeys', (req, res) => stub(res));
app.put('/internal/api/v2/segments/:environmentId/:segmentName/removeKeys', (req, res) => stub(res));

// Tags
app.post('/internal/api/v2/tags/ws/:workspaceId/object/:objectName/objecttype/:objectType', (req, res) => stub(res));

// Traffic Types
app.get('/internal/api/v2/trafficTypes/ws/:workspaceId', (req, res) => stub(res));
app.post('/internal/api/v2/trafficTypes/ws/:workspaceId', (req, res) => stub(res));
app.delete('/internal/api/v2/trafficTypes/:trafficTypeId', (req, res) => stub(res));

// Workspaces
app.get('/internal/api/v2/workspaces', (req, res) => stub(res));
app.post('/internal/api/v2/workspaces', (req, res) => stub(res));
app.delete('/internal/api/v2/workspaces/:workspaceId', (req, res) => stub(res));
app.patch('/internal/api/v2/workspaces/:workspaceId', (req, res) => stub(res));

// Flag Sets (v3)
app.get('/internal/api/v3/flag-sets', (req, res) => stub(res));
app.post('/internal/api/v3/flag-sets', (req, res) => stub(res));
app.get('/internal/api/v3/flag-sets/:flagSetId', (req, res) => stub(res));

const server = app.listen(PORT, () => {
  console.log(`Split.io Admin API stub server running on port ${PORT}`);
});

module.exports = server;
