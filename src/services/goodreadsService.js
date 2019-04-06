const axios = require('axios');
const xml2js = require('xml2js');
// key: cMzFpzls6uuUy6aUB5IwOQ
// secret: efAz4flbMZCKvGbEhWZWgQQdN90oL5AoabHUvkjnqc
const parser = xml2js.Parser({ explicitArray: false });
function goodreadsService() {
    function getBookById(id) {
        return new Promise((resolve, reject) => {
            // Making an api call and parsing the results.
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=cMzFpzls6uuUy6aUB5IwOQ`)
                .then((response) => {
                    parser.parseString(response.data, (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(result);
                            resolve(result.GoodreadsResponse.book);

                        }
                    })
                })
                .catch((error) => {
                    reject(error);
                    console.log(error);

                });
        });

    }
    return { getBookById };
}

module.exports = goodreadsService();