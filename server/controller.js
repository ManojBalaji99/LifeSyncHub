const db = require("./db");
const util = require('util');
const queryAsync = util.promisify(db.query.bind(db));

const getMoments = async (req, res) => {
    let { year,month,day,selectedEmotions } = req.query
     try {
       let query = `SELECT * FROM moments WHERE year(Date) = ?`;
        let params = [year];

if (month) {
  query += ` AND month(Date) = ?`;
  params.push(month);
}
if (day) {
  query += ` AND day(Date) = ?`;
  params.push(day);
}
if (selectedEmotions) {
     
let emotionsString = selectedEmotions; 
let emotionsArray = emotionsString.split(','); 
let formattedString = emotionsArray.map(emotion => `'${emotion}'`).join(','); 

     query += ` AND emotion in (${formattedString})`
    
} 
let moments = await queryAsync(query, params);
res.json(moments);

  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).send("Internal Server Error");
  }
};


const postMoments = (req, res) => {
  let { date, emotion, heading, description } = req.body
  try {
    
    queryAsync("INSERT INTO moments (date,emotion,heading,description) VALUES (?,?,?,?)", [date, emotion, heading, description])
    
    res.json({message : "success"})

  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).send("Internal Server Error");
  }

}

module.exports ={getMoments,postMoments}