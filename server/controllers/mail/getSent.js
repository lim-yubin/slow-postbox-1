const db = require('../../db');

module.exports = async (req, res) => {
  try {
    const { email, page } = req.query;

    const sql1 = `select A.id, A.writerEmail, A.receiverEmail, A.reserved_at, A.title, A.isChecked, A.isRead, A.created_at, A.updated_at, users.name 
    from mails AS A
    left join users 
    ON A.receiverEmail = users.email 
    Where writerEmail = "${email}" and reserved_at<=DATE(NOW())  
    GROUP BY A.id, users.name    
    ORDER BY A.reserved_at DESC
    LIMIT ?,5;`;
    const params = [(Number(page) - 1) * 5];

    const [rows1, fields1, err1] = await db.query(sql1, params);
    if (err1) {
      return res.status(401).send();
    }
    const sql2 = `select COUNT(id) AS count from mails where writerEmail = "${email}" and date(reserved_at) <= date_format(now(), '%Y%m%d');`
    const [rows2, fields2, err2] = await db.query(sql2);
    if (err2) {
      return res.status(401).send();
    }
    return res.status(200).json({
      data: rows1,
      count: rows2[0]['count']
    });
  } catch (err) {
    throw err;
  }
};

// const sql4 = `select users.name from users where email = ${el.receiverEmail};`
// const [rows2, fields2, err2] = db.query(sql4);
// if (err2) {
//   return res.status(401).send();
// }
// console.log(rows2)
// if (rows2) {
//   const removeMailUser = rows2[0]
// }
