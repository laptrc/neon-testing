import axios from 'axios';

describe('GET /api/tasks', () => {
  it('should return an array', async () => {
    const res = await axios.get(`/api/tasks`);

    expect(res.status).toBe(200);
    expect(res.data.length).toBeGreaterThanOrEqual(0);
  });
});
