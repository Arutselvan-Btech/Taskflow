import API from "./api";


// GET TASKS

export const getTasks = () => {

 return API.get("/tasks");

};


// ADD TASK

export const createTask = (data) => {

 return API.post("/tasks", data);

};


// UPDATE TASK

export const updateTask = (id,data)=>{

 return API.put(`/tasks/${id}`,data);

};


// DELETE TASK

export const deleteTask=(id)=>{

 return API.delete(`/tasks/${id}`);

};