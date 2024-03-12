import {db} from "../database.js"

export const newClass = (id,time,activity_id,trainer_id,day,room_number) =>{
    return {
        id,
        time,
        activity_id,
        trainer_id,
        day,
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



export const getClassesByDay = async (day) => {
    return db.query(
        `SELECT classes.*, activities.activity_name, activities.activity_description, activities.activity_duration,users.user_firstName, users.user_lastName, users.user_email 
        FROM classes 
        JOIN activities ON classes.class_activity_id = activities.activity_id 
        JOIN users ON classes.class_trainer_user_id = users.user_id 
        WHERE classes.day = ?`,
        [day]
    ).then(([result]) => {
        return result;
    });
};

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
