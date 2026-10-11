const Employee = require("../model/Employee");

const getAllEmployee = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "employees not found!" });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname)
    return res
      .status(400)
      .json({ message: "firstname and lastname are required!!!" });

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req.body?.id)
    return res.status(400).json({ message: "employee ID is required!" });

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID does not match ${req.body.id}!` });
  }

  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;

  const result = await employee.save();
  res.status(201).json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req.body?.id)
    return res.status(400).json({ message: "employee ID is required!" });
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID does not match ${req.body.id}!` });
  }

  const result = await employee.deleteOne({ _id: req.body.id });
  res.status(201).json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "employee ID is required!" });
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID does not match ${req.params.id}!` });
  }

  res.status(201).json(employee);
};

module.exports = {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
