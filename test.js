const request = require('supertest');
const app = require('./server');

describe('Superhero API', () => {
    it('should add a superhero', async () => {
        const res = await request(app)
            .post('/superheroes')
            .send({ name: 'Spider-Man', superpower: 'Web-slinging', humilityScore: 9 });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Superhero added successfully!');
    });

    it('should retrieve superheroes sorted by humilityScore', async () => {
        const res = await request(app).get('/superheroes');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
