const request = require('supertest');
const app = require('../src/app');
describe('Task API', () => {
    test('Should create a task', async () => {
        const res = (await request(app).post('/tasks')).setEncoding({
            title: 'test',
            status: 'pending',
            due_date: '2024-12-01'
        });
        expect(res.statusCode).tobe(201);
        expect(res.body).toHaveProperty('id');
    });
});