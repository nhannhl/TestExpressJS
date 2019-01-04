import bcrypt from 'bcrypt';
const ViewsController = {} ;

ViewsController.rendMain = (req, res, next) => {
    try {
        return res.render('../views/main.ejs', {
            data: {
                view: './bodyy.ejs',
                subdata: 'test data o day'
            }
        });
    } catch(err) {
        return next(err);
    }
}

ViewsController.rendLayout = (req, res, next) => {
    try {
        return res.render('../views/partialrend.ejs', {layout: '../views/main.ejs', locals: {data: 'test1data'}});
    } catch(err) {
        return next(err);
    }
}

ViewsController.testBCrypt = (req, res, next) => {
    const saltRounds = 10;
    const pass1 = 'itIspaSS';
    const pass2 = 'itIspasS';
    let resultHash;
    let randomSalts = randomSalt(8);
    bcrypt.hash(randomSalts+pass1, saltRounds, (err, hash) => {
        resultHash = hash;
        console.log(resultHash);
        bcrypt.compare(randomSalts+pass1, resultHash, function(err, res) {
            console.log(res);
        });
        bcrypt.compare(randomSalts+pass2, resultHash, function(err, res) {
            console.log(res);
        });
    });
    return res.status(200).json({message: "ok"});
}

const randomSalt = (numberLength) => {
    var randomStr = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < numberLength; i++) {
        randomStr += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return randomStr;
}

export default ViewsController;