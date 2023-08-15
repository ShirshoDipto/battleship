/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOMinteraction/gameboardDOM.js":
/*!********************************************!*\
  !*** ./src/DOMinteraction/gameboardDOM.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGameboard: () => (/* binding */ renderGameboard),\n/* harmony export */   renderShipsContainer: () => (/* binding */ renderShipsContainer),\n/* harmony export */   resetGameboard: () => (/* binding */ resetGameboard)\n/* harmony export */ });\n/* harmony import */ var _models_Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Ship */ \"./src/models/Ship.js\");\n\r\n\r\n// const ship1 = new Ship(\"carrier\", 4, \"y\", [12, 22, 32, 42]);\r\n// const ship2 = new Ship(\"battleship\", 3, \"x\", [24, 25, 26]);\r\n// gameboard[12].ship = {\r\n//   isStartCoord: true,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[22].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[32].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[42].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship1,\r\n// };\r\n// gameboard[24].ship = {\r\n//   isStartCoord: true,\r\n//   shipObj: ship2,\r\n// };\r\n// gameboard[25].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship2,\r\n// };\r\n// gameboard[26].ship = {\r\n//   isStartCoord: false,\r\n//   shipObj: ship2,\r\n// };\r\n\r\nconst renderCross = () => `\r\n                          <div class=\"cross-container\">\r\n                            <div class=\"horizontal\"></div>\r\n                            <div class=\"vertical\"></div>\r\n                          </div>\r\n                          `;\r\n\r\nconst renderShip = (ship) => {\r\n  const shipCells = [];\r\n  const shipAxis = ship.axis === \"x\" ? \"draggable-x\" : \"draggable-y\";\r\n  const dragged = ship.coords.length !== 0 ? \"dragged\" : \"\";\r\n  let shipStyle;\r\n  if (ship.axis === \"x\") {\r\n    shipStyle = `style=\"grid-template-columns: repeat(${ship.shipLength}, var(--cell-width));\"`;\r\n  } else {\r\n    shipStyle = `style=\"grid-template-rows: repeat(${ship.shipLength}, var(--cell-width));\"`;\r\n  }\r\n\r\n  for (let i = 0; i < ship.shipLength; i += 1) {\r\n    const cell = `<div class=\"ship-cell\"></div>`;\r\n    shipCells.push(cell);\r\n  }\r\n\r\n  const shipContainer = `\r\n                          <div class=\"draggable ${dragged} ${shipAxis}\" \r\n                          ${shipStyle} name=\"${ship.name}\" draggable=\"true\">\r\n                            ${shipCells.join(\"\")}\r\n                          </div>\r\n                        `;\r\n\r\n  return shipContainer;\r\n};\r\n\r\n// const renderCells = (container) => {\r\n\r\n// };\r\n\r\nconst renderGameboard = (container, grid) => {\r\n  container.innerHTML = \"\";\r\n\r\n  for (let row = 0; row < grid.length; row += 1) {\r\n    for (let col = 0; col < grid[0].length; col += 1) {\r\n      let shipElem = \"\";\r\n      if (grid[row][col].ship?.isStartCoord) {\r\n        shipElem = renderShip(grid[row][col].ship.shipObj);\r\n      }\r\n\r\n      const cell = `<div class=\"cell\" row=\"${row}\" col=\"${col}\">${shipElem}</div>`;\r\n      container.innerHTML += cell;\r\n    }\r\n  }\r\n};\r\n\r\nconst renderShipsContainer = (container, allShips) => {\r\n  const allShipsHTML = allShips.map((ship) => {\r\n    return renderShip(ship);\r\n  });\r\n\r\n  container.innerHTML = \"\";\r\n  container.innerHTML += `\r\n                        <div class=\"ship-row\">\r\n                          <div class=\"len4-container ship-container\" name=\"carrier\">\r\n                            ${allShipsHTML[0]}\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"ship-row\">\r\n                          <div class=\"len3-container ship-container\" name=\"battleship1\">\r\n                            ${allShipsHTML[1]}\r\n                          </div>\r\n                          <div class=\"len3-container ship-container\" name=\"battleship2\">\r\n                            ${allShipsHTML[2]}\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"ship-row\">\r\n                          <div class=\"len2-container ship-container\" name=\"submarine1\">\r\n                            ${allShipsHTML[3]}\r\n                          </div>\r\n                          <div class=\"len2-container ship-container\" name=\"submarine2\">\r\n                            ${allShipsHTML[4]}\r\n                          </div>\r\n                          <div class=\"len2-container ship-container\" name=\"submarine3\">\r\n                            ${allShipsHTML[5]}\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"ship-row\">\r\n                          <div class=\"len1-container ship-container\" name=\"destroyer1\">\r\n                            ${allShipsHTML[6]}\r\n                          </div>\r\n                          <div class=\"len1-container ship-container\" name=\"destroyer2\">\r\n                            ${allShipsHTML[7]}\r\n                          </div>\r\n                          <div class=\"len1-container ship-container\" name=\"destroyer3\">\r\n                            ${allShipsHTML[8]}\r\n                          </div>\r\n                          <div class=\"len1-container ship-container\" name=\"destroyer4\">\r\n                            ${allShipsHTML[9]}\r\n                          </div>\r\n                        </div>\r\n  `;\r\n};\r\n\r\nconst resetGameboard = (container, gameboard) => {\r\n  gameboard.initiateGameboard();\r\n  renderGameboard(container, gameboard.grid);\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://battleship/./src/DOMinteraction/gameboardDOM.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOMinteraction_gameboardDOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMinteraction/gameboardDOM */ \"./src/DOMinteraction/gameboardDOM.js\");\n/* harmony import */ var _models_Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/Gameboard */ \"./src/models/Gameboard.js\");\n/* harmony import */ var _models_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/Ship */ \"./src/models/Ship.js\");\n\r\n\r\n\r\n\r\n\r\nconst gameboardGrid = document.querySelector(\".main-grid\");\r\nconst newGameboard = new _models_Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nnewGameboard.initiateGameboard();\r\n\r\nlet allShips = [];\r\n\r\n// has to be like this because at the beginning, the ships are not stored in the gameboard\r\nconst ship1 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"carrier\", 4, \"x\");\r\nconst ship2 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"battleship1\", 3, \"x\");\r\nconst ship3 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"battleship2\", 3, \"x\");\r\nconst ship4 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"submarine1\", 2, \"x\");\r\nconst ship5 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"submarine2\", 2, \"x\");\r\nconst ship6 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"submarine3\", 2, \"x\");\r\nconst ship7 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"destroyer1\", 1, \"x\");\r\nconst ship8 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"destroyer2\", 1, \"x\");\r\nconst ship9 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"destroyer3\", 1, \"x\");\r\nconst ship10 = new _models_Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"destroyer4\", 1, \"x\");\r\n\r\nlet shipsContainer = document.querySelector(\".ships-container\");\r\nlet draggables;\r\nlet cells;\r\n\r\nallShips.push(\r\n  ship1,\r\n  ship2,\r\n  ship3,\r\n  ship4,\r\n  ship5,\r\n  ship6,\r\n  ship7,\r\n  ship8,\r\n  ship9,\r\n  ship10\r\n);\r\n\r\nfunction resetShips() {\r\n  const newShips = allShips.map((ship) => {\r\n    ship.axis = \"x\";\r\n    ship.coords = [];\r\n    return ship;\r\n  });\r\n\r\n  allShips = newShips;\r\n}\r\n\r\nconst setEventListeners = () => {\r\n  shipsContainer = document.querySelector(\".ships-container\");\r\n  draggables = document.querySelectorAll(\".draggable\");\r\n  cells = document.querySelectorAll(\".cell\");\r\n\r\n  draggables.forEach((d) => {\r\n    d.addEventListener(\"dragstart\", getMeasurements);\r\n    d.addEventListener(\"drag\", displayDraggablePositions);\r\n    d.addEventListener(\"dragend\", placeShipOnBoard);\r\n    d.addEventListener(\"click\", rotateShip);\r\n  });\r\n\r\n  cells.forEach((cell) => {\r\n    cell.addEventListener(\"dragover\", (e) => e.preventDefault());\r\n  });\r\n};\r\n\r\nconst getShip = (elem) => {\r\n  return allShips.find((ship) => ship.name === elem.getAttribute(\"name\"));\r\n};\r\n\r\nconst getElemAtPosition = (e, coord) => {\r\n  const clientXDistance = e.clientX - coord[0];\r\n  const clientYDistance = e.clientY - coord[1];\r\n  return document.elementFromPoint(clientXDistance, clientYDistance);\r\n};\r\n\r\nconst getCoords = (cellsArray) => {\r\n  const coords = [];\r\n  cellsArray.forEach((cell) => {\r\n    if (cell.classList.contains(\"cell\")) {\r\n      const row = cell.getAttribute(\"row\");\r\n      const col = cell.getAttribute(\"col\");\r\n      coords.push([parseInt(row), parseInt(col)]);\r\n    }\r\n  });\r\n\r\n  return coords;\r\n};\r\n\r\nconst getOriginalShipStatus = (elem, ship) => {\r\n  elem.classList.remove(\"dragging\", \"hide\");\r\n  ship.distanceFromMidToMouse = [];\r\n  ship.isDraggable = false;\r\n};\r\n\r\nconst getMeasurements = (e) => {\r\n  e.target.classList.add(\"dragging\");\r\n  const shipCells = e.target.querySelectorAll(\".ship-cell\");\r\n  const theShip = getShip(e.target);\r\n  shipCells.forEach((cell) => {\r\n    const box = cell.getBoundingClientRect();\r\n    const midCoord = [box.width / 2 + box.x, box.height / 2 + box.y];\r\n\r\n    theShip.distanceFromMidToMouse.push([\r\n      e.clientX - midCoord[0],\r\n      e.clientY - midCoord[1],\r\n    ]);\r\n  });\r\n};\r\n\r\nconst displayDraggablePositions = (e) => {\r\n  let hoveredCells = [];\r\n  const theShip = getShip(e.target);\r\n  e.target.classList.add(\"hide\");\r\n\r\n  theShip.distanceFromMidToMouse.forEach((d) => {\r\n    const elemAtPosition = getElemAtPosition(e, d);\r\n    if (elemAtPosition && elemAtPosition.classList.contains(\"cell\")) {\r\n      hoveredCells.push(elemAtPosition);\r\n    }\r\n  });\r\n\r\n  const coords = getCoords(hoveredCells);\r\n\r\n  if (\r\n    coords.length === theShip.shipLength &&\r\n    newGameboard.isValidLocation(theShip.name, theShip.axis, coords)\r\n  ) {\r\n    cells.forEach((cell) => {\r\n      if (!hoveredCells.includes(cell)) {\r\n        cell.classList.remove(\"hovered\");\r\n      } else {\r\n        cell.classList.add(\"hovered\");\r\n      }\r\n    });\r\n    theShip.isDraggable = true;\r\n  } else {\r\n    cells.forEach((cell) => {\r\n      cell.classList.remove(\"hovered\");\r\n    });\r\n    theShip.isDraggable = false;\r\n  }\r\n};\r\n\r\nconst placeShipOnBoard = (e) => {\r\n  const theShip = getShip(e.target);\r\n  if (!theShip.isDraggable) {\r\n    getOriginalShipStatus(e.target, theShip);\r\n    return;\r\n  }\r\n\r\n  const hoveredCells = Array.from(cells).filter((cell) =>\r\n    cell.classList.contains(\"hovered\")\r\n  );\r\n\r\n  const coords = getCoords(hoveredCells);\r\n  theShip.coords.length === 0\r\n    ? newGameboard.placeShip(theShip, theShip.axis, coords)\r\n    : newGameboard.repositionShip(theShip, theShip.axis, coords);\r\n  // renderGameboard(gameboardGrid, newGameboard.grid);\r\n  // setEventListeners();\r\n\r\n  const elemAtPosition = getElemAtPosition(\r\n    e,\r\n    theShip.distanceFromMidToMouse[0]\r\n  );\r\n\r\n  if (elemAtPosition.classList.contains(\"cell\")) {\r\n    elemAtPosition.appendChild(e.target);\r\n    e.target.classList.add(\"dragged\");\r\n  }\r\n\r\n  cells.forEach((cell) => {\r\n    cell.classList.remove(\"hovered\");\r\n  });\r\n\r\n  getOriginalShipStatus(e.target, theShip);\r\n};\r\n\r\nfunction rotateShip() {\r\n  const shipName = this.getAttribute(\"name\");\r\n  const shipToRotate = allShips.find((ship) => ship.name === shipName);\r\n  if (shipToRotate.coords.length === 0) return;\r\n\r\n  const newCoords = shipToRotate.getCoordsForRotation();\r\n  const newAxis = shipToRotate.axis === \"x\" ? \"y\" : \"x\";\r\n\r\n  if (newGameboard.isValidLocation(shipName, newAxis, newCoords)) {\r\n    newGameboard.repositionShip(shipToRotate, newAxis, newCoords);\r\n    (0,_DOMinteraction_gameboardDOM__WEBPACK_IMPORTED_MODULE_0__.renderGameboard)(gameboardGrid, newGameboard.grid);\r\n    setEventListeners();\r\n  }\r\n}\r\n\r\nconst buttons = document.querySelectorAll(\".bottom-section-button\");\r\nbuttons.forEach((button) => {\r\n  button.addEventListener(\"click\", (e) => {\r\n    resetShips();\r\n    (0,_DOMinteraction_gameboardDOM__WEBPACK_IMPORTED_MODULE_0__.resetGameboard)(gameboardGrid, newGameboard);\r\n    (0,_DOMinteraction_gameboardDOM__WEBPACK_IMPORTED_MODULE_0__.renderShipsContainer)(shipsContainer, allShips);\r\n    setEventListeners();\r\n  });\r\n});\r\n\r\n(0,_DOMinteraction_gameboardDOM__WEBPACK_IMPORTED_MODULE_0__.renderGameboard)(gameboardGrid, newGameboard.grid);\r\n(0,_DOMinteraction_gameboardDOM__WEBPACK_IMPORTED_MODULE_0__.renderShipsContainer)(shipsContainer, allShips);\r\nsetEventListeners();\r\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/models/Gameboard.js":
