const { validationResult } = require("express-validator")
const loginLoad = (req, res) => {
    res.status(200).render("login")
}

const loginPost = (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        // const data = matchedData(req);
        return res.status(200).json({ body: req.body })
        // return res.send(`Hello, ${data.person}!`);
    }

    res.send({ errors: result.array() });
}

module.exports = {
    loginLoad,
    loginPost
}
