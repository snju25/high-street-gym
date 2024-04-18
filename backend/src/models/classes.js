import {db} from "../database.js"

export const newClass = (id,time,activity_id,trainer_id,day,room_number) =>{
    return {
        id,
        time,
        activity_id,
        trainer_id,
        date,
        room_number
    }

}

export const createNewClass = async(newClass) =>{
    return db.query(
     `INSERT INTO classes (class_datetime, class_activity_id, class_trainer_user_id, day, class_room_number) VALUES (?, ?, ?, ?, ?)`,
        [
            newClass.time,
            newClass.activity_id,
            newClass.trainer_id,
            newClass.day,
            newClass.room_number
        ]
    ).then(([result])=> {
        return {...newClass, id: result.insertId}
    })

}

// get classes by day and 
export const getByDateAndActivity = async (date, activity_id) => {
    const [results] = await db.query(
        `SELECT classes.*, users.user_firstName, users.user_lastName 
         FROM classes 
         JOIN users ON classes.class_trainer_user_id = users.user_id
         WHERE classes.date = ? AND classes.class_activity_id = ?`, 
         [date, activity_id]
    );
    return results
};


// getByDateAndActivity("2024-04-15", 1).then(res=> console.log(res));



export const getClassesByDate = async (date) => {
    return db.query(
        `SELECT classes.*, activities.activity_name, activities.activity_description, activities.activity_duration,users.user_firstName, users.user_lastName, users.user_email 
        FROM classes 
        JOIN activities ON classes.class_activity_id = activities.activity_id 
        JOIN users ON classes.class_trainer_user_id = users.user_id 
        WHERE classes.date = ?`,
        [date]
    ).then(([result]) => {
        return result;
    });
};

// getClassesByDate("2024-04-15").then(result => console.log(result)).catch(err => console.log(err))

export const updateClasses = async (updateClass) =>{
    return db.query(
        "UPDATE classes SET "
        + "class_datetime = ?, "
        + "class_activity_id = ?, "
        + "class_trainer_user_id = ?, "
        + "day = ?, "
        + "class_room_number = ? "
        + "WHERE class_id = ?",
        [
            updateClass.dateime,
            updateClass.activity_id,
            updateClass.trainer_id,
            updateClass.day,
            updateClass.room_number,
            updateClass.id
        ]
    ).then(([result]) => {
        return { ...updateClass}
    });
}

export const deleteClass = async(classID) =>{
    return db.query(
        "DELETE FROM classes WHERE class_id = ?", classID
    )
}


export const displayAllUniqueClassesByDate = async (date) => {
    const [results] = await db.query(`
    SELECT DISTINCT c.class_id, c.date, a.activity_id, a.activity_name, a.activity_description
    FROM classes c
    JOIN activities a ON c.class_activity_id = a.activity_id
    WHERE c.date = ?
    `, [date]);
    return results;
}
// displayAllUniqueClassesByDate('2024-04-15').then(res=> console.log(res));

export const displayAllUniqueClassesForWeek = async (weekStartDate, weekEndDate) => {
    const [results] = await db.query(`
        SELECT DISTINCT c.date, a.activity_id, a.activity_name, a.activity_description
        FROM classes c
        JOIN activities a ON c.class_activity_id = a.activity_id
        WHERE c.date BETWEEN ? AND ?
        ORDER BY c.date
    `, [weekStartDate, weekEndDate]);

    return results.reduce((classesByDate, classInfo) => {
        const { date, ...classData } = classInfo;
        if (!classesByDate[date]) {
            classesByDate[date] = [];
        }
        classesByDate[date].push(classData);
        return classesByDate;
    }, {});
};

// Usage
// const weekStartDate = '2024-04-15'; // Example week start date (Monday)
// const weekEndDate = '2024-04-21';   // Example week end date (Sunday)

// displayAllUniqueClassesForWeek(weekStartDate, weekEndDate)
//     .then(result => console.log(result))
//     .catch(error => console.error('Error fetching classes for the week:', error));














