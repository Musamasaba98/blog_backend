const app = require('../../app.js').default
const supertest = require('supertest')



test("Test Get Users", async () => {
    await supertest(app)
        .get("/api/v1/user")
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(expect.objectContaining({
                results: expect.any(Number),
                status: expect.any(String),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        age: expect.any(Number),
                        email: expect.any(String),
                        id: expect.any(String),
                        name: expect.any(String),
                        password: expect.any(String),
                        role: expect.any(String),
                        userPreferenceId: expect.any(String)
                    })
                ])
            }
            ))
        })

})