const express = require("express");
const router = express.Router();
const employeeService = require("../services/EmpoyeeService");

router.get("/", async (req, res) => {
  try {
    const { page, number } = req.query;
    const employees = await employeeService.getAllEmloyees(page, number);
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: "Get All employees error", error });
  }
});

router.put("/create", async function (req, res) {
  try {
    if (!("name" in req.body))
      return res.status(404).json({ message: "Body data are empty" });
    const newEmployee = await employeeService.createNewEmpoloyee(req.body);
    res.json(newEmployee);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Create new profile error" });
  }
});

router.patch("/update", async function (req, res) {
  try {
    const { id } = req.query;
    if (!id) res.status(404).json({ message: "ID exist" })
    const updatedEmployee = await employeeService.updateEmployee(id, req.body);
    
    res.json(updatedEmployee);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Update profile error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id, page, number } = req.query;
    await employeeService.deleteEmployee(id);
    const employees = await employeeService.getAllEmloyees(page, number);
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: "Delete profile error" });
  }
});

module.exports = router;
