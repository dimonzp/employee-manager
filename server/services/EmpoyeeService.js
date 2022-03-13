const Employee = require("../models/Employee");

const employeeService = {
  async getAllEmloyees(page = 1, number = 5) {
    try {
      const allEmployees = (await Employee.find({})).reverse();
      const allEmployeesCount = allEmployees.length;
      const employees = [];
      const pageCount = Math.ceil(allEmployeesCount / number);
      for (let i = 0; i < pageCount; i++) {
        employees[i] = allEmployees.slice(i * number, i * number + number);
      }
      const currentEmployees = employees[page - 1] || [];
      return { currentEmployees, allEmployeesCount };
    } catch (error) {
      throw Error("get all employees from mongodb error");
    }
  },
  async createNewEmpoloyee(newEmployee) {
    return await Employee.create(newEmployee);
  },

  async updateEmployee(id, employee) {
    return await Employee.findByIdAndUpdate(
        id,
      {
        $set: employee,
      },
      {
        new: true
      }
    );
  },
    async deleteEmployee(id) {
      await Employee.findByIdAndDelete(id);
    },
};
module.exports = employeeService;
