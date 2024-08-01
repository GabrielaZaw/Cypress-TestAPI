// Test 1 - sprawdzenie kodu odpowiedzi, metoda domyślna GET
describe("tests of httpbin", () => {
    it("response code should be 200", () => {
        cy.request("https://httpbin.org/image/svg").then((response) => {
            const status = response.status;
            assert.equal(200, status);
        });
    });
});

// Test 2 - test z nagłówkiem żądania
describe("tests of httpbin", () => {
    const request = {
        method: "GET",
        url: "https://httpbin.org/response-headers",
        headers: {
            customHeader: "customValue",
        },
        failOnStatusCode: false,
    };

    it("test correct header setting", () => {
        cy.request(request).then((response) => {
            assert.equal(200, response.status);
            assert.equal("customValue", response.requestHeaders.customHeader);
        });
    });
});

// Test 3 - test z użyciem user-agent
describe("tests of httpbin", () => {
    it("should send a custom User-Agent header", () => {
        // Ustawienie niestandardowego nagłówka User-Agent
        cy.request({
            method: "GET",
            url: "https://httpbin.org/user-agent",
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0",
            },
        }).then((response) => {
            // Sprawdza odpowiedź
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property(
                "user-agent",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
            );
        });
    });
});

// Test 4 - wysyłanie parametrów zapytania
describe("tests of httpbin", () => {
    it("sends params", () => {
        // Ustawienie niestandardowego nagłówka User-Agent
        cy.request({
            method: "POST",
            url: "https://httpbin.org/post",
            qs: {
                userName: "gabrielaz",
            },
            failOnStatusCode: false,
        });

        it.only("response code should be 200", () => {
            cy.request(request).then((response) => {
                const status = response.status;
                assert.equal(200, status);
                assert.equal("gabrielaz", response.body.arg.username);
            });
        });
    });
});

// Test 5 - Test z randomizowanymi parametrami + dlugość trwania <= 1000
describe("tests of httpbin", () => {
    it("tests random params", () => {
        // Ustawienie niestandardowego nagłówka User-Agent
        for (let i = 0; i < 7; i++) {
            const randomParam = getRandomInt(1000);

            const request = {
                url: "https://httpbin.org/headers",
                param: randomParam,
            };
            cy.request(request).then((response) => {
                assert.isTrue(response.status == 200);
                assert.isTrue(response.duration <= 1000);
            });
        }
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Test 6 - Ustawienie Cookie + sprawdzanie czasu trwania żądania
describe("tests of httpbin", () => {
    const request = {
        metgod: "GET",
        url: "https://httpbin.org/cookies/set",
        headers: {
            Cookie: "cookieName=cookieValue",
        },
        failOnStatus: false,
    };

    it("test send cookie", () => {
        cy.request(request).then((response) => {
            assert.equal(200, response.status);
            assert.equal(
                "cookieName=cookieValue",
                response.requestHeaders["Cookie"]
            );
        });
    });
});

// Test 7 - sprawdzenie kodu odpowiedzi, kasowanie Cookie
describe("tests of httpbin", () => {
    it("test response body", () => {
        cy.request("https://httpbin.org/cookies/delete?freeform=").then(
            (response) => {
                const status = response.status;
                assert.equal(200, status);
            }
        );
    });
});

// Test 8 - test dla metody POST
describe("tests of httpbin", () => {
    const request = {
        method: "POST",
        url: "https://httpbin.org/post",
        failOnStatusCode: false,
    };

    it("response code should be 200", () => {
        cy.request(request).then((response) => {
            const status = response.status;
            assert.equal(200, status);
        });
    });
});

// Test 9 - testuje property URL
describe("tests of httpbin", () => {
    it("response propoerty", () => {
        cy.request("GET", "https://httpbin.org/get").then((response) => {
            expect(response.body).to.have.property("url");
        });
    });
});

// Test 10 - test status odpowiedzi dla IP
describe("tests of httpbin", () => {
    it("response code should be 200", () => {
        cy.request("https://httpbin.org/ip").then((response) => {
            const status = response.status;
            assert.equal(200, status);
        });
    });
});
