const request = require('supertest');
const { app } = require('../../index');

describe('API Health Check', () => {
  it('should return OK status', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
  });

  it('should indicate database connection status', async () => {
    const response = await request(app).get('/api/health');
    
    expect(response.body).toHaveProperty('database');
    // The database could be connected or disconnected
    expect(['connected', 'disconnected']).toContain(response.body.database);
  });
});
