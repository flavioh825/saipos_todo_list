const {format} = require('date-fns');

const Task = require('../models/Task');
const Auth = require('../models/Auth');

class TasksController { 
  async index(req, res) { 
    try {
      let [ row ] = await Task.get();
      return res.status(200).json({data: row});
    } catch(err) {
      return res.status(404).json(err);
    }
  }

  async store(req, res) { 
    try {
      let [ ResultSetHeader ] = await Task.insert(req.body);
      let [ task ] = await Task.getById(ResultSetHeader.insertId);

      return res.status(201).json({data: task[0]});
    } catch(err) {
      return res.status(303).json(err);
    }
  }

  async show(req, res) { 
    try {
      let [ result ] = await Task.getById(req.params.id);
      return res.status(200).json({data: result[0]});
    } catch(err) {
      console.log(err);
      return res.status(404).json(err);
    }
  }

  async update(req, res) { 
    try {
      let isAuthorized = Auth.checkPasswordAuthorization(req.body.password);
      if(!isAuthorized)
        return res.status(401).json({data: {error: 'Senha incorreta.'}});

      let [ data ] = await Task.getById(req.params.id);

      await Task.update(req.body, data[0].id);

      let [task] = await Task.getById(data[0].id);

      return res.status(200).json({data: task[0]});
    } catch(err) {
      return res.status(303).json(err);
    }
  }

  async delete(req, res) { 
    try {
      let [ data ] = await Task.getById(req.params.id);

      await Task.destroy(req.params.id);

      return res.status(200).json({data: {success: true}});
    } catch(err) {
      return res.status(303).json(err);
    }
  }

  async completeTask(req, res) {
    try {
      let [ data ] = await Task.getById(req.params.id);

      console.log(data[0].done === null);

      if(data[0].done !== null)
        return res.status(303).json({error: 'Essa tarefa já foi concluída.'});
      
      let completed = data[0].completed + 1;
      let done = format(new Date(), 'yyyy-MM-dd H:mm:ss');
      await Task.markAsComplete(completed, done, data[0].id);
      
      let [task] = await Task.getById(data[0].id);

      return res.status(200).json({data: {success: true, task}});
    } catch(err) {
      return res.status(303).json({error: 'Algo deu errado'});
    }
  }

  async redoTask(req, res) {
    try {
      let isAuthorized = Auth.checkPasswordAuthorization(req.body.password);
      if(!isAuthorized)
        return res.status(401).json({data: {error: 'Senha incorreta.'}});

      let [ data ] = await Task.getById(req.body.id);

      if(data[0].done === null)
        return res.status(303).json({error: 'Essa tarefa ainda não foi concluída.'});

      if(data[0].completed === 2)
        return res.status(303).json({error: 'Não autorizado, o número de conclusões dessa tarefa foi excedido.'});

      await Task.markAsPending(data[0].id);
      
      let [task] = await Task.getById(data[0].id);

      return res.status(200).json({data: {success: true, task}});
    } catch(err) {
      return res.status(303).json({error: 'Algo deu errado'});
    }
  }

  checkManagerPassword(req, res) {
    return Auth.checkPasswordAuthorization(req.body.password) ?
      res.status(200).json({data: {authorized: true}}) :
      res.status(401).json({data: {authorized: false}});
  }

  async isValidEmail(req, res) {
    let email = req.params.email;
    let { mx_found, format_valid, did_you_mean } =  await Auth.validateEmail(email);
    if(!mx_found || !format_valid)
      return res.status(401).json({data: {email_invalid: {did_you_mean: did_you_mean}}})

    return res.status(200).json({data: {success: true}});
  }
}

module.exports = new TasksController();