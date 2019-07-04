var express = require('express');
var router = express.Router();
const request = require('request');

const urlBase = 'https://demo.vnda.com.br/api/v2';
const urlToken = process.env.VNDA_API_TOKEN;

/* GET users listing. */
router.get('/', function(req: any, res: { json: (arg0: any) => void; send: (arg0: any) => void; }, next: any) {
  request({
    url: `${urlBase}/users`,
    headers: {'Authorization': `Token token=${urlToken}`}
  }, function (error: any, response: { statusCode: number; }, body: string) {
    if (!error && response.statusCode == 200) res.json(JSON.parse(body));
    else res.send(body);
  });
});

/* POST user, register */
router.post('/', function (req: { body: any; }, res: { json: { (arg0: any): void; (arg0: any): void; }; }, next: any) {
  request.post({
    url: `${urlBase}/users`,
    headers: {'Authorization': `Token token=${urlToken}`, 'Content-Type': 'application/json'},
    body: JSON.stringify(req.body),
  }, function (error: any, response: { statusCode: number; }, body: string) {
    if (!error && response.statusCode == 200) res.json(JSON.parse(body));
    else res.json(JSON.parse(body));
  });
})

/* PATCH user, update user */
router.patch('/:id', function (req: { params: { id: any; }; body: any; }, res: { json: { (arg0: any): void; (arg0: any): void; }; }, next: any) {
  request.patch({
    url: `${urlBase}/users/${req.params.id}`,
    headers: {'Authorization': `Token token=${urlToken}`, 'Content-Type': 'application/json'},
    body: JSON.stringify(req.body),
  }, function (error: any, response: { statusCode: number; }, body: string) {
    // cause its returns blank with success
    if (!error && response.statusCode == 204)
      res.json(JSON.parse(JSON.stringify({success: true})));
    else res.json(JSON.parse(body));
  });
})

/* DELETE user by id */
router.delete('/:id', function (req: { params: { id: any; }; }, res: { json: { (arg0: any): void; (arg0: any): void; }; }, next: any) {
  request.del({
      url: `${urlBase}/users/${req.params.id}`,
      headers: {'Authorization': `Token token=${urlToken}`},
  }, function (error: any, response: { statusCode: number; }, body: string) {
    // cause its returns blank with success
    if (!error && response.statusCode == 204)
      res.json(JSON.parse(JSON.stringify({success: true})));
    else res.json(JSON.parse(body));
  });
})

module.exports = router;
