const db = require("./db");
const util = require('util');
const queryAsync = util.promisify(db.query.bind(db));

const getMoments = async (req, res) => {
    let { year,month,day,selectedEmotions } = req.query
     try {
       let query = `SELECT *,DATE_FORMAT(date, '%Y-%m-%d') AS formatted_date FROM moments`;
      let params=[]
       if (year) {
         query += " WHERE year(Date)= ?"
         params.push(year);
         
}
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


const postMoments = async (req, res) => {
  let { date, emotion, heading, description } = req.body
  try {
    
    await queryAsync("INSERT INTO moments (date,emotion,heading,description) VALUES (?,?,?,?)", [date, emotion, heading, description])
    
    res.json({message : "success"})

  } catch (error) {
    console.error("Error fetching moments:", error);
    res.status(500).send("Internal Server Error");
  }

}

const updateMoments = async  (req, res) => {
  let { moment_id, date, emotion, heading, description } = req.body
  
  try {
    await queryAsync("UPDATE  moments SET date = ?,emotion = ?,heading = ?,description = ? where moment_id = ?",
      [date, emotion, heading, description, moment_id])
    res.json({message:"update moments"})
  }
  catch(error) {
    console.error("Error fetching moments:", error);
    res.status(500).send("Internal Server Error");
  }
}


const deleteMoments = async (req,res) => {
  let { moment_id } = req.body
  console.log(req.body)
  try {
    await queryAsync("DELETE FROM moments where moment_id = ?", [moment_id])
    res.json({message : "Deleted successfully"})
  }
  catch(error) {
    console.error("Error fetching moments:", error);
    res.status(500).send("Internal Server Error");
  }
}

// to do list

const gettodolist = async (req, res) => {
try {
    const { list, date } = req.query; 

    let sql = "SELECT * FROM todo_list";

    
    if (list && !date) {
      sql += ` WHERE status = '${list}'`;
    } else if (date && !list) {
      sql += ` WHERE complete_by = '${date}'`;
    } else if (date && list) {
      sql += ` WHERE status = '${list}' AND complete_by = '${date}'`;
    }

    const result = await queryAsync(sql); 
    res.json(result); 
  } catch (error) {
    console.error("Error fetching list:", error);
    res.status(500).send("Internal Server Error");
  }
}

const updatetodolist = async (req, res)=>{

  let {todo,completed_on} = req.body
  try {
    await queryAsync("Update todo_list Set completed_on = ?, status = ? where todo = ?", [completed_on, "complete", todo])
    res.json({message: "Update todo"})
  }
    catch(error) {
    console.error("Error update list:", error);
    res.status(500).send("Internal Server Error");
  }

}

const deleteToDo = async (req, res) => {
  let { id } = req.body;
  try {
    await queryAsync("Delete from todo_list where id = ?", [id]);
    res.json({message: "Deleted todo  successfully"})
  }
  catch {
    
  }
}

module.exports ={getMoments,postMoments,updateMoments,deleteMoments,gettodolist,updatetodolist,deleteToDo}