/*!*********************************!*\
  !*** ./src/models/Gameboard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/models/Ship.js\");\n\r\n\r\nclass Gameboard {\r\n  SIZE = 10;\r\n\r\n  grid = [];\r\n\r\n  allShips = {};\r\n\r\n  initiateGameboard() {\r\n    this.grid = [];\r\n    for (let i = 0; i < this.SIZE; i += 1) {\r\n      const row = [];\r\n      for (let j = 0; j < this.SIZE; j += 1) {\r\n        row.push({\r\n          markStatus: false,\r\n          ship: false,\r\n        });\r\n      }\r\n      this.grid.push(row);\r\n    }\r\n\r\n    // Reset all ships coords\r\n    Object.values(this.allShips).forEach((ship) => {\r\n      ship.coords = [];\r\n    });\r\n\r\n    this.allShips = {};\r\n  }\r\n\r\n  placeShip(newShip, axis, coords) {\r\n    coords.forEach((c, i) => {\r\n      const pos = this.grid[c[0]][c[1]];\r\n      pos.ship = {\r\n        isStartCoord: i === 0,\r\n        shipObj: newShip,\r\n      };\r\n    });\r\n\r\n    newShip.axis = axis;\r\n    newShip.coords = coords;\r\n    this.allShips[newShip.name] = newShip;\r\n  }\r\n\r\n  repositionShip(theShip, newAxis, newCoords) {\r\n    theShip.coords.forEach((c) => {\r\n      this.grid[c[0]][c[1]].ship = false;\r\n    });\r\n\r\n    this.placeShip(theShip, newAxis, newCoords);\r\n  }\r\n\r\n  // Can't take the function inside the Ship class cause the coords parameter is not of Ship object.\r\n  getAdjacentsForAxisX(coords) {\r\n    const adjacents = [];\r\n\r\n    const head = [coords[0][0], coords[0][1] - 1];\r\n    const headNeighbor = [head[0] - 1, head[1]];\r\n    const tail = [coords[0][0], coords[coords.length - 1][1] + 1];\r\n    const tailNeighbor = [tail[0] + 1, tail[1]];\r\n\r\n    adjacents.push(head, headNeighbor, tail, tailNeighbor);\r\n\r\n    for (let i = 1; i !== coords.length + 2; i += 1) {\r\n      adjacents.push([headNeighbor[0], headNeighbor[1] + i]);\r\n      adjacents.push([tailNeighbor[0], tailNeighbor[1] - i]);\r\n    }\r\n\r\n    return adjacents;\r\n  }\r\n\r\n  getAdjacentsForAxisY(coords) {\r\n    const adjacents = [];\r\n\r\n    const head = [coords[0][0] - 1, coords[0][1]];\r\n    const headNeighbor = [head[0], head[1] - 1];\r\n    const tail = [coords[coords.length - 1][0] + 1, coords[0][1]];\r\n    const tailNeighbor = [tail[0], tail[1] + 1];\r\n\r\n    adjacents.push(head, headNeighbor, tail, tailNeighbor);\r\n\r\n    for (let i = 1; i !== coords.length + 2; i += 1) {\r\n      adjacents.push([headNeighbor[0] + i, headNeighbor[1]]);\r\n      adjacents.push([tailNeighbor[0] - i, tailNeighbor[1]]);\r\n    }\r\n\r\n    return adjacents;\r\n  }\r\n\r\n  AreCoordsInGrid(coords) {\r\n    return coords.every((c) => this.grid[c[0]] && this.grid[c[0]][c[1]]);\r\n  }\r\n\r\n  isValidLocation(shipName, shipAxis, coords) {\r\n    if (!this.AreCoordsInGrid(coords)) return false;\r\n\r\n    let coordsToCheck;\r\n    if (shipAxis === \"x\") {\r\n      coordsToCheck = [...this.getAdjacentsForAxisX(coords), ...coords];\r\n    } else {\r\n      coordsToCheck = [...this.getAdjacentsForAxisY(coords), ...coords];\r\n    }\r\n\r\n    // Check if at least one of the value in the adjacents array is invalid\r\n    const isInvalid = coordsToCheck.some((c) => {\r\n      const row = this.grid[c[0]];\r\n      const pos = row ? row[c[1]] : false;\r\n\r\n      return pos && pos.ship && pos.ship.shipObj.name !== shipName;\r\n    });\r\n\r\n    return !isInvalid; // If none of them are invalid, the location is valid\r\n  }\r\n\r\n  receiveAttack(coord) {\r\n    console.log(this.grid, coord);\r\n  }\r\n\r\n  checkGameOver() {\r\n    console.log(this.grid);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/models/Gameboard.js?");

/***/ }),

/***/ "./src/models/Ship.js":
/*!****************************!*\
  !*** ./src/models/Ship.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n  numHits = 0;\r\n  coords = [];\r\n  isDraggable = true;\r\n  distanceFromMidToMouse = [];\r\n\r\n  constructor(name, shipLength, axis) {\r\n    this.name = name;\r\n    this.shipLength = shipLength;\r\n    this.axis = axis;\r\n  }\r\n\r\n  hit() {\r\n    this.numHits += 1;\r\n  }\r\n\r\n  isSunk() {\r\n    return this.numHits === this.shipLength;\r\n  }\r\n\r\n  getCoordsForRotation() {\r\n    if (this.coords.length === 0) throw new Error(\"Ship is not on board yet.\");\r\n\r\n    const newCoords = [];\r\n    this.coords.forEach((c, i) => {\r\n      if (this.axis === \"x\") {\r\n        newCoords.push([c[0] + i, this.coords[0][1]]);\r\n      } else {\r\n        newCoords.push([this.coords[0][0], c[1] + i]);\r\n      }\r\n    });\r\n\r\n    return newCoords;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/models/Ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;