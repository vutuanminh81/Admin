var express = require('express');
var router = express.Router();
const db = require("../config");
const ReportModel = require("../Model/reports")

var router = express.Router();
const app = express();
app.use(express.json());
app.use(cors());
const ReportDB = db.collection("Report");