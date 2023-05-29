const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tasksSchema = schema({
  info: String,
  startHour: Object,
  endHour: Object,
  done: Boolean,
  user : {type: schema.ObjectId, ref:'users'}
});


//ajout d'une methode permettant d'avoir une heure format "00:00" apres chaque sauvegarde de tâche

tasksSchema.post('save', async function (doc, next) {

  if(doc.startHour.hours.toString().length == 1){
    doc.startHour.hours = `0${doc.startHour.hours.toString()}`;
  }
  if(doc.startHour.minutes.toString().length == 1){
    doc.startHour.minutes = `0${doc.startHour.minutes.toString()}`;
  }
  if(doc.endHour.hours.toString().length == 1){
    doc.endHour.hours = `0${doc.endHour.hours.toString()}`;
  }
  if(doc.endHour.minutes.toString().length == 1){
    doc.endHour.minutes = `0${doc.endHour.minutes.toString()}`;
  }
  await Task.findOneAndUpdate({ _id: doc._id }, { startHour: `${doc.startHour.hours}:${doc.startHour.minutes}` , endHour: `${doc.endHour.hours}:${doc.endHour.minutes}`}).exec();
  next()

});

const Task = mongoose.model('tasks', tasksSchema);



module.exports = Task;