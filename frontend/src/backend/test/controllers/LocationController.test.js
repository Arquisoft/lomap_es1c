const solid = require("../../solid/Solid.js");
const Location = require("../../models/locationModels/Location.js");
const Photo = require("../../models/locationModels/Photo.js");
const Review = require("../../models/locationModels/Review.js");
const locationController = require("../../controllers/LocationController.js");
jest.mock("../../solid/Solid.js");

jest.disableAutomock();
