// const data = {};
// data.employee = require("../model/employee.json");

const data = {
  employees: require("../model/employees.json"),
  setEmployee: function (data) {
    this.employees = data;
  },
};

const getAllEmployee = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res
      .status(400)
      .json({ message: "firstname and lastname are required!!!" });
  }

  data.setEmployee([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id),
  );

  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee with id ${req.body.id} was not found!!!` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filterdArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id),
  );
  const unsortedArray = [...filterdArray, employee];
  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)),
  );
  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id),
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `employee with id ${req.body.id} cannot be found` });
  }

  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id),
  );
  data.setEmployee([...filteredArray]);
  res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id === parseInt(req.params.id));
  if(!employee) {
    return res.status(400).json(
      {
        "message": `employee with id of ${req.params.id} cannot be found`
      }
    )
  };

  res.status(201).json(employee)
};

module.exports = {
  getAllEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
